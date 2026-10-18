import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToR2, isR2Configured } from "@/lib/r2";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export async function POST(request: NextRequest) {
  try {
    if (!isR2Configured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Cloudflare R2 belum dikonfigurasi di server. Mohon periksa variabel lingkungan (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, NEXT_PUBLIC_R2_PUBLIC_URL).",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Ukuran file terlalu besar. Maksimal 15MB." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "application/octet-stream";
    if (!ALLOWED_MIME_TYPES.has(mimeType) && !mimeType.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Tipe file tidak didukung. Harap unggah file gambar." },
        { status: 400 }
      );
    }

    const cleanFolder = folder.replace(/[^a-zA-Z0-9_\-]/g, "");
    const originalExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = /^[a-zA-Z0-9]+$/.test(originalExt) ? originalExt : "jpg";
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const key = `${cleanFolder}/${uniqueSuffix}.${safeExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { url } = await uploadBufferToR2({
      buffer,
      key,
      contentType: mimeType,
    });

    return NextResponse.json({
      success: true,
      url,
      key,
    });
  } catch (error: any) {
    console.error("Cloudflare R2 upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Gagal mengunggah gambar ke Cloudflare R2",
      },
      { status: 500 }
    );
  }
}

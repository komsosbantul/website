import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET_NAME, isR2Configured } from "@/lib/r2";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    if (!isR2Configured()) {
      return new NextResponse("R2 Storage not configured", { status: 500 });
    }

    const { path } = await context.params;
    const key = path.join("/");

    if (!key) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    });

    const s3Response = await r2Client.send(command);

    if (!s3Response.Body) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const byteArray = await s3Response.Body.transformToByteArray();

    return new NextResponse(byteArray as any, {
      status: 200,
      headers: {
        "Content-Type": s3Response.ContentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": byteArray.length.toString(),
      },
    });
  } catch (error: any) {
    if (error.name === "NoSuchKey") {
      return new NextResponse("Image Not Found", { status: 404 });
    }
    console.error("Error serving media from R2:", error);
    return new NextResponse("Error fetching media", { status: 500 });
  }
}

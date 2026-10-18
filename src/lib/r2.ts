import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "";
export const R2_PUBLIC_URL = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "").replace(/\/+$/, "");

export function isR2Configured(): boolean {
  return Boolean(accountId && accessKeyId && secretAccessKey && R2_BUCKET_NAME);
}

export const r2Client = new S3Client({
  region: "auto",
  endpoint: accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined,
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
});

export interface UploadResult {
  url: string;
  key: string;
}

export async function uploadBufferToR2({
  buffer,
  key,
  contentType,
}: {
  buffer: Buffer;
  key: string;
  contentType: string;
}): Promise<UploadResult> {
  if (!isR2Configured()) {
    throw new Error(
      "Cloudflare R2 belum dikonfigurasi. Pastikan R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, dan NEXT_PUBLIC_R2_PUBLIC_URL sudah diisi di .env.local"
    );
  }

  const cleanKey = key.replace(/^\/+/, "");

  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: cleanKey,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // If NEXT_PUBLIC_R2_PUBLIC_URL is a custom domain, use it; otherwise use our secure internal proxy /api/media to bypass ISP DNS blocks
  const publicUrl = R2_PUBLIC_URL && !R2_PUBLIC_URL.includes("r2.dev")
    ? `${R2_PUBLIC_URL}/${cleanKey}`
    : `/api/media/${cleanKey}`;

  return {
    url: publicUrl,
    key: cleanKey,
  };
}

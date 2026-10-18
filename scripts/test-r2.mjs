import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...values] = trimmed.split("=");
    if (key && values.length > 0) {
      process.env[key.trim()] = values.join("=").trim();
    }
  }
}

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "").replace(/\/+$/, "");

console.log("🔍 Mengecek konfigurasi R2...");
console.log("- Account ID :", accountId ? "OK (" + accountId.slice(0, 6) + "...)" : "BELUM ADA");
console.log("- Access Key :", accessKeyId ? "OK (" + accessKeyId.slice(0, 6) + "...)" : "BELUM ADA");
console.log("- Secret Key :", secretAccessKey ? "OK (Ada)" : "BELUM ADA");
console.log("- Bucket Name:", bucketName || "BELUM ADA");
console.log("- Public URL :", publicUrl || "BELUM ADA");

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
  console.log("\n⚠️ Konfigurasi belum lengkap di .env.local. Pastikan Anda sudah menyimpannya (Ctrl + S) di editor.");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function testConnection() {
  try {
    console.log("\n📡 Menghubungkan ke Cloudflare R2...");
    
    // 1. Coba upload file uji kecil
    const testKey = `test/ping-${Date.now()}.txt`;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: testKey,
        Body: Buffer.from("Hello from Next.js Cloudflare R2 test!"),
        ContentType: "text/plain",
      })
    );
    console.log("✅ Berhasil upload file tes ke bucket!");
    console.log("🔗 URL tes:", `${publicUrl}/${testKey}`);

    // 2. Cek apakah public URL bisa diakses
    try {
      const res = await fetch(`${publicUrl}/${testKey}`);
      if (res.ok) {
        console.log("✅ Public URL berhasil diakses via internet!");
      } else {
        console.log(`⚠️ Public URL mengembalikan status ${res.status}. Pastikan Public Development URL aktif di dashboard Cloudflare.`);
      }
    } catch (e) {
      console.log("⚠️ Gagal fetch public URL:", e.message);
    }

    console.log("\n🎉 Cloudflare R2 SIAP DIGUNAKAN!");
  } catch (err) {
    console.error("❌ Gagal terhubung ke Cloudflare R2:", err.message);
  }
}

testConnection();

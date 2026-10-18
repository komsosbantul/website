import { createClient } from "@supabase/supabase-js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

// Load .env.local manually if dotenv is not installed
function loadEnv() {
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
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;
const publicUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "").replace(/\/+$/, "");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum terisi.");
  process.exit(1);
}

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
  console.error("❌ Error: Konfigurasi Cloudflare R2 belum lengkap di .env.local!");
  console.error("Dibutuhkan: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, NEXT_PUBLIC_R2_PUBLIC_URL");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function uploadToR2FromUrl(imageUrl, folder = "migrated") {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} saat mengunduh gambar: ${imageUrl}`);
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = contentType.split("/")[1] || "jpg";
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    return `${publicUrl}/${key}`;
  } catch (err) {
    console.error(`  ⚠️ Gagal migrasi URL ${imageUrl}:`, err.message);
    return null;
  }
}

async function runMigration() {
  console.log("🚀 Memulai proses migrasi gambar dari Supabase ke Cloudflare R2...\n");

  // 1. Migrasi Berita (news_articles)
  console.log("📰 Memeriksa tabel news_articles...");
  const { data: articles, error: artErr } = await supabase
    .from("news_articles")
    .select("id, title, image_url");

  if (artErr) {
    console.error("❌ Gagal membaca news_articles:", artErr.message);
  } else if (articles) {
    let migratedCount = 0;
    for (const article of articles) {
      if (article.image_url && article.image_url.includes("supabase.co/storage")) {
        console.log(`  Mengunggah cover: "${article.title}"...`);
        const newUrl = await uploadToR2FromUrl(article.image_url, "news");
        if (newUrl) {
          const { error: updErr } = await supabase
            .from("news_articles")
            .update({ image_url: newUrl })
            .eq("id", article.id);

          if (!updErr) {
            migratedCount++;
            console.log(`  ✅ Berhasil diperbarui ke: ${newUrl}`);
          } else {
            console.error(`  ❌ Gagal update DB:`, updErr.message);
          }
        }
      }
    }
    console.log(`✨ Selesai migrasi news_articles: ${migratedCount} gambar dialihkan ke R2.\n`);
  }

  // 2. Migrasi Galeri (gallery_events)
  console.log("🖼️ Memeriksa tabel gallery_events...");
  const { data: events, error: evErr } = await supabase
    .from("gallery_events")
    .select("id, title, cover_image");

  if (evErr) {
    console.error("❌ Gagal membaca gallery_events:", evErr.message);
  } else if (events) {
    let migratedGalleryCount = 0;
    for (const ev of events) {
      if (ev.cover_image && ev.cover_image.includes("supabase.co/storage")) {
        console.log(`  Mengunggah cover galeri: "${ev.title}"...`);
        const newUrl = await uploadToR2FromUrl(ev.cover_image, "gallery");
        if (newUrl) {
          const { error: updErr } = await supabase
            .from("gallery_events")
            .update({ cover_image: newUrl })
            .eq("id", ev.id);

          if (!updErr) {
            migratedGalleryCount++;
            console.log(`  ✅ Berhasil diperbarui ke: ${newUrl}`);
          } else {
            console.error(`  ❌ Gagal update DB:`, updErr.message);
          }
        }
      }
    }
    console.log(`✨ Selesai migrasi gallery_events: ${migratedGalleryCount} cover dialihkan ke R2.\n`);
  }

  console.log("🎉 Migrasi selesai!");
}

runMigration().catch((err) => {
  console.error("Fatal error:", err);
});

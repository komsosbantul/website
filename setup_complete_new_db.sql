-- ==============================================================================
-- SKRIP LENGKAP SETUP DATABASE SUPABASE (PROYEK BARU)
-- Jalankan skrip ini sekali di menu SQL Editor pada dashboard Supabase baru
-- ==============================================================================

-- 1. Aktifkan ekstensi UUID
create extension if not exists "uuid-ossp";

-- 2. Buat Tabel Jadwal Misa (mass_schedules)
create table if not exists public.mass_schedules (
  id uuid not null default gen_random_uuid() primary key,
  church_name text not null,
  schedule_type text not null,
  day text not null,
  time text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Buat Tabel Galeri Kegiatan (gallery_events)
create table if not exists public.gallery_events (
  id uuid not null default gen_random_uuid() primary key,
  title text not null,
  event_date date not null,
  category text not null default 'Kegiatan',
  cover_image text,
  google_drive_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Buat Tabel Foto Galeri (gallery_images)
create table if not exists public.gallery_images (
  id uuid not null default gen_random_uuid() primary key,
  event_id uuid not null references public.gallery_events(id) on delete cascade,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now()
);

-- 5. Buat Tabel Artikel Berita & Warta (news_articles)
create table if not exists public.news_articles (
  id uuid not null default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  category text not null default 'berita',
  summary text not null,
  content text not null,
  image_url text,
  author_name text,
  views integer not null default 0,
  published_date date default now(),
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- KEBIJAKAN KEAMANAN (Row Level Security / RLS)
-- Mengizinkan pembacaan publik & pengelolaan oleh admin
-- ==============================================================================

alter table public.mass_schedules enable row level security;
alter table public.gallery_events enable row level security;
alter table public.gallery_images enable row level security;
alter table public.news_articles enable row level security;

-- Hapus kebijakan lama jika ada
drop policy if exists "Public Read Schedules" on public.mass_schedules;
drop policy if exists "Allow all operations Schedules" on public.mass_schedules;
drop policy if exists "Public Read Events" on public.gallery_events;
drop policy if exists "Allow all operations Events" on public.gallery_events;
drop policy if exists "Public Read Images" on public.gallery_images;
drop policy if exists "Allow all operations Images" on public.gallery_images;
drop policy if exists "Public Read News" on public.news_articles;
drop policy if exists "Allow all operations News" on public.news_articles;

-- Kebijakan mass_schedules
create policy "Public Read Schedules" on public.mass_schedules for select using (true);
create policy "Allow all operations Schedules" on public.mass_schedules for all using (true) with check (true);

-- Kebijakan gallery_events
create policy "Public Read Events" on public.gallery_events for select using (true);
create policy "Allow all operations Events" on public.gallery_events for all using (true) with check (true);

-- Kebijakan gallery_images
create policy "Public Read Images" on public.gallery_images for select using (true);
create policy "Allow all operations Images" on public.gallery_images for all using (true) with check (true);

-- Kebijakan news_articles
create policy "Public Read News" on public.news_articles for select using (true);
create policy "Allow all operations News" on public.news_articles for all using (true) with check (true);

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. Mass Schedules Table
create table public.mass_schedules (
  id uuid not null default gen_random_uuid(),
  church_name text not null, -- e.g., 'Gereja Santo Yakobus', 'Gereja Mater Dei'
  schedule_type text not null, -- e.g., 'WEEKLY', 'DAILY', 'SPECIAL'
  day text not null, -- e.g., 'Saturday', 'Sunday', 'Monday'
  time text not null, -- Using TEXT to support formats like '17:00 WIB' or simple '17:00'
  description text, -- Optional note like 'Misa Bahasa Jawa'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint mass_schedules_pkey primary key (id)
);

-- 2. Gallery Events (Parent Table)
create table public.gallery_events (
  id uuid not null default gen_random_uuid(),
  title text not null,
  event_date date not null, -- ISO Date YYYY-MM-DD
  category text not null, -- e.g., 'Liturgi', 'Kegiatan', 'Pembangunan'
  thumbnail_url text, -- Optional cover image for the event
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gallery_events_pkey primary key (id)
);

-- 3. Gallery Images (Child Table)
create table public.gallery_images (
  id uuid not null default gen_random_uuid(),
  event_id uuid not null,
  image_url text not null,
  caption text,
  created_at timestamptz not null default now(),
  constraint gallery_images_pkey primary key (id),
  constraint gallery_images_event_id_fkey foreign key (event_id)
    references public.gallery_events (id) 
    on delete cascade
);

-- Add Row Level Security (RLS) - Optional but recommended boilerplate
alter table public.mass_schedules enable row level security;
alter table public.gallery_events enable row level security;
alter table public.gallery_images enable row level security;

-- Create minimal policies (Open read, Authenticated write)
create policy "Public Read Schedules" on public.mass_schedules for select using (true);
create policy "Public Read Events" on public.gallery_events for select using (true);
create policy "Public Read Gallery Images" on public.gallery_images for select using (true);

-- 4. News Articles Table
create table public.news_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  summary text not null,
  image_url text null,
  published_date date default now(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for News Articles
alter table public.news_articles enable row level security;
create policy "Allow public read access" on public.news_articles for select using (true);

-- 5. Updates on 2026-01-21
-- Add Google Drive Link column
alter table public.gallery_events 
add column if not exists google_drive_link text;

-- Drop existing policy if it exists to avoid conflict
drop policy if exists "Enable all access for authenticated users" on public.gallery_events;

-- Grant full access to admins
create policy "Admin can do everything" 
on public.gallery_events
for all 
to authenticated 
using (true) 
with check (true);

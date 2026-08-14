-- 1. Buat bucket baru bernama 'gallery_images'
insert into storage.buckets (id, name, public) 
values ('gallery_images', 'gallery_images', true);

-- 2. Hapus policy yang mungkin sudah ada (untuk keamanan jika script dijalankan ulang)
drop policy if exists "Allow public read access" on storage.objects;
drop policy if exists "Allow anon upload access" on storage.objects;
drop policy if exists "Allow anon delete access" on storage.objects;
drop policy if exists "Allow anon update access" on storage.objects;

-- 3. Beri izin baca (READ) untuk semua orang ke bucket gallery_images
create policy "Allow public read access" 
on storage.objects for select 
using ( bucket_id = 'gallery_images' );

-- 4. Beri izin upload (INSERT) untuk pengguna anonim ke bucket gallery_images
-- (Sistem login aplikasi kita tidak menggunakan Supabase Auth, jadi request datang sebagai anon)
create policy "Allow anon upload access" 
on storage.objects for insert 
to anon 
with check ( bucket_id = 'gallery_images' );

-- 5. Beri izin hapus (DELETE) untuk pengguna anonim
create policy "Allow anon delete access" 
on storage.objects for delete 
to anon 
using ( bucket_id = 'gallery_images' );

-- 6. Beri izin update (UPDATE) untuk pengguna anonim
create policy "Allow anon update access" 
on storage.objects for update
to anon 
using ( bucket_id = 'gallery_images' );

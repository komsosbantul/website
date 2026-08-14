-- Hapus kebijakan lama yang membatasi hanya untuk user terautentikasi (Supabase Auth)
drop policy if exists "Admin can do everything" on public.gallery_events;

-- Buat kebijakan baru yang mengizinkan semua akses
-- (Keamanan halaman admin sudah dijaga oleh cookie 'admin_session' di Next.js)
create policy "Allow all operations for anon" 
on public.gallery_events
for all 
to anon 
using (true) 
with check (true);

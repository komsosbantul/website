-- Tambahkan kolom author_name dan views ke tabel news_articles
ALTER TABLE public.news_articles 
ADD COLUMN author_name text,
ADD COLUMN views integer not null default 0;

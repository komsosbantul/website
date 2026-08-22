import React from "react";
import PageHeader from "@/components/PageHeader";
import { Calendar, ArrowRight, Eye, Info, BookOpen, Newspaper } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database";
import FadeIn from "@/components/FadeIn";

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: Promise<{
    kategori: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { kategori } = await params;
  const supabase = await createClient();

  // Validate category
  const validCategories = ['pengumuman', 'berita', 'katekese'];
  if (!validCategories.includes(kategori)) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Kategori tidak ditemukan</h1>
        <Link href="/warta" className="text-blue-600 hover:underline">Kembali ke Warta</Link>
      </div>
    );
  }

  // Fetch news for this category
  // Handle empty string category mapping to 'berita' if needed, but since our DB schema has 'category' column defaulting to 'berita', we should query by category column.
  let query = supabase
    .from("news_articles")
    .select("*")
    .order("published_date", { ascending: false });
    
  if (kategori === 'berita') {
    query = query.or('category.eq.berita,category.is.null'); // for backward compatibility with old rows
  } else {
    query = query.eq('category', kategori);
  }

  const { data, error } = await query;
  const articles = data as Database['public']['Tables']['news_articles']['Row'][] | null;

  // Header settings based on category
  let title = "Berita Paroki";
  let icon = <Newspaper className="w-8 h-8 text-amber-600" />;
  
  if (kategori === 'pengumuman') {
    title = "Pengumuman Terbaru";
    icon = <Info className="w-8 h-8 text-blue-600" />;
  } else if (kategori === 'katekese') {
    title = "Katekese & Renungan";
    icon = <BookOpen className="w-8 h-8 text-purple-600" />;
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title={title} 
        subtitle={`Daftar ${title.toLowerCase()} gereja terkini`}
      />

      <FadeIn className="container mx-auto px-4 md:px-8 max-w-6xl mt-12">
        <div className="mb-6 flex items-center justify-between">
           <Link href="/warta" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1">
             ← Kembali ke Menu Warta
           </Link>
        </div>

        {error && (
           <div className="text-center bg-red-50 text-red-600 p-4 rounded-lg mb-8">
             <p>Gagal memuat berita terkini.</p>
           </div>
        )}

        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
           {icon}
           <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        </div>

        {(!articles || articles.length === 0) ? (
           <div className="text-center py-20 text-slate-500 border border-dashed border-slate-200 rounded-xl bg-white">
             Belum ada artikel untuk kategori ini.
           </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 ${kategori === 'pengumuman' ? '' : 'lg:grid-cols-3'} gap-6 md:gap-8`}>
            {articles.map((item) => (
              <article key={item.id} className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group hover:-translate-y-1`}>
                
                {/* Image section (skip for pengumuman if desired, but good to have consistency) */}
                {kategori !== 'pengumuman' && (
                  <div className="h-48 overflow-hidden bg-slate-200 relative">
                     {item.image_url ? (
                       <img 
                         src={item.image_url} 
                         alt={item.title}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                          <span className="text-xs uppercase tracking-wider font-medium opacity-50">No Image</span>
                        </div>
                     )}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow relative">
                  {kategori === 'katekese' && (
                     <div className="absolute top-4 right-6 text-6xl text-slate-200/40 font-serif leading-none select-none">"</div>
                  )}

                  <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium mb-3 text-slate-600 relative z-10`}>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {item.published_date}
                    </div>
                    {kategori !== 'pengumuman' && (
                      <div className="flex items-center gap-1 text-slate-500">
                        <Eye size={14} />
                        {item.views || 0}
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/warta/${item.slug}`} className="relative z-10">
                     <h3 className={`text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors cursor-pointer`}>
                       {item.title}
                     </h3>
                  </Link>
                  
                  <p className={`text-slate-600 text-sm mb-6 line-clamp-3 relative z-10 ${kategori === 'katekese' ? 'italic' : ''}`}>
                    {item.summary}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 relative z-10 flex justify-between items-center">
                    {kategori === 'katekese' && (
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.author_name || 'Tim Komsos'}</span>
                    )}
                    <Link 
                      href={`/warta/${item.slug}`} 
                      className={`inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors ml-auto`}
                    >
                      Baca <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </FadeIn>
    </main>
  );
}

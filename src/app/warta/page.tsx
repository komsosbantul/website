import React from "react";
import PageHeader from "@/components/PageHeader";
import { Calendar, ArrowRight, Eye, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database";
import FadeIn from "@/components/FadeIn";

export const dynamic = 'force-dynamic';

export default async function WartaPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .order("published_date", { ascending: false });

  const news = data as Database['public']['Tables']['news_articles']['Row'][] | null;

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Warta Paroki" 
        subtitle="Berita, Pengumuman, dan Informasi Terkini"
      />

      <FadeIn className="container mx-auto px-4 md:px-8 max-w-6xl mt-12">
        
        {/* Error State */}
        {error && (
           <div className="text-center bg-red-50 text-red-600 p-4 rounded-lg">
             <p>Gagal memuat berita terkini.</p>
           </div>
        )}

        {/* Empty State */}
        {!error && (!news || news.length === 0) && (
           <div className="text-center py-20">
             <p className="text-slate-500 text-lg">Belum ada warta paroki terbaru.</p>
           </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(news || []).map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                 {item.image_url ? (
                   <img 
                     src={item.image_url} 
                     alt={item.title}
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                   />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
                    </div>
                 )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-amber-600 font-medium mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {item.published_date}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Eye size={14} />
                    {item.views || 0}
                  </div>
                </div>
                <Link href={`/warta/${item.slug}`}>
                   <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer">
                     {item.title}
                   </h3>
                </Link>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {item.summary}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link 
                    href={`/warta/${item.slug}`} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database";
import FadeIn from "./FadeIn";

export default async function NewsHighlightSection() {
  const supabase = await createClient();

  // Fetch the latest 4 news articles
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .order("published_date", { ascending: false })
    .limit(4);

  const news = data as Database['public']['Tables']['news_articles']['Row'][] | null;

  if (error || !news || news.length === 0) {
    // If error or no news, don't render the section
    return null;
  }

  return (
    <section className="py-20 bg-slate-50">
      <FadeIn className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
           <div>
             <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-3 block">
               Informasi Terkini
             </span>
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
               Warta Paroki Terbaru
             </h2>
           </div>
           <Link 
             href="/warta"
             className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
           >
             Lihat Semua Warta
             <ArrowRight size={18} />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group">
              <div className="h-40 overflow-hidden bg-slate-200 relative">
                 {item.image_url ? (
                   <img 
                     src={item.image_url} 
                     alt={item.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <span className="text-[10px] font-medium uppercase tracking-wider">No Image</span>
                    </div>
                 )}
                 <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-amber-700 shadow-sm">
                    Baru
                 </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-amber-600 font-medium mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {item.published_date}
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Eye size={12} />
                    {item.views || 0}
                  </div>
                </div>
                <Link href={`/warta/${item.slug}`}>
                   <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors cursor-pointer">
                     {item.title}
                   </h3>
                </Link>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {item.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

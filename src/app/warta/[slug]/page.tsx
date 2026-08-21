import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, Clock, User } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database";

import { Metadata, ResolvingMetadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article } = await supabase
    .from("news_articles")
    .select("title, excerpt, image_url")
    .eq("slug", slug)
    .single();

  if (!article) {
    return {
      title: "Warta Tidak Ditemukan",
    };
  }

  // Optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.title,
    description: article.excerpt || `Baca artikel warta paroki: ${article.title}`,
    openGraph: {
      title: article.title,
      description: article.excerpt || `Baca artikel warta paroki: ${article.title}`,
      images: article.image_url ? [article.image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || `Baca artikel warta paroki: ${article.title}`,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

interface NewsDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch article
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (data) {
    // Increment views asynchronously
    supabase.rpc('increment_news_views', { news_id: data.id }).then(({ error: rpcError }) => {
        if (rpcError) {
            // Fallback if RPC doesn't exist
            supabase.from("news_articles")
            .update({ views: (data.views || 0) + 1 })
            .eq("id", data.id)
            .then(() => {});
        }
    });
  }

  const article = data as Database['public']['Tables']['news_articles']['Row'] | null;

  if (error || !article) {
    console.error("News not found:", error);
    notFound(); 
  }

  // Calculate reading time (assuming ~200 words per minute)
  // Strip HTML tags for word count
  const textContent = article.content.replace(/<[^>]*>?/gm, '');
  const wordCount = textContent.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/warta" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Kembali ke Warta
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Header Image */}
           <div className="relative w-full h-64 md:h-[400px]">
             {article.image_url ? (
               <img
                 src={article.image_url}
                 alt={article.title}
                 className="w-full h-full object-cover"
               />
             ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="text-lg font-medium">No Image Available</span>
                </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             
             {/* Title Overlay */}
             <div className="absolute bottom-0 left-0 p-8 w-full">
                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md mb-4">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                  {article.author_name && (
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <User size={14} />
                      {article.author_name}
                    </div>
                  )}
                  <div className="flex items-center gap-1 bg-amber-600 px-3 py-1.5 rounded-full">
                    <Calendar size={14} />
                    {article.published_date || "Tanggal tidak tersedia"}
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock size={14} />
                    {readingTime} min read
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Eye size={14} />
                    {(article.views || 0) + 1} Views
                  </div>
                </div>
             </div>
           </div>

           {/* Content */}
           <div className="p-8 md:p-12">
             <div 
               className="prose prose-slate max-w-none prose-lg prose-headings:text-amber-700 prose-a:text-blue-600 hover:prose-a:text-blue-500"
               dangerouslySetInnerHTML={{ __html: article.content }}
             />
           </div>
        </article>

      </div>
    </main>
  );
}

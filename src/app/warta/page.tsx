import React from "react";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Info, Newspaper, BookOpen } from "lucide-react";

export default function WartaPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Warta Paroki" 
        subtitle="Pengumuman, Berita, dan Katekese Terkini"
      />

      <FadeIn className="container mx-auto px-4 md:px-8 max-w-6xl mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Link href="/warta/kategori/pengumuman" className="block group">
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border-2 border-slate-100 shadow-sm transition-all duration-300 group-hover:border-blue-300 group-hover:bg-blue-50/50 group-hover:shadow-md group-hover:-translate-y-1 h-full">
              <Info className="w-12 h-12 mb-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
              <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-700 transition-colors">Pengumuman</h3>
              <p className="text-sm text-slate-500 text-center mt-2">Informasi dan pengumuman terbaru dari gereja.</p>
            </div>
          </Link>

          <Link href="/warta/kategori/berita" className="block group">
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border-2 border-slate-100 shadow-sm transition-all duration-300 group-hover:border-amber-300 group-hover:bg-amber-50/50 group-hover:shadow-md group-hover:-translate-y-1 h-full">
              <Newspaper className="w-12 h-12 mb-4 text-amber-500 group-hover:text-amber-600 transition-colors" />
              <h3 className="font-bold text-xl text-slate-800 group-hover:text-amber-700 transition-colors">Berita Paroki</h3>
              <p className="text-sm text-slate-500 text-center mt-2">Kumpulan berita kegiatan di lingkungan paroki.</p>
            </div>
          </Link>

          <Link href="/warta/kategori/katekese" className="block group">
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border-2 border-slate-100 shadow-sm transition-all duration-300 group-hover:border-purple-300 group-hover:bg-purple-50/50 group-hover:shadow-md group-hover:-translate-y-1 h-full">
              <BookOpen className="w-12 h-12 mb-4 text-purple-500 group-hover:text-purple-600 transition-colors" />
              <h3 className="font-bold text-xl text-slate-800 group-hover:text-purple-700 transition-colors">Katekese & Renungan</h3>
              <p className="text-sm text-slate-500 text-center mt-2">Bahan katekese dan renungan harian umat.</p>
            </div>
          </Link>

        </div>
      </FadeIn>
    </main>
  );
}

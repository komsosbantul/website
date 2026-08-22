"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function CreateNewsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "berita",
    summary: "",
    content: "",
    author_name: "",
    published_date: new Date().toISOString().split('T')[0], // Default to today
  });

  // Slugify helper
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")     // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-");  // Replace multiple - with single -
  };

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
        setFormData(prev => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [formData.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let coverImageUrl = null;

      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `news_covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("news_images")
          .upload(filePath, coverFile);

        if (uploadError) {
          throw new Error("Gagal mengupload gambar cover: " + uploadError.message);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from("news_images")
          .getPublicUrl(filePath);
          
        coverImageUrl = publicUrlData.publicUrl;
      }

      const payload = {
         ...formData,
         image_url: coverImageUrl
      };

      const { error } = await (supabase as any).from("news_articles").insert([payload] as any);
      
      if (error) {
        if (error.code === '23505') { // Unique violation for slug
            alert("Slug sudah ada. Silakan ubah judul atau edit slug secara manual.");
        } else {
            throw error;
        }
        return;
      }

      alert("Berita berhasil dibuat!");
      router.push("/admin/news");
      router.refresh();

    } catch (error: any) {
      console.error("Error creating news:", error);
      alert("Gagal membuat berita: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/news" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Kembali ke Daftar Berita
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Buat Berita Baru</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul Berita</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              placeholder="Masukkan judul berita..."
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Slug (URL)</label>
            <div className="flex items-center px-4 py-2 bg-slate-50 border border-gray-300 rounded-lg text-slate-500">
               <span className="shrink-0 mr-1">/warta/</span>
               <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-900 placeholder-gray-500 font-mono text-sm"
                placeholder="slug-otomatis"
               />
            </div>
            <p className="text-xs text-slate-400 mt-1">Slug dibuat otomatis dari judul, tetapi bisa diedit manual.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Published Date */}
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Publish</label>
                <input
                type="date"
                name="published_date"
                value={formData.published_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
             </div>

             {/* Image File */}
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Gambar Cover</label>
                
                {coverFile && (
                   <div className="mb-3">
                      <p className="text-xs text-slate-500 mb-1">Preview gambar:</p>
                      <img 
                        src={URL.createObjectURL(coverFile)} 
                        alt="Cover preview" 
                        className="h-32 object-cover rounded border" 
                      />
                   </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">Pilih gambar dari perangkat Anda (.jpg, .png, .jpeg).</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Category */}
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange as any}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                >
                  <option value="pengumuman">Pengumuman</option>
                  <option value="berita">Berita Paroki</option>
                  <option value="katekese">Katekese</option>
                </select>
             </div>

             {/* Author */}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Nama Penulis</label>
               <input
                 type="text"
                 name="author_name"
                 value={formData.author_name}
                 onChange={handleChange}
                 className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                 placeholder="Contoh: Willy Putranta"
               />
             </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ringkasan (Excerpt)</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
              placeholder="Tulis ringkasan singkat untuk ditampilkan di kartu..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Isi Berita</label>
            <RichTextEditor 
              content={formData.content} 
              onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} 
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Simpan Berita
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    author_name: "",
    image_url: "",
    published_date: "",
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("news_articles")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        if (data) {
          const article = data as any;
          setFormData({
            title: article.title,
            slug: article.slug,
            summary: article.summary,
            content: article.content,
            author_name: article.author_name || "",
            image_url: article.image_url || "",
            published_date: article.published_date || "",
          });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        alert("Gagal memuat data berita.");
        router.push("/admin/news");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const handleSlugUpdate = () => {
     setFormData(prev => ({ ...prev, slug: slugify(prev.title) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        summary: formData.summary,
        content: formData.content,
        author_name: formData.author_name || null,
        image_url: formData.image_url || null,
        published_date: formData.published_date || null,
      };

      const { error } = await supabase
        .from("news_articles")
        .update(payload as any)
        .eq("id", id);
      if (error) {
         if (error.code === '23505') { 
            alert("Slug sudah digunakan oleh berita lain. Silakan ubah slug secara manual.");
         } else {
            throw error;
         }
         return;
      }

      alert("Perubahan berhasil disimpan!");
      router.push("/admin/news");
      router.refresh();

    } catch (error: any) {
      console.error("Error updating article:", error);
      alert("Gagal menyimpan perubahan: " + (error.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus berita ini secara permanen?")) return;

    setDeleting(true);
    try {
      const { error } = await supabase.from("news_articles").delete().eq("id", id);
      if (error) throw error;
      
      alert("Berita berhasil dihapus.");
      router.push("/admin/news");
      router.refresh();
    } catch (error) {
       console.error("Error deleting article:", error);
       alert("Gagal menghapus berita.");
       setDeleting(false);
    }
  };

  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-[400px]">
           <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
        </div>
     );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <Link 
          href="/admin/news" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Kembali ke Daftar Berita
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Berita</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul Berita</label>
            <div className="flex gap-2">
               <input
                 type="text"
                 name="title"
                 value={formData.title}
                 onChange={handleChange}
                 required
                 className="flex-grow px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
               />
               <button 
                  type="button" 
                  onClick={handleSlugUpdate}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
               >
                  Generate Slug
               </button>
            </div>
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
               />
            </div>
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

             {/* Image URL */}
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">URL Gambar Cover</label>
                <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                placeholder="https://example.com/image.jpg"
                />
             </div>
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

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
               type="button"
               onClick={handleDelete}
               disabled={deleting || saving}
               className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 transition-colors disabled:opacity-50"
            >
               {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
               Hapus Berita Ini
            </button>

            <button
              type="submit"
              disabled={saving || deleting}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

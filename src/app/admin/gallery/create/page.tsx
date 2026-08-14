"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/database";
import { revalidateGallery } from "@/app/actions/gallery";

export default function CreateGalleryPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    event_date: new Date().toISOString().split('T')[0], // Default to today
    google_drive_link: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery_images")
          .upload(filePath, coverFile);

        if (uploadError) {
          throw new Error("Gagal mengupload gambar cover: " + uploadError.message);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from("gallery_images")
          .getPublicUrl(filePath);
          
        coverImageUrl = publicUrlData.publicUrl;
      }

      const payload: Database['public']['Tables']['gallery_events']['Insert'] = {
        title: formData.title,
        event_date: formData.event_date,
        category: "Kegiatan", // default category since it's removed from UI
        cover_image: coverImageUrl,
        google_drive_link: formData.google_drive_link || null,
      };

      const { error } = await supabase.from("gallery_events").insert([payload] as any);
      
      if (error) throw error;

      alert("Kegiatan berhasil ditambahkan!");
      await revalidateGallery();
      router.push("/admin/gallery");
      router.refresh();

    } catch (error: any) {
      console.error("Error creating event:", error);
      alert("Gagal menambahkan kegiatan: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/gallery" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Kembali ke Manajemen Galeri
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Tambah Kegiatan Baru</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kegiatan</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              placeholder="Contoh: Misa Natal 2024"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Event Date */}
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Kegiatan</label>
                <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
             </div>
          </div>

          {/* Cover Image File */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Gambar Cover</label>
            
            {coverFile && (
               <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">Preview gambar baru:</p>
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

          {/* Google Drive Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Link Google Drive (Opsional)</label>
            <input
              type="url"
              name="google_drive_link"
              value={formData.google_drive_link}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              placeholder="https://drive.google.com/drive/folders/..."
            />
            <p className="text-xs text-slate-400 mt-1">Masukkan link folder Google Drive berisi dokumentasi lengkap.</p>
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
                  Simpan Kegiatan
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

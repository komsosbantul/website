"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/database";
import { revalidateGallery } from "@/app/actions/gallery";

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    event_date: "",
    cover_image: "",
    google_drive_link: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("gallery_events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        
        if (data) {
          const event = data as any;
          setFormData({
            title: event.title,
            event_date: event.event_date,
            cover_image: event.cover_image || "",
            google_drive_link: event.google_drive_link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Gagal memuat data kegiatan.");
        router.push("/admin/gallery");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let coverImageUrl = formData.cover_image;

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

      const payload = {
        title: formData.title,
        event_date: formData.event_date,
        cover_image: coverImageUrl || null,
        google_drive_link: formData.google_drive_link || null,
      };

      const { error } = await supabase
        .from("gallery_events")
        // @ts-ignore
        .update(payload)
        .eq("id", id);
      if (error) throw error;

      alert("Perubahan berhasil disimpan!");
      await revalidateGallery();
      router.push("/admin/gallery");
      router.refresh();

    } catch (error: any) {
      console.error("Error updating event:", error);
      alert("Gagal menyimpan perubahan: " + (error.message || "Unknown error"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini secara permanen?")) return;

    setDeleting(true);
    try {
      const { error } = await supabase.from("gallery_events").delete().eq("id", id);
      if (error) throw error;
      
      alert("Kegiatan berhasil dihapus.");
      await revalidateGallery();
      router.push("/admin/gallery");
      router.refresh();
    } catch (error) {
       console.error("Error deleting event:", error);
       alert("Gagal menghapus kegiatan.");
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
    <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-8">
        <Link 
          href="/admin/gallery" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Kembali ke Manajemen Galeri
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Kegiatan</h1>
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Gambar Cover Baru (Opsional)</label>
            
            {/* Tampilkan gambar yang dipilih atau gambar lama */}
            {(coverFile || formData.cover_image) && (
               <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-1">
                     {coverFile ? "Preview gambar baru:" : "Gambar saat ini:"}
                  </p>
                  <img 
                    src={coverFile ? URL.createObjectURL(coverFile) : formData.cover_image} 
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
            <p className="text-xs text-slate-400 mt-1">Biarkan kosong jika tidak ingin mengubah gambar.</p>
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
              placeholder="https://drive.google.com/..."
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
               Hapus Kegiatan Ini
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

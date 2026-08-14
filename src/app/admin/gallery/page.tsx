"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";
import { revalidateGallery } from "@/app/actions/gallery";
import { Plus, Pencil, Loader2, Calendar, Image as ImageIcon, HardDrive, Trash2 } from "lucide-react";

type GalleryEvent = Database["public"]["Tables"]["gallery_events"]["Row"];

export default function AdminGalleryPage() {
  const router = useRouter();
  const supabase = createClient();
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery_events")
        .select("*")
        .order("event_date", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching gallery events:", error);
      alert("Gagal memuat kegiatan galeri.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) return;

    try {
      setDeletingId(id);
      const { data, error } = await supabase.from("gallery_events").delete().eq("id", id).select();
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("Tidak ada data yang dihapus. Mungkin diblokir oleh sistem keamanan (RLS) atau sesi Anda telah habis.");
      }
      
      setEvents((prev) => prev.filter((item) => item.id !== id));
      await revalidateGallery();
      router.refresh();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Gagal menghapus kegiatan.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Galeri</h1>
          <p className="text-sm text-slate-500">Daftar kegiatan dan dokumentasi paroki</p>
        </div>
        <Link
          href="/admin/gallery/create"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Tambah Kegiatan
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Kegiatan</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Tanggal</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Belum ada kegiatan. Silakan tambah kegiatan baru.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                           {event.cover_image ? (
                              <img src={event.cover_image} alt="" className="w-full h-full object-cover" />
                           ) : (
                              <ImageIcon size={20} className="text-slate-400" />
                           )}
                        </div>
                        <div className="flex flex-col">
                           <p className="font-medium text-slate-800">{event.title}</p>
                           {event.google_drive_link && (
                             <a 
                               href={event.google_drive_link}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                             >
                                <HardDrive size={12} />
                                Google Drive
                             </a>
                           )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {event.event_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/gallery/${event.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors inline-block"
                          title="Edit Kegiatan"
                        >
                           <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={deletingId === event.id}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block disabled:opacity-50"
                          title="Hapus Kegiatan"
                        >
                           {deletingId === event.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

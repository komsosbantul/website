"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditSchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const supabase = createClient();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    church_name: "",
    schedule_type: "Mingguan",
    day: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data, error } = await supabase
          .from("mass_schedules")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            church_name: data.church_name,
            schedule_type: data.schedule_type,
            day: data.day,
            time: data.time,
            description: data.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        alert("Gagal memuat data jadwal.");
        router.push("/admin/schedules");
      } finally {
        setFetching(false);
      }
    };

    fetchSchedule();
  }, [id, router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("mass_schedules")
        .update(formData)
        .eq("id", id);
      
      if (error) throw error;

      alert("Jadwal berhasil diperbarui!");
      router.push("/admin/schedules");
      router.refresh();

    } catch (error: any) {
      console.error("Error updating schedule:", error);
      alert("Gagal memperbarui jadwal: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/schedules" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 font-medium transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Kembali ke Daftar Jadwal
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">Edit Jadwal Misa</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Gereja</label>
            <input
              type="text"
              name="church_name"
              value={formData.church_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Contoh: Gereja Santo Yakobus Bantul"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Jadwal</label>
                <select
                  name="schedule_type"
                  value={formData.schedule_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option value="Mingguan">Mingguan</option>
                  <option value="Harian">Harian</option>
                  <option value="Bulanan">Bulanan</option>
                  <option value="Spesial">Spesial / Hari Raya</option>
                </select>
             </div>

             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hari</label>
                <input
                  type="text"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Contoh: Minggu Pagi"
                />
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Waktu (Jam)</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Contoh: 07:00 WIB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Keterangan Tambahan (Opsional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
              placeholder="Contoh: Misa Bahasa Jawa / Minggu ke 1 & 3"
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

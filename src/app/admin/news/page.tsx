"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";
import { Plus, Trash2, Loader2, Calendar, FileText, Pencil } from "lucide-react";

type NewsArticle = Database["public"]["Tables"]["news_articles"]["Row"];

export default function AdminNewsPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("published_date", { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Gagal memuat berita.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

    try {
      setDeletingId(id);
      const { error } = await supabase.from("news_articles").delete().eq("id", id);
      if (error) throw error;
      
      setArticles((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Gagal menghapus berita.");
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
          <h1 className="text-2xl font-bold text-slate-800">Kelola Warta Paroki</h1>
          <p className="text-sm text-slate-500">Daftar semua berita dan pengumuman</p>
        </div>
        <Link
          href="/admin/news/create"
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Buat Berita Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Judul Berita</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Tanggal Publish</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    Belum ada berita. Silakan buat berita baru.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
                           {article.image_url ? (
                              <img src={article.image_url} alt="" className="w-full h-full object-cover" />
                           ) : (
                              <FileText size={20} className="text-slate-400" />
                           )}
                        </div>
                        <div>
                           <p className="font-medium text-slate-800 line-clamp-1">{article.title}</p>
                           <p className="text-xs text-slate-400 font-mono">/{article.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {article.published_date}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/news/${article.id}`}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors inline-block"
                          title="Edit Berita"
                        >
                           <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          disabled={deletingId === article.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus Berita"
                        >
                          {deletingId === article.id ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Trash2 size={18} />
                          )}
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

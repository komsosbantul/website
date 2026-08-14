import Link from "next/link";
import { Calendar, Image, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Get User Email for greeting
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Selamat Datang, Admin!
      </h1>
      <p className="text-slate-500 mb-8">
        Masuk sebagai <span className="font-semibold text-slate-700">{user?.email}</span>
      </p>

      {/* Quick Stats / Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Jadwal Misa Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Calendar size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Manajemen Jadwal</h3>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Atur jadwal misa harian, mingguan, dan peringatan khusus di semua gereja.
          </p>
          <Link 
            href="/admin/schedules"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Kelola Jadwal <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Galeri Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Image size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Manajemen Galeri</h3>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            Unggah dan kelola dokumentasi foto kegiatan paroki.
          </p>
          <Link 
            href="/admin/gallery"
            className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            Kelola Galeri <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

      </div>
    </div>
  );
}

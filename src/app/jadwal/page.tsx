import React from "react";
import PageHeader from "@/components/PageHeader";
import { Calendar } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/database";
import ScheduleInteractiveLayout from "@/components/ScheduleInteractiveLayout";

// Define the shape of our grouped data
type GroupedSchedule = {
  church_name: string;
  items: {
    label: string;
    time: string;
    note: string | null;
  }[];
};

export const dynamic = 'force-dynamic';

export default async function JadwalPage() {
  const supabase = await createClient();
  
  // 1. Fetch Data
  const { data, error } = await supabase
    .from("mass_schedules")
    .select("*")
    .order("church_name", { ascending: true });

  const schedules = data as Database['public']['Tables']['mass_schedules']['Row'][] | null;

  if (error) {
    console.error("Error fetching schedules:", error);
  }

  // 2. Group Data by Church Name
  const groupedData: GroupedSchedule[] = [];
  
  (schedules || []).forEach((schedule) => {
    let group = groupedData.find((g) => g.church_name === schedule.church_name);
    
    if (!group) {
      group = {
        church_name: schedule.church_name,
        items: []
      };
      groupedData.push(group);
    }
    
    group.items.push({
      label: schedule.day,
      time: schedule.time,
      note: schedule.description || schedule.schedule_type
    });
  });

  // 3. Apply Custom Sort Order
  const CHURCH_ORDER = [
    "Gereja Santo Yakobus Bantul",
    "Gereja Mater Dei Imogiri",
    "Gereja Maria Rosari Gesikan",
    "Gereja Yakobus Alfeus Pajangan"
  ];

  groupedData.sort((a, b) => {
    const indexA = CHURCH_ORDER.indexOf(a.church_name);
    const indexB = CHURCH_ORDER.indexOf(b.church_name);
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.church_name.localeCompare(b.church_name);
  });

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Jadwal Misa" 
        subtitle="Perayaan Ekaristi di Gereja Santo Yakobus Bantul"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-12 space-y-16">
        
        {/* Error State */}
        {error && (
           <div className="text-center bg-red-50 text-red-600 p-4 rounded-lg">
             <p>Maaf, gagal memuat jadwal misa saat ini.</p>
           </div>
        )}

        {/* Empty State */}
        {!error && groupedData.length === 0 && (
           <div className="text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
             <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
             <p className="text-lg font-medium text-slate-600">Jadwal Belum Tersedia</p>
             <p className="text-sm text-slate-400 mt-2">Silakan hubungi sekretariat untuk informasi lebih lanjut.</p>
           </div>
        )}

        {/* Interactive Layout Component */}
        {!error && groupedData.length > 0 && (
          <ScheduleInteractiveLayout groupedData={groupedData} />
        )}

      </div>
    </main>
  );
}

import React from "react";
import { Calendar } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import ScheduleInteractiveLayout from "@/components/ScheduleInteractiveLayout";
import FadeIn from "./FadeIn";

// Define the shape of our grouped data
type GroupedSchedule = {
  church_name: string;
  items: {
    label: string;
    time: string;
    note: string | null;
  }[];
};

import { Database } from "@/types/database";

export default async function ScheduleSection() {
  const supabase = await createClient();
  
  // 1. Fetch Data
  const { data, error } = await supabase
    .from("mass_schedules")
    .select("*")
    .order("church_name", { ascending: true });

  const schedules = data as Database['public']['Tables']['mass_schedules']['Row'][] | null;

  if (error) {
    console.error("Error fetching schedules:", error);
    return (
      <section id="jadwal" className="py-20 bg-slate-50 text-center">
         <p className="text-red-500">Maaf, gagal memuat jadwal misa saat ini.</p>
      </section>
    );
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
    
    // If both are found in the priority list, sort by their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only A is in the list, it takes priority (put it first)
    if (indexA !== -1) return -1;
    
    // If only B is in the list, it takes priority
    if (indexB !== -1) return 1;
    
    // If neither keys are in the priority list, fallback to alphabetical
    return a.church_name.localeCompare(b.church_name);
  });

  return (
    <section id="jadwal" className="py-20 bg-slate-50">
      <FadeIn className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Jadwal Misa
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Jadwal perayaan Ekaristi di Wilayah Paroki Santo Yakobus Bantul.
            Silakan hadir sesuai jadwal yang tersedia.
          </p>
        </div>

        {groupedData.length === 0 ? (
           <div className="text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-100 p-8 shadow-sm max-w-lg mx-auto">
             <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
             <p className="text-lg font-medium text-slate-600">Jadwal Belum Tersedia</p>
             <p className="text-sm text-slate-400 mt-2">Silakan hubungi sekretariat untuk informasi lebih lanjut.</p>
           </div>
        ) : (
          <ScheduleInteractiveLayout groupedData={groupedData} />
        )}
      </FadeIn>
    </section>
  );
}

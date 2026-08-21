"use client";

import React, { useState } from "react";
import { Clock, Calendar, Church } from "lucide-react";

type GroupedSchedule = {
  church_name: string;
  items: {
    label: string;
    time: string;
    note: string | null;
  }[];
};

export default function ScheduleInteractiveLayout({ groupedData }: { groupedData: GroupedSchedule[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!groupedData || groupedData.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10 bg-white rounded-xl border border-slate-100 p-8 shadow-sm">
        <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <p className="text-lg font-medium text-slate-600">Jadwal Belum Tersedia</p>
        <p className="text-sm text-slate-400 mt-2">Silakan hubungi sekretariat untuk informasi lebih lanjut.</p>
      </div>
    );
  }

  const activeChurch = groupedData[activeIndex];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Master View (Sidebar/Tabs) */}
      <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-slate-100 p-4">
          <div className="flex items-center justify-between mb-4 px-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 md:mb-0">
              Pilih Gereja
            </h3>
          </div>
          {/* Desktop view (buttons) */}
          <div className="hidden md:flex flex-col gap-2">
            {groupedData.map((church, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all shrink-0 md:shrink border snap-start ${
                    isActive 
                      ? "bg-amber-600 text-white border-amber-600 shadow-md" 
                      : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <Church className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className={`font-semibold md:whitespace-normal ${isActive ? "" : "text-sm"}`}>
                    {church.church_name.replace("Gereja ", "")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile view (select dropdown) */}
          <div className="md:hidden relative mt-2">
            <select
              className="w-full bg-white border border-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
              value={activeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
            >
              {groupedData.map((church, index) => (
                <option key={index} value={index}>
                  {church.church_name.replace("Gereja ", "")}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Detail View (Schedule Cards) */}
      <div className="w-full md:flex-1">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
           <Calendar className="w-8 h-8 text-amber-600 shrink-0" />
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
             {activeChurch.church_name}
           </h2>
        </div>

        {activeChurch.items.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100 border-dashed">
             Belum ada jadwal yang terdaftar untuk gereja ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeChurch.items.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-200 transition-all text-center group h-full flex flex-col items-center justify-center relative overflow-hidden"
              >
                {/* Accent top border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                
                <div className="inline-block px-4 py-1.5 bg-amber-50 text-amber-700 font-bold rounded-full mb-6 text-sm">
                  {item.label}
                </div>
                <div className="flex items-center justify-center gap-3 text-4xl font-extrabold text-slate-800 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-amber-500 shrink-0" />
                  <span className="tracking-tight">{item.time}</span>
                </div>
                <div className="w-full h-px bg-slate-100 my-4" />
                <p className="text-slate-500 font-medium text-sm">{item.note}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { Image as ImageIcon, ExternalLink, Calendar, Filter } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/database";

type GalleryEvent = Database['public']['Tables']['gallery_events']['Row'];

// Helper for Indonesian Month Names
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

// Helper to format date nicely
const formatDate = (dateString: string) => {
  const parts = dateString.split("-");
  // Handle potential bad date formats
  if (parts.length < 3) return dateString;
  
  const [year, month, day] = parts;
  return `${day} ${MONTH_NAMES[parseInt(month) - 1]} ${year}`;
};

export default function GalleryList({ events }: { events: GalleryEvent[] }) {
  const [activeMonth, setActiveMonth] = useState("Semua");

  // Determine the display year from the most recent event, or default to 2026
  const displayYear = events.length > 0 ? events[0].event_date.split("-")[0] : "2026";

  // Always show all 12 months
  const availableMonths = useMemo(() => {
    return MONTH_NAMES.map((name, index) => ({
      value: index.toString(),
      label: name
    }));
  }, []);

  // Filter Logic
  const filteredEvents = useMemo(() => {
    return events.filter(item => {
      const parts = item.event_date.split("-");
      if (parts.length < 2) return false;
      
      const monthStr = parts[1];
      const monthIndex = parseInt(monthStr, 10) - 1;

      // Filter Month
      if (activeMonth !== "Semua") {
        if (monthIndex.toString() !== activeMonth) return false;
      }

      return true;
    });
  }, [activeMonth, events]);

  const handleShare = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/galeri#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link disalin: " + url);
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-6xl mt-12">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-800">Dokumentasi Tahun {displayYear}</h2>
        <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col items-center mb-12 space-y-6">
        {/* Month Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {availableMonths.map((month) => (
            <button
              key={month.value}
              onClick={() => setActiveMonth(activeMonth === month.value ? "Semua" : month.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeMonth === month.value
                  ? "bg-amber-600 text-white border-amber-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-amber-500 hover:text-amber-600"
              }`}
            >
              {month.label}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div 
             key={event.id} 
             className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full relative"
          >
            {/* ID Anchor for scrolling */}
            <div id={event.id} className="absolute -top-32" />

            {/* Thumbnail */}
            <div className="relative aspect-[3/2] overflow-hidden bg-slate-200">
              {event.cover_image ? (
                <img 
                  src={event.cover_image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                  <ImageIcon size={48} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-amber-600 text-sm font-bold mb-2">
                <Calendar size={16} />
                <span>{formatDate(event.event_date)}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2">
                {event.title}
              </h3>
              
              <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                {event.google_drive_link ? (
                  <a 
                    href={event.google_drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-lg transition-colors border border-amber-200"
                  >
                    Lihat
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-50 text-slate-400 font-medium rounded-lg border border-slate-200 opacity-50 cursor-not-allowed">
                    Lihat
                  </div>
                )}
                <button 
                  onClick={(e) => handleShare(e, event.id)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium rounded-lg transition-colors border border-slate-200"
                >
                  <ExternalLink size={16} />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">Tidak ada dokumentasi</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Belum ada dokumentasi yang ditemukan
            {activeMonth !== "Semua" && (
              <span> 
                 {' '}untuk bulan <span className="font-semibold text-slate-700">{MONTH_NAMES[parseInt(activeMonth)]}</span>
              </span>
            )}
            .
          </p>
        </div>
      )}

    </div>
  );
}

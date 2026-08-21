"use client";

import React, { useState } from "react";
import { Users, Shield, Briefcase, Heart, BookOpen, Settings, MapPin } from "lucide-react";

export type LayoutCategory = {
  title: string;
  items: {
    label: string;
    details: string[];
  }[];
};

// Helper function to pick an icon
const getIconForItem = (label: string, isActive: boolean) => {
  const iconClass = `w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`;
  
  if (label.toLowerCase().includes("wilayah")) return <MapPin className={iconClass} />;
  
  if (label.toLowerCase().includes("liturgi")) return <BookOpen className={iconClass} />;
  if (label.toLowerCase().includes("pewartaan")) return <Users className={iconClass} />;
  if (label.toLowerCase().includes("kemasyarakatan")) return <Heart className={iconClass} />;
  if (label.toLowerCase().includes("persaudaraan") || label.toLowerCase().includes("paguyuban")) return <Users className={iconClass} />;
  if (label.toLowerCase().includes("rumah tangga")) return <Settings className={iconClass} />;
  if (label.toLowerCase().includes("penelitian")) return <Briefcase className={iconClass} />;
  
  return <Shield className={iconClass} />;
};

export default function TeamsInteractiveLayout({ categories }: { categories: LayoutCategory[] }) {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  if (!categories || categories.length === 0) {
    return null;
  }

  const activeCategory = categories[activeCategoryIdx];
  const activeItem = activeCategory?.items[activeItemIdx];

  if (!activeItem) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Master View (Sidebar/Tabs) */}
      <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
        <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-6">
          
          {categories.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
                {category.title}
              </h3>
              {/* Desktop view (buttons) */}
              <div className="hidden md:flex flex-col gap-2">
                {category.items.map((item, itemIdx) => {
                  const isActive = catIdx === activeCategoryIdx && itemIdx === activeItemIdx;
                  return (
                    <button
                      key={itemIdx}
                      onClick={() => {
                        setActiveCategoryIdx(catIdx);
                        setActiveItemIdx(itemIdx);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all shrink-0 md:shrink border ${
                        isActive 
                          ? "bg-amber-600 text-white border-amber-600 shadow-md" 
                          : "bg-transparent text-slate-600 border-transparent hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      {getIconForItem(item.label, isActive)}
                      <span className={`font-semibold md:whitespace-normal ${isActive ? "" : "text-sm"}`}>
                        {item.label.replace("Bidang ", "")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile view (select dropdown) */}
              <div className="md:hidden relative">
                <select
                  className="w-full bg-white border border-slate-200 text-slate-800 font-semibold rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                  value={activeCategoryIdx === catIdx ? activeItemIdx : 0}
                  onChange={(e) => {
                    setActiveCategoryIdx(catIdx);
                    setActiveItemIdx(Number(e.target.value));
                  }}
                >
                  {category.items.map((item, itemIdx) => (
                    <option key={itemIdx} value={itemIdx}>
                      {item.label.replace("Bidang ", "")}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Detail View (List) */}
      <div className="w-full md:flex-1">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
           {getIconForItem(activeItem.label, false)}
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
             {activeItem.label}
           </h2>
        </div>

        {activeItem.details.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-100 border-dashed">
             Belum ada data untuk bagian ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeItem.details.map((detail, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-amber-200 transition-all group flex items-start gap-3 relative overflow-hidden"
              >
                {/* Accent top border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <span className="w-2 h-2 mt-2 bg-amber-500 rounded-full shrink-0 group-hover:scale-150 transition-transform" />
                <span className="font-medium text-slate-700 group-hover:text-amber-700 transition-colors">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

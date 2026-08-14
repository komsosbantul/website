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
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
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
                      <span className={`font-semibold whitespace-nowrap md:whitespace-normal ${isActive ? "" : "text-sm"}`}>
                        {item.label.replace("Bidang ", "")}
                      </span>
                    </button>
                  );
                })}
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

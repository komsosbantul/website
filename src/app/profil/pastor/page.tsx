"use client";

import React from "react";
import PageHeader from "@/components/PageHeader";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

export default function PastorPage() {
  const pastores = [
    {
      name: "Romo Laurentius Dwi Agus Merdi Nugroho, Pr",
      role: "Pastor Kepala Paroki",
      image: "/images/pastor-kepala.webp" 
    },
    {
      name: "Romo Chosmas Christian Timur, Pr",
      role: "Pastor Vikaris Parokial",
      image: "/images/pastor-vikaris.webp"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Pastor Paroki" 
        subtitle="Mengenal Gembala Umat Santo Yakobus Bantul"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-12">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
          {pastores.map((pastor, idx) => (
            <FadeIn key={idx} delay={idx * 0.2}>
              <div 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group max-w-sm w-full mx-auto md:mx-0 border border-slate-100"
              >
                {/* 
                   Fixed aspect ratio container for consistent height. 
                   aspect-[3/4] is standard for portrait photos.
                */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200">
                  <Image 
                    src={pastor.image} 
                    alt={pastor.name} 
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx === 0} // Prioritize the first image
                  />
                  
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-8 text-center relative">
                  {/* Decorative line */}
                  <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mb-4" />
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                    {pastor.name}
                  </h3>
                  <p className="text-amber-600 font-bold uppercase tracking-wider text-sm">
                    {pastor.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}

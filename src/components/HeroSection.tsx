"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { heroContent } from "@/lib/data";
import FadeIn from "./FadeIn";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with LCP Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-page.jpeg"
          alt="Gereja Santo Yakobus Bantul"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <FadeIn className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 drop-shadow-lg">
          {heroContent.headline}
        </h1>
        
        <p className="text-lg md:text-2xl font-light text-slate-100 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
          Membangun Peradaban Kasih yang Inklusif, Inovatif, dan Transformatif
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/jadwal" 
            className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            {heroContent.ctaText}
            <ArrowRight size={20} />
          </Link>
          <Link 
            href="/profil/sejarah" 
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all w-full sm:w-auto"
          >
            Profil Paroki
          </Link>
        </div>
      </FadeIn>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white/50 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}

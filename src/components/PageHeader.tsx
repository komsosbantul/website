import React from "react";
import FadeIn from "./FadeIn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  image = "/images/home-page.jpeg" 
}: PageHeaderProps) {
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <FadeIn className="relative z-10 text-center px-4" delay={0.2}>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-amber-300 font-medium max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

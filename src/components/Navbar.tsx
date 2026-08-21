"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { siteConfig, navigation } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Determine if the current page has a light top background
  const isLightTopPage = pathname?.startsWith("/warta/") && pathname !== "/warta";
  
  // If it's a light top page, it should never use the transparent white-text style
  const isSolid = isScrolled || isLightTopPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  // Hide Navbar on Admin pages and Login page
  if (pathname?.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  // Helper to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      isSolid 
        ? "bg-white/95 backdrop-blur shadow-sm border-b border-gray-100" 
        : "bg-black/20 backdrop-blur-md border-b border-white/10"
    }`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 z-50 group shrink-0" onClick={() => setIsOpen(false)}>
            <Image 
              src="/images/logo%20(1).svg" 
              alt="Logo Paroki" 
              width={36} 
              height={36} 
              className={`object-contain transition-all duration-500 ${isSolid ? "" : "brightness-0 invert"}`}
            />
            <span className={`text-base md:text-lg font-bold tracking-tight leading-snug transition-colors duration-500 ${
              isSolid ? "text-black" : "text-white"
            }`}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 md:gap-4 lg:gap-8">
            {navigation.map((item) => {
              const isItemActive = isActive(item.href) || (item.children && item.children.some(child => isActive(child.href)));
              
              if (item.children) {
                return (
                  <div 
                    key={item.label} 
                    className="relative group"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors duration-500 py-2 ${
                        isItemActive 
                          ? (isSolid ? "text-amber-600" : "text-amber-400") 
                          : (isSolid ? "text-slate-700 hover:text-amber-600" : "text-white/90 hover:text-white")
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden transition-all duration-200 transform ${
                      activeDropdown === item.label 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0"
                    }`}>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`block px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                            isActive(child.href) 
                              ? "bg-amber-50 text-amber-700" 
                              : "text-slate-700 hover:bg-amber-50 hover:text-amber-700"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-500 ${
                    isItemActive 
                      ? (isSolid ? "text-amber-600 font-semibold" : "text-amber-400 font-semibold") 
                      : (isSolid ? "text-slate-700 hover:text-amber-600" : "text-white/90 hover:text-white")
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            <a
              href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors shadow-sm"
            >
              <Phone size={16} />
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`p-2 transition-colors ${isSolid || isOpen ? "text-slate-700 hover:text-amber-600" : "text-white hover:text-gray-200"}`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top-5 fade-in duration-200 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-2">
            {navigation.map((item) => {
               const isItemActive = isActive(item.href) || (item.children && item.children.some(child => isActive(child.href)));

               if (item.children) {
                 return (
                   <div key={item.label} className="border-b border-gray-50 pb-2">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={`flex w-full items-center justify-between px-2 py-3 text-base font-medium ${
                          isItemActive ? "text-amber-600" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} 
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-4 space-y-1 bg-slate-50 rounded-md py-2">
                           {item.children.map((child) => (
                             <Link
                               key={child.label}
                               href={child.href}
                               className={`block px-2 py-2 text-sm ${
                                  isActive(child.href) ? "text-amber-600 font-semibold" : "text-slate-600 hover:text-amber-600"
                               }`}
                               onClick={() => setIsOpen(false)}
                             >
                               {child.label}
                             </Link>
                           ))}
                        </div>
                      )}
                   </div>
                 )
               }

               return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block px-2 py-3 text-base font-medium rounded-md transition-colors ${
                    isItemActive ? "text-amber-600 bg-amber-50" : "text-slate-800 hover:text-amber-600 hover:bg-amber-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
               )
            })}
            
            <div className="pt-4 mt-2">
              <a
                href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-semibold text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <Phone size={18} />
                Hubungi Kami ({siteConfig.phone})
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

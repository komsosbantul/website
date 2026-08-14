import React from "react";
import Link from "next/link";
import { siteConfig, navigation } from "@/lib/data";
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="kontak" className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">{siteConfig.name}</h3>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 pt-4">
              <Link href={siteConfig.socials.instagram} className="hover:text-amber-500 transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href={siteConfig.socials.youtube} className="hover:text-amber-500 transition-colors">
                <Youtube size={24} />
              </Link>
              <Link href={siteConfig.socials.facebook} className="hover:text-amber-500 transition-colors">
                <Facebook size={24} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-amber-500 transition-colors hover:translate-x-1 inline-block duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                <span className="leading-relaxed">{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{siteConfig.phone} (Sekretariat)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

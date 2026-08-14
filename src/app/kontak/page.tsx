import React from "react";
import PageHeader from "@/components/PageHeader";
import { Phone, MapPin, Mail, Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function KontakPage() {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-amber-700" />,
      label: "Alamat Gereja",
      value: "Jl. Mgr. Albertus Soegijopranoto No. 1, Bantul, DI Yogyakarta 55711",
      action: {
        text: "Lihat di Google Maps",
        href: "https://goo.gl/maps/xyz" // Generic link, the embed is the main visual
      }
    },
    {
      icon: <Phone className="w-6 h-6 text-amber-700" />,
      label: "Telepon / WhatsApp",
      value: "0857-2576-3551 (Edi - Sekretariat)",
      action: {
        text: "Chat via WhatsApp",
        href: "https://wa.me/6285725763551"
      }
    },
    {
      icon: <Mail className="w-6 h-6 text-amber-700" />,
      label: "Email",
      value: "komsos.styakobus.bantul@gmail.com",
      action: {
        text: "Kirim Email",
        href: "mailto:komsos.styakobus.bantul@gmail.com"
      }
    },
    {
      icon: <Instagram className="w-6 h-6 text-amber-700" />,
      label: "Instagram",
      value: "@styakobus",
      action: {
        text: "Kunjungi Profil",
        href: "https://instagram.com/styakobus"
      }
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Hubungi Kami" 
        subtitle="Kami siap melayani umat dengan sepenuh hati"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl mt-[-4rem] relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left Column: Contact Info */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Informasi Kontak</h2>
            
            <div className="space-y-10">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-5 items-start group">
                  <div className="shrink-0 w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-1">
                      {info.label}
                    </h3>
                    <p className="text-slate-800 font-medium text-lg leading-snug mb-2">
                      {info.value}
                    </p>
                    {info.action && (
                      <Link 
                        href={info.action.href} 
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-amber-600 transition-colors"
                      >
                        {info.action.text}
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[400px]">
             <iframe 
               src="https://maps.google.com/maps?q=Gereja+Katolik+Santo+Yakobus+Bantul&t=&z=15&ie=UTF8&iwloc=&output=embed"
               className="absolute inset-0 w-full h-full"
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Peta Lokasi Gereja Santo Yakobus Bantul"
             />
          </div>

        </div>
      </div>
    </main>
  );
}

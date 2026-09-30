import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {
  MapPin, Phone, Clock, ExternalLink, Mail, ChevronRight,
  Church, CalendarDays, ArrowRight, Globe
} from "lucide-react";

import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gereja Klodran Bantul - Paroki Santo Yakobus | parokibantul.org",
  description:
    "Gereja Klodran Bantul adalah nama populer untuk Paroki Santo Yakobus Bantul. Temukan jadwal misa, alamat, dan info lengkap Gereja Klodran Bantul di parokibantul.org.",
  keywords: [
    "gereja klodran bantul",
    "gereja klodran",
    "gereja bantul klodran",
    "gereja santo yakobus klodran",
    "paroki klodran bantul",
    "jadwal misa klodran bantul",
    "gereja bantul",
    "misa klodran",
  ],
  alternates: { canonical: `${siteConfig.url}/gereja-klodran-bantul` },
  openGraph: {
    title: "Gereja Klodran Bantul - Paroki Santo Yakobus Bantul",
    description:
      "Gereja Klodran Bantul (Paroki Santo Yakobus). Jadwal Misa, Alamat, Kontak dan Informasi Lengkap Gereja Klodran Bantul.",
    url: `${siteConfig.url}/gereja-klodran-bantul`,
    type: "website",
    images: [{ url: `${siteConfig.url}/images/home-page.jpeg`, width: 1200, height: 630 }],
  },
};

const jsonLdChurchPage = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Gereja Klodran Bantul",
  alternateName: ["Paroki Santo Yakobus Bantul", "Gereja Santo Yakobus Klodran Bantul", "Gereja Bantul"],
  url: `${siteConfig.url}/gereja-klodran-bantul`,
  description: "Gereja Klodran Bantul adalah Paroki Santo Yakobus Bantul, gereja Katolik Roma di bawah Keuskupan Agung Semarang.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Mgr. Albertus Soegijopranoto No. 1, Klodran",
    addressLocality: "Bantul",
    addressRegion: "Daerah Istimewa Yogyakarta",
    postalCode: "55711",
    addressCountry: "ID",
  },
  geo: { "@type": "GeoCoordinates", latitude: -7.8851, longitude: 110.3271 },
  telephone: siteConfig.phone,
  email: siteConfig.email,
};

const missSchedule = [
  { day: "Senin – Sabtu", time: "05:30 WIB", type: "Misa Harian", highlight: false },
  { day: "Sabtu", time: "16:00 WIB", type: "Misa Minggu Sabtu Sore", highlight: true },
  { day: "Minggu", time: "06:00 WIB", type: "Misa Minggu Pagi I", highlight: true },
  { day: "Minggu", time: "08:00 WIB", type: "Misa Minggu Pagi II", highlight: true },
  { day: "Jumat Pertama", time: "17:00 WIB", type: "Misa Jumat Pertama", highlight: false },
];


export default function GerejaKlodranBantulPage() {
  return (
    <>
      <Script
        id="json-ld-klodran"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdChurchPage) }}
        strategy="beforeInteractive"
      />

      <main className="min-h-screen bg-slate-50 overflow-x-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home-page.jpeg"
              alt="Gereja Klodran Bantul - Paroki Santo Yakobus"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            {/* Multi-layer overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-slate-900/30" />
          </div>

          {/* Decorative circles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-5xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 text-sm font-semibold text-amber-200 tracking-wider uppercase">
              <Church size={14} className="text-amber-400" />
              Paroki Santo Yakobus Bantul
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-none tracking-tight">
              <span className="block text-white drop-shadow-2xl">Gereja</span>
              <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
                Klodran Bantul
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-3 leading-relaxed">
              Website Resmi Paroki Santo Yakobus Bantul
            </p>
            <p className="text-sm text-amber-300/80 mb-10 tracking-wide">
              📍 Jl. Mgr. Soegijopranoto No. 1, Klodran, Bantul, DIY 55711
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/jadwal"
                className="group inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105 text-base"
              >
                <Clock size={20} />
                Jadwal Misa Gereja Klodran
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-base"
              >
                <Globe size={18} />
                Beranda Paroki
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/25 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </div>
          </div>
        </section>



        {/* ── INFO CARDS ── */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <span className="text-amber-600 font-bold tracking-widest text-xs uppercase">Informasi Gereja</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Tentang Gereja Klodran Bantul
              </h2>
              <p className="text-slate-500 mt-3 max-w-xl mx-auto">
                Gereja Santo Yakobus Bantul — lebih dikenal sebagai <strong>Gereja Klodran</strong> — pusat pelayanan umat Katolik di Bantul, DIY.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Alamat Card */}
              <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-amber-100/60 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                  <MapPin size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-3">Alamat Gereja Klodran Bantul</h3>
                <address className="not-italic text-slate-600 leading-relaxed text-sm mb-5">
                  <strong className="text-slate-800">Paroki Santo Yakobus Bantul</strong><br />
                  Jl. Mgr. Albertus Soegijopranoto No. 1<br />
                  Klodran, Bantul<br />
                  Kabupaten Bantul, DIY 55711
                </address>
                <a
                  href="https://maps.google.com/?q=Gereja+Santo+Yakobus+Klodran+Bantul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-bold text-sm transition-colors"
                >
                  <ExternalLink size={15} /> Buka di Google Maps
                </a>
              </div>

              {/* Kontak Card */}
              <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 hover:shadow-xl hover:shadow-slate-900/30 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Phone size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-white mb-4">Kontak Gereja Bantul</h3>
                <ul className="space-y-4">
                  <li>
                    <p className="text-slate-400 text-xs mb-1 tracking-wider uppercase">Telepon</p>
                    <a href={`tel:${siteConfig.phone}`} className="font-bold text-amber-400 hover:text-amber-300 transition-colors">
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-slate-400 text-xs mb-1 tracking-wider uppercase">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="font-semibold text-amber-400 hover:text-amber-300 transition-colors text-sm break-all">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-slate-400 text-xs mb-1 tracking-wider uppercase">Website Resmi</p>
                    <Link href="/" className="font-bold text-amber-400 hover:text-amber-300 transition-colors">
                      parokibantul.org
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Instagram", href: siteConfig.socials.instagram, handle: "@styakobus", color: "from-pink-500 to-rose-500" },
                { label: "YouTube", href: siteConfig.socials.youtube, handle: "Gereja St. Yakobus Bantul", color: "from-red-500 to-red-700" },
                { label: "Facebook", href: siteConfig.socials.facebook, handle: "gerejastyakobusbantul", color: "from-blue-500 to-blue-700" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 transition-all hover:shadow-md"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <ExternalLink size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{s.label}</p>
                    <p className="text-slate-500 text-xs truncate">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── JADWAL MISA ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <span className="text-amber-400 font-bold tracking-widest text-xs uppercase">Gereja Klodran Bantul</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                Jadwal Misa Gereja Bantul
              </h2>
              <p className="text-slate-400 mt-3">
                Jadwal Misa resmi Gereja Santo Yakobus Bantul (Klodran)
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {missSchedule.map((s, i) => (
                <div
                  key={i}
                  className={`group flex items-center justify-between rounded-2xl p-5 transition-all duration-200 border ${
                    s.highlight
                      ? "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/15"
                      : "bg-white/5 border-white/10 hover:bg-white/8"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      s.highlight ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-slate-400"
                    }`}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{s.type}</p>
                      <p className="text-slate-400 text-xs">{s.day}</p>
                    </div>
                  </div>
                  <div className={`font-black text-xl tabular-nums ${s.highlight ? "text-amber-400" : "text-slate-300"}`}>
                    {s.time}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/jadwal"
                className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-105"
              >
                <CalendarDays size={20} />
                Lihat Jadwal Lengkap
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── TENTANG KLODRAN ── */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-amber-600 font-bold tracking-widest text-xs uppercase">Sejarah & Info</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2 mb-6 leading-tight">
                  Mengapa Disebut{" "}
                  <span className="text-amber-600">Gereja Klodran?</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-800">Gereja Klodran Bantul</strong> adalah sebutan
                    populer untuk <strong>Paroki Santo Yakobus Bantul</strong>, gereja Katolik Roma
                    yang berlokasi di daerah <em>Klodran</em>, Bantul, Daerah Istimewa Yogyakarta.
                  </p>
                  <p>
                    Paroki ini berdiri sejak <strong className="text-amber-700">25 Juli 1934</strong>{" "}
                    dan kini berada di bawah naungan{" "}
                    <strong>Keuskupan Agung Semarang</strong>. Gereja ini sering disebut juga sebagai{" "}
                    <em>Gereja Bantul</em>, <em>Gereja Katolik Bantul</em>, atau{" "}
                    <em>Gereja Santo Yakobus Klodran</em>.
                  </p>
                  <p>
                    Website resmi Gereja Klodran Bantul:{" "}
                    <Link href="/" className="text-amber-700 font-bold hover:underline">
                      parokibantul.org
                    </Link>
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/profil/sejarah"
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                  >
                    Baca Sejarah Lengkap <ChevronRight size={16} />
                  </Link>
                  <Link
                    href="/kontak"
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-3 rounded-xl transition-all text-sm"
                  >
                    <Mail size={16} /> Hubungi Kami
                  </Link>
                </div>
              </div>

              {/* Info Pills */}
              <div className="space-y-3">
                {[
                  { label: "Nama Resmi", value: "Paroki Santo Yakobus Bantul" },
                  { label: "Nama Populer", value: "Gereja Klodran Bantul / Gereja Bantul" },
                  { label: "Lokasi", value: "Klodran, Bantul, DIY 55711" },
                  { label: "Keuskupan", value: "Keuskupan Agung Semarang (KAS)" },
                  { label: "Berdiri Sejak", value: "25 Juli 1934" },
                  { label: "Website", value: "parokibantul.org" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 rounded-2xl px-5 py-4 transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                      <p className="text-slate-800 font-semibold text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BOTTOM ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-amber-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <Church size={48} className="text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Kunjungi Website Resmi Kami
            </h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto leading-relaxed">
              Temukan informasi lengkap jadwal misa, warta paroki, galeri kegiatan, dan
              berbagai layanan Gereja Klodran Bantul di website resmi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-3 bg-white text-amber-700 font-black px-8 py-4 rounded-2xl transition-all hover:bg-amber-50 shadow-xl hover:scale-105"
              >
                <Globe size={20} />
                Beranda parokibantul.org
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/warta"
                className="inline-flex items-center justify-center gap-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm font-semibold px-8 py-4 rounded-2xl transition-all"
              >
                Warta Paroki
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

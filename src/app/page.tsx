import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/ScheduleSection";
import NewsHighlightSection from "@/components/NewsHighlightSection";
import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Gereja Bantul - Paroki Santo Yakobus Bantul (Klodran) | parokibantul.org",
  description: "Website resmi Gereja Santo Yakobus Bantul (Klodran Bantul). Jadwal Misa Gereja Bantul setiap hari. Gereja Katolik di Bantul Yogyakarta - Paroki Santo Yakobus Klodran.",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Gereja Bantul | Paroki Santo Yakobus Bantul - Klodran",
    description: "Website resmi Gereja Santo Yakobus Bantul (Klodran Bantul). Jadwal Misa Gereja Bantul setiap hari. Gereja Katolik di Bantul Yogyakarta.",
    url: siteConfig.url,
    type: "website",
  },
};

// JSON-LD FAQ untuk homepage
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Di mana lokasi Gereja Bantul (Gereja Klodran Bantul)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gereja Bantul atau Gereja Klodran Bantul bernama resmi Gereja Santo Yakobus Bantul, berlokasi di Jl. Mgr. Albertus Soegijopranoto No. 1, Klodran, Bantul, Kabupaten Bantul, DIY 55711.",
      },
    },
    {
      "@type": "Question",
      "name": "Apa jadwal misa Gereja Bantul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jadwal Misa Gereja Bantul: Misa Harian Senin-Sabtu 05:30 WIB. Misa Minggu: Sabtu 16:00 WIB, Minggu 06:00 WIB dan 08:00 WIB. Misa Jumat Pertama 17:00 WIB.",
      },
    },
    {
      "@type": "Question",
      "name": "Apa nama gereja Katolik di Bantul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gereja Katolik di Bantul adalah Paroki Santo Yakobus Bantul, sering disebut Gereja Klodran Bantul karena berlokasi di Klodran. Website resminya: parokibantul.org.",
      },
    },
    {
      "@type": "Question",
      "name": "Berapa nomor telepon Gereja Bantul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nomor telepon Gereja Santo Yakobus Bantul (Klodran): 0857-2576-3551. Email: komsos.styakobus.bantul@gmail.com",
      },
    },
  ],
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Gereja Bantul - Paroki Santo Yakobus",
      "item": siteConfig.url,
    },
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        strategy="beforeInteractive"
      />
      <Script
        id="json-ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        strategy="beforeInteractive"
      />
      <HeroSection />

      {/* Tentang Paroki Section */}
      <section id="profil" className="py-20 bg-white">
        <FadeIn className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-3 block">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Paroki Santo Yakobus Bantul
          </h2>
          <div className="prose prose-lg prose-slate mx-auto text-slate-600 leading-relaxed">
            <p className="mb-6">
              Selamat datang di website resmi <strong>{siteConfig.name}</strong>. 
              Kami adalah komunitas umat beriman yang dipersatukan dalam kasih Kristus, 
              berkomitmen untuk mewartakan Kabar Gembira dan melayani sesama dengan semangat 
              Santo Yakobus Rasul.
            </p>
            <p>
              Sebagai bagian dari Keuskupan Agung Semarang, kami terus berupaya 
              membangun gereja yang inklusif, hidup, dan berbuah bagi masyarakat sekitar. 
              Mari bertumbuh bersama dalam iman, harapan, dan kasih.
            </p>
          </div>
        </FadeIn>
      </section>

      <ScheduleSection />

      {/* Warta Highlight Section */}
      <NewsHighlightSection />
    </>
  );
}

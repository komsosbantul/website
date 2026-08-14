import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/ScheduleSection";
import NewsHighlightSection from "@/components/NewsHighlightSection";
import FadeIn from "@/components/FadeIn";
import { siteConfig } from "@/lib/data";

export default function Home() {
  return (
    <>
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

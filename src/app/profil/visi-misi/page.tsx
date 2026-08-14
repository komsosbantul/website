import React from "react";
import PageHeader from "@/components/PageHeader";
import { Sparkles, BookOpen, Users, HeartHandshake, Handshake, Target, Quote } from "lucide-react";

export default function VisiMisiPage() {
  const missions = [
    {
      id: 1,
      icon: <Sparkles className="w-8 h-8 text-amber-600" />,
      title: "Spiritualitas & Inovasi",
      text: "Meningkatkan penghayatan spiritualitas Santo Yakobus melalui berbagai kegiatan rohani dan pelayanan karitatif sebagai gereja yang inklusif, inovatif dan transformatif untuk membangun terwujudnya peradaban kasih di tengah masyarakat."
    },
    {
      id: 2,
      icon: <BookOpen className="w-8 h-8 text-amber-600" />,
      title: "Formatio Iman",
      text: "Menyelenggarakan formatio iman dalam berbagai kegiatan rohani dan karitatif secara integral, berjenjang dan berkelanjutan yang cerdas, tangguh, misioner dan dialogal menuju perwujudan gereja yang inklusif, inovatif dan transformatif."
    },
    {
      id: 3,
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Pembinaan Kaum Muda",
      text: "Meningkatkan pembinaan iman kaum muda secara berjenjang (PUD, PIA, PIR dan PIOM) dalam berbagai kegiatan rohani, karitatif dan kebudayaan/kesenian sebagai upaya perwujudan gereja kaum muda yang inklusif, inovatif dan transformatif."
    },
    {
      id: 4,
      icon: <HeartHandshake className="w-8 h-8 text-amber-600" />,
      title: "Kepedulian Sosial (KLMTD)",
      text: "Meningkatkan kepedulian umat kepada kaum kecil, lemah, miskin, tersingkir, difabel, petani dan buruh, dengan mengedepankan semangat gotong-royong dan saling menghargai yang berlandaskan Pancasila."
    },
    {
      id: 5,
      icon: <Handshake className="w-8 h-8 text-amber-600" />,
      title: "Kerjasama & Dialog",
      text: "Mengembangkan kerjasama, semangat gotong-royong, saling menghargai dan dialogal dengan berbagai pihak/komunitas/lembaga/pemerintah sebagai perwujudan gereja yang inklusif, inovatif dan transformatif dalam berbagai bidang kehidupan yang berkaitan dengan kesejahteraan, martabat manusia dan keberimanan."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Visi & Misi" 
        subtitle="Arah Dasar dan Tujuan Pastoral Paroki Santo Yakobus Bantul"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-12 space-y-16">
        
        {/* VISI SECTION */}
        <section className="relative">
           {/* Decorative Elements */}
           <div className="absolute -top-6 -left-6 text-amber-200 opacity-50">
             <Quote size={80} />
           </div>
           
           <div className="relative bg-amber-50 rounded-2xl p-10 md:p-16 border border-amber-100 shadow-sm text-center">
             <h2 className="text-xl md:text-2xl font-bold text-amber-600 mb-6 uppercase tracking-wider flex items-center justify-center gap-2">
               <Target className="w-6 h-6" />
               Visi Paroki
             </h2>
             <blockquote className="text-2xl md:text-4xl font-serif font-medium text-slate-800 leading-tight md:leading-snug">
               "Umat Allah Paroki Santo Yakobus Bantul sebagai Gereja yang <span className="text-amber-600">Inklusif</span>, <span className="text-amber-600">Inovatif</span> dan <span className="text-amber-600">Transformatif</span> membangun Terwujudnya Peradaban Kasih dalam Masyarakat Indonesia yang Sejahtera, Bermartabat dan Beriman."
             </blockquote>
           </div>
        </section>

        {/* MISI SECTION */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Misi Paroki</h2>
            <p className="text-slate-500 mt-2">Lima Langkah Strategis Mewujudkan Visi</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missions.map((misi) => (
              <div 
                key={misi.id} 
                className={`bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:border-amber-200 group ${misi.id === 5 ? 'md:col-span-2 md:w-3/4 md:mx-auto' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                    {misi.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                      {misi.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {misi.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

import React from "react";
import PageHeader from "@/components/PageHeader";
import { History, Calendar, MapPin, Church, Users, ArrowDown } from "lucide-react";

export default function SejarahPage() {
  const timelineEvents = [
    {
      year: "1936",
      title: "Gereja Pertama",
      content: "Diberkati pada 5 April 1936 oleh Rama F. Strater, SJ. Bangunan dibeli dari administratur pabrik gula. Sayangnya, pada masa pendudukan Jepang, gedung ini disita dan dibongkar.",
      icon: <Church size={20} className="text-white" />
    },
    {
      year: "1953",
      title: "Gereja Kedua (Nama Yakobus)",
      content: "Dibangun kembali oleh Rama Yakobus Van Leengoed, SJ dan Rama Carolus Rommens, SJ. Diberkati oleh Mgr. Albertus Soegijapranoto pada 29 Maret 1953. Di sinilah nama pelindung 'YAKOBUS' pertama kali diberikan.",
      icon: <Users size={20} className="text-white" />
    },
    {
      year: "2006",
      title: "Gempa Bumi & Gereja Bambu",
      content: "27 Mei 2006, gempa dahsyat merusak struktur gereja hingga harus dirobohkan. Selama 6 bulan umat misa di lapangan tenis, lalu pindah ke 'Gereja Bambu' (darurat) yang menampung 500 orang.",
      icon: <ArrowDown size={20} className="text-white" />
    },
    {
      year: "2009",
      title: "Gereja Saat Ini",
      content: "Peletakan batu pertama 1 Januari 2009. Gereja baru yang megah selesai dan diberkati pada 27 Desember 2009 oleh Mgr. Ignatius Suharyo dan diresmikan Bupati Bantul, H. Idham Samawi.",
      icon: <Church size={20} className="text-white" />
    }
  ];

  const wilayahList = [
    "Santa Maria tak Bernoda Cepit (4 Lingkungan)",
    "Santa Maria Assumpta Melikan (3 Lingkungan)",
    "Santa Maria Immaculata Cordis Bantul Krajan (2 Lingkungan)",
    "Santo Yusuf Palbapang (2 Lingkungan)",
    "Brayat Minulya Nogosari (4 Lingkungan)",
    "Santo Fransiskus Xaverius (2 Lingkungan)",
    "Mater Dei Imogiri (6 Lingkungan)",
    "Maria Rosari Gesikan (7 Lingkungan)",
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Sejarah Singkat" 
        subtitle="Perjalanan Panjang Gereja Santo Yakobus Bantul"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-12 space-y-20">
        
        {/* SECTION 1: AWAL MULA */}
        <section className="bg-white rounded-xl shadow-sm p-8 md:p-12 border-t-4 border-amber-500">
          <div className="flex items-center gap-3 mb-6">
            <History className="w-8 h-8 text-amber-600" />
            <h2 className="text-3xl font-bold text-slate-800">Awal Mula (1919 - 1934)</h2>
          </div>
          <div className="prose prose-lg text-slate-600 leading-relaxed max-w-none">
            <p className="mb-4">
              Pertumbuhan umat Katolik di Bantul diawali pada tanggal <span className="font-semibold text-amber-700">11 Juni 1919</span> melalui 
              'baptis pertolongan' oleh ibu Theresia Soertini untuk bayi bernama Antonius Kasmin. 
              Awalnya Bantul dilayani dari Gereja Kotabaru oleh Rama Henri van Driessche, SJ.
            </p>
            <p>
              Menjelang tahun 1934, jumlah umat mencapai 339 orang. Paroki ditetapkan berdiri pada 
              <span className="font-semibold text-amber-700"> 25 Juli 1934</span> (Pesta Santo Yakobus), meskipun pembaptisan pertama tercatat pada 17 Januari 1934. 
              Penetapan ini diperkuat oleh SK Uskup Agung Semarang tertanggal 17 Januari 2022.
            </p>
          </div>
        </section>

        {/* SECTION 2: TIMELINE */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Perjalanan Gedung Gereja</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-4" />
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 -ml-px md:mx-0"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={event.year} className={`relative flex items-start md:items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : '' } group`}>
                  {/* Empty space for opposite side */}
                  <div className="hidden md:block w-5/12" />

                  {/* Icon Marker */}
                  <div className="absolute left-4 md:left-1/2 -ml-4 md:-ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 shadow-lg ring-4 ring-white z-10 group-hover:bg-amber-600 transition-colors">
                    {event.icon}
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 w-full md:w-5/12 bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all md:text-left">
                    <div className="inline-block px-3 py-1 bg-amber-50 text-amber-700 font-bold text-sm rounded-full mb-3">
                      {event.year}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {event.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: SEJARAH WILAYAH */}
        <section>
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Sejarah Wilayah Khusus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card Gesikan */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 h-full">
              <div className="bg-amber-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin size={24} className="text-amber-200" />
                  Wilayah Maria Rosari - Gesikan
                </h3>
              </div>
              <div className="p-8 prose prose-slate">
                <p className="text-slate-600">
                  Bermula dari 4 anak Pajangan yang dibaptis tahun 1920. Berkembang dari Kring menjadi Stasi, 
                  dan pada 2013 menjadi Wilayah. 
                </p>
                <ul className="text-slate-600 space-y-1 mt-4 list-disc pl-5">
                  <li>Kapel St. Maria Ratu Rosari (1984)</li>
                  <li>Kapel St. Yakobus Alfeus (1998)</li>
                  <li><strong>Taman Doa Wajah Kerahiman</strong> (Diresmikan 2016)</li>
                </ul>
              </div>
            </div>

            {/* Card Imogiri */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 h-full">
              <div className="bg-slate-800 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin size={24} className="text-amber-500" />
                  Wilayah Maria Mater Dei - Imogiri
                </h3>
              </div>
              <div className="p-8 prose prose-slate">
                <p className="text-slate-600">
                  Sejarah panjang pembinaan berpindah-pindah (Kidul Loji, Bintaran, Ganjuran). 
                  Baru pada 1958 bergabung penuh ke Paroki Bantul.
                </p>
                <p className="text-sm font-bold text-slate-700 mt-4 mb-2">3 Tempat Ibadah Bersejarah:</p>
                <ul className="text-slate-600 space-y-1 list-disc pl-5">
                  <li>Kapel St. Yusup Karang Duwet (1952)</li>
                  <li>Kapel St. Silvester Sidodadi (1970)</li>
                  <li>Gereja Mater Dei (1995)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: KONDISI SAAT INI */}
        <section className="bg-amber-50 rounded-2xl p-8 md:p-12">
           <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-1/3">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Kondisi Saat Ini</h2>
                <p className="text-slate-700 leading-relaxed">
                  Saat ini Paroki Santo Yakobus Bantul terus berkembang dan melayani umat yang tersebar di berbagai wilayah.
                  Secara administratif paroki terdiri dari 8 Wilayah utama.
                </p>
                <div className="mt-6 flex items-center gap-2 text-amber-700 font-bold">
                  <Calendar size={20} />
                  <span>Data Paroki 2024</span>
                </div>
              </div>

              <div className="md:w-2/3 w-full bg-white rounded-xl p-8 shadow-sm border border-amber-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
                  Daftar 8 Wilayah Paroki
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                  {wilayahList.map((wilayah, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{wilayah}</span>
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </section>

      </div>
    </main>
  );
}

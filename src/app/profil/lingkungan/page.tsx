import React from "react";
import PageHeader from "@/components/PageHeader";
import TeamsInteractiveLayout, { LayoutCategory } from "@/components/TeamsInteractiveLayout";

const categoriesData: LayoutCategory[] = [
  {
    title: "Bidang Pelayanan",
    items: [
      {
        label: "Bidang Liturgi dan Peribadatan",
        details: [
          "Timpel Tata Perayaan dan Peribadatan",
          "Timpel Prodiakon",
          "Timpel Putra Putri Altar",
          "Timpel Paduan Suara",
          "Timpel Lektor",
          "Timpel Pemazmur",
          "Timpel Dirigen",
          "Timpel Musik Liturgi",
          "Timpel Paramenta",
          "Timpel Tata Altar"
        ]
      },
      {
        label: "Bidang Pewartaan dan Evangelisasi",
        details: [
          "Timpel Evangelisasi",
          "Timpel Sakramen Inisiasi",
          "Timpel Katekis dan Pemandu Lingkungan",
          "Timpel Kerasulan Kitab Suci",
          "Timpel PIUD",
          "Timpel PIA",
          "Timpel PIR",
          "Timpel PIOM",
          "Timpel PIOD",
          "Timpel PIUL",
          "Timpel Promosi Panggilan",
          "Timpel KOMSOS"
        ]
      },
      {
        label: "Bidang Pelayanan Kemasyarakatan",
        details: [
          "Timpel PSE",
          "Timpel Kesehatan",
          "Timpel Pendidikan",
          "Timpel Pangruktilaya",
          "Timpel HAK",
          "Timpel Karya Kerasulan Kemasyarakatan",
          "Timpel Keutuhan Ciptaan dan Ling Hidup"
        ]
      },
      {
        label: "Bidang Persaudaraan dan Paguyuban",
        details: [
          "Timpel Ibu Paroki",
          "Timpel Pastoral Keluarga",
          "Timpel Kesenian",
          "Timpel Perpustakaan"
        ]
      },
      {
        label: "Bidang Rumah Tangga",
        details: [
          "Timpel Rumah Tangga Paroki",
          "Timpel Rumah Tangga Pastoran",
          "Timpel Keamanan dan Parkir",
          "Timpel Listrik dan Audio Visual",
          "Timpel Pemeliharaan dan Inventaris",
          "Timpel Toko Benda Rohani"
        ]
      },
      {
        label: "Bidang Penelitian dan Pengembangan",
        details: [
          "Timpel Pendataan",
          "Timpel Pengembangan SDM",
          "Timpel Programasi dan Monev"
        ]
      }
    ]
  },
  {
    title: "Wilayah",
    items: [
      {
        label: "Wilayah Maria Tak Bernoda",
        details: [
          "Lingkungan St. Lukas",
          "Lingkungan St. Thomas",
          "Lingkungan St. Benediktus",
          "Lingkungan St. Matias"
        ]
      },
      {
        label: "Wilayah Maria Assumpta",
        details: [
          "Lingkungan St. Gregorius Agung",
          "Lingkungan St. Alexander Agung",
          "Lingkungan St. Petrus",
          "Lingkungan St. Stefanus",
          "Lingkungan St. Laurentius"
        ]
      },
      {
        label: "Wilayah Santa Teresa",
        details: [
          "Lingkungan St. Yohanes Bosco",
          "Lingkungan St. Yohanes Pembaptis",
          "Lingkungan St. Aloysius",
          "Lingkungan St. Vincentius"
        ]
      },
      {
        label: "Wilayah Brayat Minulyo",
        details: [
          "Lingkungan St. Ambrosius",
          "Lingkungan St. Pius X",
          "Lingkungan St. Ignatius Loyola",
          "Lingkungan St. Agustinus"
        ]
      },
      {
        label: "Wilayah Fransiskus Xaverius",
        details: [
          "Lingkungan St. Paulus",
          "Lingkungan St. Yohanes Paulus II",
          "Lingkungan St. Martinus",
          "Lingkungan St. Marius"
        ]
      },
      {
        label: "Wilayah Santa Anna",
        details: [
          "Lingkungan St. Albertus",
          "Lingkungan St. Rafael",
          "Lingkungan St. Yohanes Rasul",
          "Lingkungan St. Helena",
          "Lingkungan St. Barnabas"
        ]
      },
      {
        label: "Wilayah Maria Rosari",
        details: [
          "Lingkungan St. Philipus",
          "Lingkungan St. Matheus",
          "Lingkungan St. Bernadeta",
          "Lingkungan St. Andreas",
          "Lingkungan St. Yakobus Alfeus",
          "Lingkungan St. Markus",
          "Lingkungan St. Antonius"
        ]
      },
      {
        label: "Wilayah Mater Dei",
        details: [
          "Lingkungan St. Paulus",
          "Lingkungan St. Petrus Canisius",
          "Lingkungan St. Antonius",
          "Lingkungan St. Yustinus",
          "Lingkungan St. Stefanus Raja",
          "Lingkungan St. Yusuf"
        ]
      }
    ]
  },
  {
    title: "Komunitas",
    items: [
      {
        label: "Komunitas Paroki",
        details: [
          "Ngopi (Ngobrol Seputar Iman)",
          "TEH (Tim Ekaristi Harian)",
          "Paguyuban Woro Semedi",
          "Persekutuan Doa Karismatik Katolik"
        ]
      }
    ]
  }
];

export default function LingkunganPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Tim Pelayanan & Lingkungan" 
        subtitle="Struktur Organisasi dan Wilayah Pelayanan Gereja"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl mt-12 space-y-16">
        
        {/* Section Bidang Pelayanan */}
        <section className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
           <TeamsInteractiveLayout categories={[categoriesData[0]]} />
        </section>

        {/* Section Wilayah */}
        <section className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 mt-16">
           <TeamsInteractiveLayout categories={[categoriesData[1]]} />
        </section>

        {/* Section Komunitas */}
        <section className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100 mt-16">
           <TeamsInteractiveLayout categories={[categoriesData[2]]} />
        </section>

      </div>
    </main>
  );
}

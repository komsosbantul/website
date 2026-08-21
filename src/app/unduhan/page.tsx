import React from "react";
import PageHeader from "@/components/PageHeader";
import { FileText, Download, FileDown } from "lucide-react";
import Link from "next/link";

export default function UnduhanPage() {
  const documents = [
    {
      id: 1,
      title: "Blangko Baptis Darurat Dan Minyak Suci",
      format: "DOC",
      link: "/unduhan/BLANGKO BAPTIS DARURAT DAN MINYAK SUCI.doc"
    },
    {
      id: 2,
      title: "Blangko Calon Penerima Baptis Bayi",
      format: "DOC",
      link: "/unduhan/BLANGKO CALON PENERIMA BAPTIS BAYI.doc"
    },
    {
      id: 3,
      title: "Blangko Calon Penerima Baptis Dewasa",
      format: "DOC",
      link: "/unduhan/BLANGKO CALON PENERIMA BAPTIS DEWASA.doc"
    },
    {
      id: 4,
      title: "Blangko Calon Penerima Komuni I",
      format: "DOC",
      link: "/unduhan/BLANGKO CALON PENERIMA KOMUNI I.doc"
    },
    {
      id: 5,
      title: "Blangko Calon Penerima Krisma",
      format: "DOC",
      link: "/unduhan/BLANGKO CALON PENERIMA KRISMA.doc"
    },
    {
      id: 6,
      title: "Blangko Laporan Kematian",
      format: "DOC",
      link: "/unduhan/BLANGKO LAPORAN KEMATIAN.doc"
    },
    {
      id: 7,
      title: "Blangko Peneguhan Baptis Kristen Ke Katolik",
      format: "DOC",
      link: "/unduhan/BLANGKO PENEGUHAN BAPTIS KRISTEN ke KATOLIK.doc"
    },
    {
      id: 8,
      title: "Blangko Pindah Domisili",
      format: "DOCX",
      link: "/unduhan/BLANGKO PINDAH DOMISILI.docx"
    },
    {
      id: 9,
      title: "Blangko Sakramen Minyak Suci",
      format: "DOCX",
      link: "/unduhan/BLANGKO SAKRAMEN MINYAK SUCI.docx"
    },
    {
      id: 10,
      title: "Blangko Surat Keterangan Warga",
      format: "DOC",
      link: "/unduhan/BLANGKO SURAT KETERANGAN WARGA.doc"
    },
    {
      id: 11,
      title: "Blangko Surat Permohonan Ekaristi",
      format: "DOCX",
      link: "/unduhan/BLANGKO SURAT PERMOHONAN EKARISTI.docx"
    },
    {
      id: 12,
      title: "Blangko Surat Pernikahan Dari Lingkungan",
      format: "DOC",
      link: "/unduhan/BLANGKO SURAT PERNIKAHAN DR LINGK.doc"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Pusat Unduhan" 
        subtitle="Dokumen, Formulir, dan Panduan Paroki"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-12">
        <div className="space-y-6">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="bg-white rounded-lg shadow-sm border-l-4 border-l-amber-500 border-y border-r border-slate-100 p-6 hover:shadow-md transition-all group flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 group-hover:bg-amber-100 transition-colors">
                  <FileText size={24} />
                </div>
              </div>

              {/* Text Info */}
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {doc.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    doc.format === "PDF" 
                      ? "bg-red-50 text-red-600 border-red-100" 
                      : "bg-blue-50 text-blue-600 border-blue-100"
                  }`}>
                    {doc.format}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full md:w-auto">
                <Link
                  href={doc.link}
                  target="_blank" // Simulate opening/downloading
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-md hover:bg-amber-600 transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Download
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center bg-blue-50 rounded-xl p-6 border border-blue-100">
           <p className="text-slate-700 text-sm">
             <span className="font-bold">Butuh bantuan?</span> Silakan hubungi Sekretariat Paroki melalui halaman <Link href="/kontak" className="text-blue-600 font-bold hover:underline">Kontak</Link> jika Anda memiliki pertanyaan mengenai formulir di atas.
           </p>
        </div>

      </div>
    </main>
  );
}

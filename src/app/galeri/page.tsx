import React from "react";
import PageHeader from "@/components/PageHeader";
import { createClient } from "@/utils/supabase/server";
import GalleryList from "@/components/GalleryList";

export const dynamic = 'force-dynamic';

export default async function GaleriPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("gallery_events")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    console.error("Error fetching gallery events:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <PageHeader 
        title="Galeri Dokumentasi" 
        subtitle="Kumpulan momen kebersamaan umat Paroki Santo Yakobus Bantul"
      />

      <GalleryList events={events || []} />
    </main>
  );
}

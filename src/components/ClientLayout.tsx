"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Safe check for pathname
  const isAdminOrLogin = pathname?.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {!isAdminOrLogin && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAdminOrLogin && <Footer />}
    </>
  );
}

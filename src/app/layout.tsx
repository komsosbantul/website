import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { siteConfig } from "@/lib/data";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Gereja Bantul - Paroki Santo Yakobus Bantul (Klodran) | parokibantul.org",
    template: `%s | Gereja Santo Yakobus Bantul`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "KOMSOS Paroki Santo Yakobus Bantul" }],
  creator: "KOMSOS Paroki Santo Yakobus Bantul",
  publisher: "Paroki Santo Yakobus Bantul",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "id-ID": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: "Gereja Bantul - Paroki Santo Yakobus Bantul (Klodran)",
    description: siteConfig.description,
    siteName: "Paroki Santo Yakobus Bantul - Gereja Klodran Bantul",
    images: [
      {
        url: `${siteConfig.url}/images/home-page.jpeg`,
        width: 1200,
        height: 630,
        alt: "Gereja Santo Yakobus Bantul - Paroki Klodran Bantul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gereja Bantul - Paroki Santo Yakobus Bantul (Klodran)",
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/home-page.jpeg`],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  other: {
    "geo.region": "ID-YO",
    "geo.placename": "Bantul, Daerah Istimewa Yogyakarta",
    "geo.position": "-7.8851;110.3271",
    "ICBM": "-7.8851, 110.3271",
  },
};

// JSON-LD Structured Data untuk Google
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${siteConfig.url}/#church`,
  "name": "Gereja Santo Yakobus Bantul",
  "alternateName": [
    "Paroki Santo Yakobus Bantul",
    "Gereja Klodran Bantul",
    "Gereja Bantul",
    "Paroki Klodran Bantul",
    "Gereja Katolik Bantul",
  ],
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/icon.svg`,
  "image": `${siteConfig.url}/images/home-page.jpeg`,
  "description": "Gereja Katolik Santo Yakobus Bantul (Klodran) adalah paroki Gereja Katolik Roma di bawah Keuskupan Agung Semarang. Berlokasi di Klodran, Bantul, Daerah Istimewa Yogyakarta.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Mgr. Albertus Soegijopranoto No. 1, Klodran",
    "addressLocality": "Bantul",
    "addressRegion": "Daerah Istimewa Yogyakarta",
    "postalCode": "55711",
    "addressCountry": "ID",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -7.8851,
    "longitude": 110.3271,
  },
  "telephone": siteConfig.phone,
  "email": siteConfig.email,
  "sameAs": [
    siteConfig.socials.instagram,
    siteConfig.socials.youtube,
    siteConfig.socials.facebook,
    "https://kas.or.id/paroki-santo-ya.../",
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "05:00",
      "closes": "20:00",
      "description": "Misa Harian 05:30 WIB",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "16:00",
      "closes": "18:00",
      "description": "Misa Minggu Sabtu Sore 16:00 WIB",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "05:30",
      "closes": "10:00",
      "description": "Misa Minggu 06:00 & 08:00 WIB",
    },
  ],
  "areaServed": {
    "@type": "Place",
    "name": "Bantul, Daerah Istimewa Yogyakarta",
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Keuskupan Agung Semarang",
    "url": "https://kas.or.id",
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Paroki Santo Yakobus Bantul",
  "alternateName": "Gereja Bantul | Gereja Klodran Bantul",
  "url": siteConfig.url,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteConfig.url}/warta?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <Script
          id="json-ld-church"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
          strategy="beforeInteractive"
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-50 overflow-x-hidden`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

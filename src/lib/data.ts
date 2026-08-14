
export interface SiteConfig {
  name: string;
  description: string;
  address: string;
  email: string;
  phone: string;
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  language: string;
  location: string;
  category: "Misa Harian" | "Misa Mingguan" | "Jumat Pertama" | "Misa Lainnya";
}

export interface HeroContent {
  headline: string;
  ctaText: string;
}

export const siteConfig: SiteConfig = {
  name: "Paroki Santo Yakobus Bantul",
  description: "Paroki Santo Yakobus Bantul - Melayani dengan Kasih dan Persaudaraan.",
  address: "Jalan Mgr. Albertus Soegijopranoto, No. 1, Bantul, Bantul, Bantul, Yogyakarta, 55711",
  email: "komsos.styakobus.bantul@gmail.com",
  phone: "0857-2576-3551",
  socials: {
    instagram: "https://www.instagram.com/styakobus",
    youtube: "https://www.youtube.com/@GerejaSantoYakobusBantul",
    facebook: "https://www.facebook.com/gerejastyakobusbantul/",
  },
};

export const navigation: NavigationItem[] = [
  { label: "Beranda", href: "/" },
  { 
    label: "Profil", 
    href: "/profil",
    children: [
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi Misi Paroki", href: "/profil/visi-misi" },
      { label: "Pastor Paroki", href: "/profil/pastor" },
      { label: "Tim Pelayanan, Lingkungan, Komunitas", href: "/profil/lingkungan" },
    ]
  },
  {
    label: "Informasi",
    href: "#", // Dropdown group
    children: [
      { label: "Jadwal Misa", href: "/jadwal" },
      { label: "Galeri Kegiatan", href: "/galeri" },
    ]
  },
  { label: "Warta Paroki", href: "/warta" },
  {
    label: "Pelayanan",
    href: "#",
    children: [
      { label: "Unduhan Formulir", href: "/unduhan" },
    ]
  },
  { label: "Kontak", href: "/kontak" },
];

export const schedules: ScheduleItem[] = [
  // Misa Mingguan
  {
    id: "misa-sabtu",
    day: "Sabtu",
    time: "16:00 WIB",
    language: "Bahasa Indonesia",
    location: "Gereja Santo Yakobus Bantul",
    category: "Misa Mingguan",
  },
  {
    id: "misa-minggu-pagi",
    day: "Minggu Pagi",
    time: "06:00 WIB",
    language: "Bahasa Indonesia",
    location: "Gereja Santo Yakobus Bantul",
    category: "Misa Mingguan",
  },
  {
    id: "misa-minggu-siang",
    day: "Minggu Siang",
    time: "08:00 WIB",
    language: "Bahasa Indonesia",
    location: "Gereja Santo Yakobus Bantul",
    category: "Misa Mingguan",
  },
  
  // Misa Harian
  {
    id: "misa-harian",
    day: "Senin - Sabtu",
    time: "05:30 WIB",
    language: "Bahasa Indonesia",
    location: "Gereja Santo Yakobus Bantul",
    category: "Misa Harian",
  },

  // Jumat Pertama
  {
    id: "jumat-pertama",
    day: "Jumat Pertama",
    time: "17:00 WIB",
    language: "Bahasa Indonesia",
    location: "Gereja Santo Yakobus Bantul",
    category: "Jumat Pertama",
  },
];

export const heroContent: HeroContent = {
  headline: "Selamat Datang di Paroki Santo Yakobus Bantul",
  ctaText: "Lihat Jadwal Misa",
};

// Dummy Data for Warta
export const wartaDummy = [
  {
    id: 1,
    title: "Jadwal Pengakuan Dosa Jelang Paskah",
    date: "12 Januari 2024",
    excerpt: "Jadwal lengkap pelayanan sakramen tobat untuk wilayah dan lingkungan..."
  },
  {
    id: 2,
    title: "Pendaftaran Komuni Pertama 2024",
    date: "10 Januari 2024",
    excerpt: "Telah dibuka pendaftaran calon penerima Komuni Pertama. Syarat dan ketentuan..."
  },
  {
    id: 3,
    title: "Kerja Bakti Lingkungan Gereja",
    date: "08 Januari 2024",
    excerpt: "Mengundang seluruh umat untuk berpartisipasi dalam kerja bakti membersihkan..."
  },
];

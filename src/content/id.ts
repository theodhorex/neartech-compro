export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  points: string[];
}

export interface StepItem {
  num: string;
  title: string;
  description: string;
  result: string;
}

export interface PrincipleItem {
  title: string;
  description: string;
}

export interface WhyItem {
  title: string;
  description: string;
}

export interface ValueItem {
  num: string;
  title: string;
  description: string;
}

export interface TeamMemberItem {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface CaseStudyItem {
  num: string;
  title: string;
  industry: string;
  challenge: string;
  result: string;
  services: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentId {
  stats: StatItem[];
  clients: {
    note: string;
    items: string[];
  };
  services: {
    label: string;
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  approach: {
    label: string;
    title: string;
    intro: string;
    steps: StepItem[];
    principles: PrincipleItem[];
  };
  caseStudies: {
    label: string;
    title: string;
    intro: string;
    items: CaseStudyItem[];
  };
  whyUs: {
    label: string;
    title: string;
    paragraph: string;
    items: WhyItem[];
  };
  testimonials: {
    label: string;
    title: string;
    items: TestimonialItem[];
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    valuesHeading: string;
    values: ValueItem[];
    teamHeading: string;
    team: TeamMemberItem[];
  };
  techStack: {
    label: string;
    title: string;
    description: string;
    items: string[];
  };
  faq: {
    label: string;
    title: string;
    items: FaqItem[];
  };
  contact: {
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      companyOptional: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      submittingButton: string;
      successMessage: string;
      errorMessage: string;
    };
    direct: {
      title: string;
      email: string;
      location: string;
      phone: string;
      hours: string;
      responseCommitment: string;
    };
  };
  footer: {
    tagline: string;
    nav: {
      label: string;
      href: string;
    }[];
    copyright: string;
    backToTop: string;
  };
}

// DATA TIRUAN: ganti dengan data asli sebelum rilis
export const contentId: ContentId = {
  stats: [
    {
      value: 24,
      suffix: "+",
      label: "proyek selesai",
    },
    {
      value: 9,
      suffix: "",
      label: "sektor industri",
    },
    {
      value: 98,
      suffix: "%",
      label: "klien berlanjut",
    },
    {
      value: 4,
      suffix: " hari",
      label: "rata-rata sampai prototipe pertama",
    },
  ],

  clients: {
    note: "Beberapa nama yang pernah bekerja bersama kami",
    items: [
      "Nusantara Logistik",
      "Karya Mandiri Finansial",
      "Samudera Data Solusi",
      "Bumi Pangan Lestari",
      "Artha Graha Digital",
      "Ruang Edukasi Indonesia",
    ],
  },

  services: {
    label: "LAYANAN",
    title: "Dari gagasan sampai produk yang berjalan",
    intro:
      "Kami mengerjakan seluruh rantai kerja teknologi, supaya Anda cukup berbicara dengan satu tim dari awal sampai akhir.",
    items: [
      {
        num: "01",
        title: "Strategi",
        description:
          "Kami membantu Anda memutuskan apa yang perlu dibangun, dan apa yang sebaiknya tidak.",
        points: [
          "Pemetaan kebutuhan dan proses bisnis",
          "Penentuan prioritas dan ruang lingkup",
          "Rancangan arsitektur dan pilihan teknologi",
          "Peta jalan dan estimasi yang jujur",
        ],
      },
      {
        num: "02",
        title: "Produk",
        description:
          "Kami merancang pengalaman yang mudah dipakai, lalu mengubahnya menjadi produk nyata.",
        points: [
          "Riset pengguna dan rancangan antarmuka",
          "Prototipe yang bisa diuji sebelum dibangun",
          "Aplikasi web dan seluler",
          "Sistem desain yang konsisten",
        ],
      },
      {
        num: "03",
        title: "Rekayasa",
        description:
          "Kami membangun dan merawat sistem yang andal, aman, dan siap bertumbuh bersama bisnis Anda.",
        points: [
          "Pengembangan sistem dan integrasi",
          "Pengujian dan otomasi rilis",
          "Keamanan dan pemantauan",
          "Dukungan dan perawatan berkelanjutan",
        ],
      },
    ],
  },

  approach: {
    label: "PENDEKATAN",
    title: "Cara kerja yang bisa Anda lihat dan ikuti",
    intro:
      "Tanpa jargon dan tanpa kejutan. Setiap tahap punya hasil yang jelas dan bisa Anda periksa.",
    steps: [
      {
        num: "01",
        title: "Mengenal",
        description:
          "Kami mendengarkan masalah, tujuan, dan batasan Anda sebelum menawarkan solusi apa pun.",
        result: "ringkasan masalah dan tujuan.",
      },
      {
        num: "02",
        title: "Merancang",
        description:
          "Kami menyusun solusi, tampilan, dan rencana kerja, lalu menunjukkannya kepada Anda untuk disetujui.",
        result: "rancangan dan prototipe.",
      },
      {
        num: "03",
        title: "Membangun",
        description:
          "Pengerjaan berjalan dalam siklus pendek. Anda melihat kemajuan nyata secara berkala, bukan hanya laporan.",
        result: "rilis bertahap.",
      },
      {
        num: "04",
        title: "Merawat",
        description:
          "Setelah produk berjalan, kami tetap mendampingi: memantau, memperbaiki, dan mengembangkannya.",
        result: "produk yang terus membaik.",
      },
    ],
    principles: [
      {
        title: "Komunikasi langsung",
        description: "Anda berbicara dengan orang yang mengerjakan, bukan perantara.",
      },
      {
        title: "Proses yang transparan",
        description: "Rencana, kemajuan, dan biaya selalu terbuka.",
      },
      {
        title: "Hasil yang terukur",
        description: "Kami menyepakati ukuran keberhasilan sejak awal.",
      },
    ],
  },

  caseStudies: {
    label: "STUDI KASUS",
    title: "Karya nyata dengan dampak yang terukur",
    intro:
      "Tiga contoh kolaborasi yang menggambarkan cara kami menyelesaikan masalah nyata.",
    items: [
      {
        num: "01",
        title: "Modernisasi Sistem Logistik Armada",
        industry: "Rantai Pasok & Distribusi",
        challenge:
          "Sistem pelacakan armada terfragmentasi sehingga koordinasi pengiriman terlambat hingga beberapa jam setiap hari.",
        result: "38% efisiensi rute operasional harian",
        services: ["Strategi", "Rekayasa"],
      },
      {
        num: "02",
        title: "Aplikasi Manajemen Portofolio Finansial",
        industry: "Layanan Keuangan",
        challenge:
          "Pengguna kesulitan memahami ringkasan aset karena antarmuka analitik yang terlalu rumit dan lambat dimuat.",
        result: "2.4x kenaikan retensi pengguna aktif",
        services: ["Produk", "Rekayasa"],
      },
      {
        num: "03",
        title: "Platform Terpadu Pengadaan B2B",
        industry: "Manufaktur & Pengadaan",
        challenge:
          "Proses verifikasi dokumen vendor manual memakan waktu hingga dua pekan untuk satu siklus pengadaan.",
        result: "70% penurunan waktu verifikasi berkas",
        services: ["Strategi", "Produk"],
      },
    ],
  },

  whyUs: {
    label: "KENAPA NEARTECH",
    title: "Dekat, dalam arti yang sebenarnya",
    paragraph:
      "Nama kami adalah janji kami. Dekat dengan bisnis Anda, dekat dengan pengguna Anda, dan dekat dengan kenyataan di lapangan. Kami lebih memilih menyelesaikan masalah yang tepat daripada membangun sesuatu yang rumit.",
    items: [
      {
        title: "Fokus pada masalah",
        description: "Kami bertanya dulu sebelum membangun.",
      },
      {
        title: "Sederhana dan tahan lama",
        description:
          "Solusi yang mudah dirawat lebih berharga daripada yang mengesankan sesaat.",
      },
      {
        title: "Kolaborasi terbuka",
        description:
          "Anda ikut dalam keputusan penting, bukan hanya menunggu hasil.",
      },
      {
        title: "Bertanggung jawab",
        description: "Kami berani mengatakan tidak bila sebuah gagasan belum tepat.",
      },
    ],
  },

  testimonials: {
    label: "TESTIMONI",
    title: "Kata mereka tentang kerja sama bersama kami",
    items: [
      {
        quote:
          "NearTech langsung memahami inti kendala kami tanpa membuang waktu pada fitur yang tidak diperlukan. Komunikasi mereka sangat jujur dan solusinya tahan lama.",
        author: "Hendro Wibowo",
        role: "Direktur Operasional, Nusantara Logistik",
      },
      {
        quote:
          "Kecepatan mereka mengubah rancangan abstrak menjadi prototipe yang bisa diuji membuat seluruh tim kami yakin sejak minggu pertama proyek berjalan.",
        author: "Alina Kusuma",
        role: "Kepala Produk, Karya Mandiri Finansial",
      },
      {
        quote:
          "Sistem yang mereka bangun stabil, dokumentasi rapi, dan mudah dirawat oleh tim internal kami. Kemitraan yang sangat profesional dan transparan.",
        author: "Bambang Sudiro",
        role: "VP Rekayasa, Samudera Data Solusi",
      },
    ],
  },

  about: {
    label: "TENTANG KAMI",
    title: "Dua pendiri, satu tujuan: teknologi yang berguna",
    paragraphs: [
      "NearTech didirikan oleh dua orang yang percaya bahwa teknologi terbaik adalah yang membuat pekerjaan orang lain lebih mudah. Kami memulai dari tim kecil dan mengerjakan setiap proyek dengan perhatian penuh.",
      "Kami sedang bertumbuh dan terbuka bagi bisnis yang ingin berjalan bersama sejak awal. Bila Anda mencari mitra yang mau memahami konteks Anda, kami ingin berbincang.",
    ],
    valuesHeading: "Nilai kami",
    values: [
      {
        num: "01",
        title: "Jujur",
        description:
          "Keterbukaan atas batasan teknis, estimasi realistis, dan solusi yang paling masuk akal.",
      },
      {
        num: "02",
        title: "Teliti",
        description:
          "Perhatian penuh pada kualitas kode, arsitektur yang kokoh, dan kenyamanan pengguna.",
      },
      {
        num: "03",
        title: "Bertumbuh bersama",
        description:
          "Kemitraan jangka panjang yang mengutamakan keberhasilan nyata bagi bisnis Anda.",
      },
    ],
    teamHeading: "Tim Inti",
    team: [
      {
        name: "Arya Pratama",
        role: "Pendiri, Strategi dan Produk",
        bio: "Lebih dari satu dekade memimpin strategi produk dan transformasi digital di berbagai industri.",
        initials: "AP",
      },
      {
        name: "Reza Mahendra",
        role: "Pendiri, Rekayasa",
        bio: "Praktisi rekayasa perangkat lunak dengan fokus pada arsitektur modular, keandalan sistem, dan kinerja tinggi.",
        initials: "RM",
      },
      {
        name: "Siti Rahmawati",
        role: "Desainer Antarmuka Senior",
        bio: "Merancang sistem desain dan interaksi digital yang jelas, terstruktur, dan nyaman digunakan.",
        initials: "SR",
      },
      {
        name: "Dimas Nugroho",
        role: "Insinyur Perangkat Lunak Senior",
        bio: "Mengembangkan aplikasi web dan sistem data yang cepat, aman, serta teruji secara menyeluruh.",
        initials: "DN",
      },
    ],
  },

  techStack: {
    label: "PERANGKAT & TEKNOLOGI",
    title: "Fondasi teknologi yang kami gunakan",
    description:
      "Alat dan teknologi teruji yang kami pilih berdasarkan keandalan, ekosistem yang matang, dan kemudahan perawatan.",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Figma",
    ],
  },

  faq: {
    label: "PERTANYAAN UMUM",
    title: "Hal yang sering ditanyakan",
    items: [
      {
        question: "Proyek seperti apa yang bisa NearTech kerjakan?",
        answer:
          "Kami menangani produk digital dari strategi sampai perawatan: aplikasi web dan seluler, sistem internal, integrasi, serta penyempurnaan produk yang sudah ada.",
      },
      {
        question: "Apakah harus punya rancangan lengkap sebelum menghubungi kami?",
        answer:
          "Tidak perlu. Banyak proyek kami mulai dari masalah yang masih kabur. Tahap Strategi dirancang untuk menjernihkannya.",
      },
      {
        question: "Berapa lama dan berapa biaya sebuah proyek?",
        answer:
          "Tergantung ruang lingkup. Setelah sesi perkenalan, kami memberi estimasi tertulis beserta asumsinya, supaya Anda bisa membandingkan dengan jelas.",
      },
      {
        question: "Apakah kami tetap didampingi setelah produk selesai?",
        answer:
          "Ya. Kami menawarkan perawatan dan pengembangan berkelanjutan, dan itu bersifat pilihan.",
      },
      {
        question: "Bagaimana cara memulai?",
        answer:
          "Kirim pesan lewat formulir di bawah. Kami membalas dan menjadwalkan percakapan awal tanpa biaya.",
      },
    ],
  },

  contact: {
    cta: {
      title: "Punya masalah yang ingin diselesaikan?",
      subtitle:
        "Ceritakan secara singkat. Kami akan membalas dan mengajak Anda berbincang.",
      buttonText: "Hubungi Kami",
    },
    form: {
      nameLabel: "Nama Lengkap",
      namePlaceholder: "Nama Anda",
      emailLabel: "Alamat Surel",
      emailPlaceholder: "nama@perusahaan.com",
      companyLabel: "Nama Perusahaan",
      companyPlaceholder: "Perusahaan Anda",
      companyOptional: "(opsional)",
      messageLabel: "Ceritakan kebutuhan Anda",
      messagePlaceholder: "Jelaskan konteks proyek, kendala, atau sasaran yang ingin dicapai...",
      submitButton: "Kirim Pesan",
      submittingButton: "Mengirim...",
      successMessage: "Pesan Terkirim. Kami akan menghubungi Anda segera.",
      errorMessage: "Mohon lengkapi kolom yang diperlukan dengan benar.",
    },
    direct: {
      title: "Kontak langsung",
      email: "halo@neartech.example",
      location: "Jl. Suryo No. 42, Senopati, Jakarta Selatan, Indonesia",
      phone: "+62 21 5555 0123",
      hours: "Senin sampai Jumat, 09.00 sampai 17.00 WIB",
      responseCommitment: "Kami berusaha membalas dalam satu hari kerja.",
    },
  },

  footer: {
    tagline: "Teknologi yang dekat dengan bisnis Anda.",
    nav: [
      { label: "Layanan", href: "#layanan" },
      { label: "Pendekatan", href: "#pendekatan" },
      { label: "Tentang", href: "#tentang" },
      { label: "Kontak", href: "#kontak" },
    ],
    copyright: "© 2026 NearTech. Seluruh hak dicadangkan.",
    backToTop: "Kembali ke atas",
  },
};

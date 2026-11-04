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

export interface TeamPlaceholderItem {
  role: string;
  placeholderText: string;
  initials: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentId {
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
  whyUs: {
    label: string;
    title: string;
    paragraph: string;
    items: WhyItem[];
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    valuesHeading: string;
    values: ValueItem[];
    team: TeamPlaceholderItem[];
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
      emailPlaceholder: string;
      locationPlaceholder: string;
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

export const contentId: ContentId = {
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
    team: [
      {
        role: "Pendiri",
        placeholderText: "[Nama dan peran akan ditambahkan]",
        initials: "P1",
      },
      {
        role: "Pendiri",
        placeholderText: "[Nama dan peran akan ditambahkan]",
        initials: "P2",
      },
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
      emailPlaceholder: "[Alamat surel akan ditambahkan]",
      locationPlaceholder: "[Lokasi akan ditambahkan]",
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

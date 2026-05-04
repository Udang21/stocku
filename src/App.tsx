import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Plus, 
  Minus, 
  ChevronDown, 
  BarChart3, 
  Box, 
  Bell, 
  FileText, 
  Users, 
  Cloud, 
  Check, 
  ArrowRight,
  Menu,
  X,
  Star,
  Quote,
  Instagram,
  Facebook,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fitur', href: '#features' },
    { name: 'Harga', href: '#pricing' },
    { name: 'Tentang', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl">
            📦
          </div>
          <span className="font-heading font-extrabold text-2xl tracking-tighter text-brand">Stockku</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-slate-600 hover:text-brand font-medium transition-colors">
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 border-l border-slate-200 pl-8 ml-4">
            <button className="text-slate-600 hover:text-brand font-medium transition-colors">Masuk</button>
            <button className="bg-brand hover:bg-brand-light text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-brand/20">
              Coba Gratis
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="block text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <button className="text-left text-lg font-medium text-slate-700">Masuk</button>
                <button className="bg-brand text-white px-6 py-3 rounded-xl font-semibold text-center">
                  Coba Gratis
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ target, suffix = "" }: { target: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-4">
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-slate-800">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  return (
    <div className="w-full relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[radial-gradient(circle_at_top_right,_#148b6d15,_transparent_40%),_radial-gradient(circle_at_bottom_left,_#148b6d10,_transparent_40%)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full font-semibold text-sm mb-6">
              <Star size={16} fill="currentColor" /> Dipercaya 1.000+ UMKM Indonesia
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Kelola Stok & Penjualan <span className="text-brand">UMKM</span> Jadi Lebih Mudah
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              Aplikasi kasir & manajemen stok berbasis cloud gratis untuk mulai, tanpa instalasi, langsung pakai dari browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand hover:bg-brand-light text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand/30 transition-all transform hover:-translate-y-1">
                Mulai Gratis Sekarang
              </button>
              <button className="bg-white border-2 border-slate-100 hover:border-brand-light text-slate-800 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1">
                Lihat Demo
              </button>
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="dashboard-mockup relative"
          >
            <div className="dashboard-card bg-white rounded-3xl p-6 border border-slate-100 animate-float">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="w-32 h-6 bg-slate-50 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-brand/5 rounded-2xl border border-brand/10">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Penjualan</span>
                  <span className="text-2xl font-extrabold text-brand">Rp 24,5M</span>
                </div>
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Stok Rendah</span>
                  <span className="text-2xl font-extrabold text-orange-600">12 Item</span>
                </div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                      <div className="space-y-1">
                        <div className="w-24 h-2.5 bg-slate-300 rounded-full"></div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-brand/20 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Absolute element overlays */}
            <div className="absolute -top-10 -right-10 hidden lg:block p-6 bg-white rounded-2xl shadow-2xl border border-slate-100">
              <BarChart3 className="text-brand mb-2" />
              <div className="space-y-1">
                <div className="w-16 h-2 bg-slate-100 rounded-full"></div>
                <div className="w-12 h-2 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-24 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">Solusi Modern untuk Masalah Klasik UMKM</h2>
            <p className="text-xl text-slate-600">Dulu sulit, sekarang canggih. Stockku mengubah cara Anda berbisnis.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { problem: "Stok dicatat manual", solution: "Manajemen stok otomatis", desc: "Tidak ada lagi salah catat atau selisih stok." },
              { problem: "Tidak ada notifikasi stok habis", solution: "Notifikasi stok menipis", desc: "Sistem beri tahu saat barang perlu di-restock." },
              { problem: "Laporan tidak real-time", solution: "Dashboard laporan real-time", desc: "Pantau performa bisnis kapan pun dari HP." },
              { problem: "POS mahal & rumit", solution: "Sederhana & Terjangkau", desc: "Langsung pakai di browser, UI ramah pemula." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-100"
              >
                <div className="text-slate-400 line-through text-sm mb-2 font-medium">{item.problem}</div>
                <div className="text-brand font-bold text-lg mb-4 flex items-center gap-2">
                  <Check size={20} className="bg-brand text-white rounded-full p-0.5" /> {item.solution}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Fitur Lengkap untuk Skala Bisnis Apa Pun</h2>
              <p className="text-xl text-slate-600">Semua yang Anda butuhkan untuk otomasi bisnis ada dalam satu genggaman.</p>
            </div>
            <button className="flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all">Lihat semua fitur <ArrowRight size={20} /></button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <BarChart3 />, title: "Dashboard Real-time", desc: "Pantau penjualan harian, tren produk, dan margin keuntungan seketika.", color: "bg-teal-50 text-teal-600" },
              { icon: <Box />, title: "Manajemen Stok Otomatis", desc: "Update stok otomatis tiap ada transaksi, mudahkan restock barang.", color: "bg-blue-50 text-blue-600" },
              { icon: <Bell />, title: "Notifikasi Stok Menipis", desc: "Peringatan otomatis saat stok barang mulai habis agar jualan tidak terganggu.", color: "bg-orange-50 text-orange-600" },
              { icon: <FileText />, title: "Laporan Otomatis", desc: "Ekspor laporan harian do hingga bulanan ke PDF & Excel hanya dalam sekali klik.", color: "bg-purple-50 text-purple-600" },
              { icon: <Users />, title: "Multi-user (Pro)", desc: "Hingga 5 akun kasir berbeda dengan kontrol akses yang aman.", color: "bg-indigo-50 text-indigo-600" },
              { icon: <Cloud />, title: "Berbasis Cloud", desc: "Akses data dari mana saja, kapan saja tanpa perlu server fisik.", color: "bg-cyan-50 text-cyan-600" }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand text-white overflow-hidden relative">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-light rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-light rounded-full opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { target: 1000, suffix: "+", label: "Pengguna UMKM" },
              { target: 49, suffix: "jt+", label: "Target MRR" },
              { target: 64, suffix: "jt", label: "Potensi Pasar" },
              { target: 30, suffix: " menit", label: "Waktu Onboarding" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-4xl md:text-5xl font-extrabold font-heading">
                   <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="text-brand-light font-bold uppercase tracking-widest text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32" id="pricing">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Pilih Paket Sesuai Kebutuhan Anda</h2>
            <p className="text-xl text-slate-600">Investasi terbaik untuk pertumbuhan bisnis UMKM Anda.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Free */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 self-stretch flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-slate-500">Mulai langkah pertama digitalisasi bisnis.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold">Rp 0</span>
                <span className="text-slate-500 font-medium">/bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[ "Maks. 50 produk", "Pencatatan transaksi dasar", "Laporan mingguan", "1 pengguna" ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <Check size={18} className="text-brand flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl border-2 border-slate-100 hover:border-brand-light font-bold transition-all">Pilih Paket</button>
            </div>

            {/* Basic */}
            <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-slate-100 self-stretch flex flex-col relative">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Basic Plan</h3>
                <p className="text-slate-500">Ideal untuk operasional harian yang stabil.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold">Rp 49.000</span>
                <span className="text-slate-500 font-medium">/bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[ "Produk tidak terbatas", "Laporan lengkap harian/bln", "Notifikasi stok menipis", "Ekspor PDF/Excel", "1 pengguna" ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <Check size={18} className="text-brand flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold transition-all">Pilih Paket</button>
            </div>

            {/* Pro */}
            <div className="bg-white p-8 rounded-[2rem] border-2 border-brand ring-4 ring-brand/5 self-stretch flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                PALING POPULER ⭐
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                <p className="text-slate-500">Fitur premium untuk ekspansi & tim.</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-extrabold">Rp 99.000</span>
                <span className="text-slate-500 font-medium">/bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[ "Semua fitur Basic", "Multi-user hingga 5 akun", "Analisis tren penjualan", "Dukungan prioritas WhatsApp", "Integrasi marketplace (Soon)" ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check size={18} className="text-brand flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-2xl bg-brand hover:bg-brand-light text-white font-bold shadow-xl shadow-brand/20 transition-all">Pilih Paket</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tighter text-brand">Kisah Sukses UMKM</h2>
             <p className="text-xl text-slate-600">Mereka sudah beralih, giliran Anda sekarang.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Andi Wijaya", role: "Toko Sembako (Semarang)", quote: "Sangat terbantu! Stok barang jualan sembako saya jadi rapi. Dulu pusing kalau mau restock sekarang tinggal lihat notifikasi." },
              { name: "Siti Sarah", role: "Thrift Shop (Bandung)", quote: "Aplikasi yang dapet dicoba secara gratis itu beneran ngebantu buat nyoba dulu fiturnya. UI-nya gampang banget dipake!" },
              { name: "Budi Santoso", role: "Toko Kosmetik (Surabaya)", quote: "Laporan penjualannya lengkap bener. Jadi tau produk mana yang paling laku setiap bulannya lewat fitur dashboard." }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <Quote className="text-brand opacity-20 mb-6" size={48} />
                  <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12 text-center">Punya Pertanyaan?</h2>
          <div className="space-y-4">
            <AccordionItem 
              question="Apakah ada masa trial berbayar?"
              answer="Tentu! Kami menyediakan paket Free selamanya untuk penggunaan dasar. Jika ingin mencoba fitur Pro, Anda bisa melakukan upgrade kapan pun."
            />
            <AccordionItem 
              question="Apakah data saya aman di cloud?"
              answer="Data Anda dienkripsi secara aman dan di-backup secara otomatis di server cloud kami yang andal. Keamanan data Anda adalah prioritas nomor satu kami."
            />
            <AccordionItem 
              question="Bisakah diakses dari HP?"
              answer="Bisa sekali. Stockku didesain responsif sehingga tampil dengan baik di layar HP, tablet, maupun laptop melalui browser pilihan Anda."
            />
            <AccordionItem 
              question="Apakah bisa dipakai offline?"
              answer="Karena berbasis cloud, saat ini Stockku memerlukan koneksi internet stabil agar sinkronisasi data antar perangkat berjalan lancar."
            />
            <AccordionItem 
              question="Bagaimana cara upgrade paket?"
              answer="Anda dapat langsung melakukan upgrade melalui menu pengaturan di dalam aplikasi dashboard Anda. Pembayaran tersedia via transfer bank, e-wallet, dan QRIS."
            />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          {/* Gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_#148b6d30,_transparent_50%)]"></div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white">Siap digitalisasi bisnis Anda?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">Mulai gratis hari ini. Tidak perlu kartu kredit. Gabung bersama ribuan UMKM sukses lainnya.</p>
            <button className="bg-brand hover:bg-brand-light text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl shadow-brand/40 transition-all transform hover:scale-105 active:scale-95">
              Daftar Sekarang — Gratis
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-brand w-8 h-8 rounded-lg flex items-center justify-center text-white">📦</div>
                <span className="font-heading font-extrabold text-xl text-brand">Stockku</span>
              </div>
              <p className="text-slate-500 max-w-xs leading-relaxed">
                Platform manajemen stok dan penjualan nomor satu untuk UMKM Indonesia. Memberdayakan bisnis kecil dengan teknologi cloud.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><Instagram size={20} /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><Facebook size={20} /></a>
                <a href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-brand transition-colors"><MessageCircle size={20} /></a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6">Produk</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#features" className="hover:text-brand">Fitur</a></li>
                <li><a href="#pricing" className="hover:text-brand">Harga</a></li>
                <li><a href="#" className="hover:text-brand">Demo</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Perusahaan</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#about" className="hover:text-brand">Tentang</a></li>
                <li><a href="#" className="hover:text-brand">Blog</a></li>
                <li><a href="#" className="hover:text-brand">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6">Pusat Bantuan</h5>
              <ul className="space-y-4 text-slate-500 font-medium">
                <li><a href="#" className="hover:text-brand">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-brand">WhatsApp Support</a></li>
                <li><a href="#" className="hover:text-brand">Kebijakan Privasi</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 text-center text-slate-400 text-sm font-medium">
            © 2026 Stockku. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

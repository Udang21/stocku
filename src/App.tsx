/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Box, 
  ArrowRightLeft, 
  BarChart3, 
  Bell, 
  Menu, 
  X, 
  CheckCircle2, 
  Cloud, 
  History, 
  TrendingUp,
  ChevronRight,
  Plus,
  Search,
  User,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

// --- Constants & Types ---

const PRIMARY_COLOR = '#1D9E75';

type View = 'landing' | 'dashboard';

interface Transaction {
  id: string;
  item: string;
  date: string;
  amount: number;
  status: 'Berhasil' | 'Pending' | 'Gagal';
}

const TRANSACTIONS: Transaction[] = [
  { id: 'TX-001', item: 'Kabel Data Type-C', date: '04 Mei, 09:12', amount: 45000, status: 'Berhasil' },
  { id: 'TX-002', item: 'Tempered Glass iPhone 13', date: '04 Mei, 10:25', amount: 85000, status: 'Berhasil' },
  { id: 'TX-003', item: 'Casing Samsung S22', date: '04 Mei, 11:45', amount: 120000, status: 'Berhasil' },
  { id: 'TX-004', item: 'Powerbank 10000mAh', date: '04 Mei, 13:02', amount: 250000, status: 'Berhasil' },
  { id: 'TX-005', item: 'Earphone Bluetooth', date: '04 Mei, 14:30', amount: 175000, status: 'Berhasil' },
];

const SALES_DATA = [
  { day: 'Sen', sales: 1200000 },
  { day: 'Sel', sales: 950000 },
  { day: 'Rab', sales: 1540000 },
  { day: 'Kam', sales: 1100000 },
  { day: 'Jum', sales: 1890000 },
  { day: 'Sab', sales: 2450000 },
  { day: 'Min', sales: 2100000 },
];

// --- Components ---

const Navbar = ({ onDemoClick }: { onDemoClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white z-50 border-b border-border-theme">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex justify-between h-[60px] items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-primary">Stockku</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-text">
            <a href="#fitur" className="hover:text-primary transition-colors">Fitur</a>
            <a href="#harga" className="hover:text-primary transition-colors">Harga</a>
            <a href="#tentang" className="hover:text-primary transition-colors">Tentang</a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button 
              onClick={onDemoClick}
              className="px-[18px] py-2 text-sm font-semibold text-primary border border-primary rounded-md hover:bg-emerald-50 transition-all"
            >
              Masuk Demo
            </button>
            <button className="px-[18px] py-2 bg-primary text-white text-sm font-semibold rounded-md hover:opacity-90 transition-all">
              Coba Gratis
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4 shadow-xl"
        >
          <a href="#fitur" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#1D9E75]">Fitur</a>
          <a href="#harga" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#1D9E75]">Harga</a>
          <a href="#tentang" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-[#1D9E75]">Tentang</a>
          <div className="pt-4 flex flex-col space-y-3">
            <button onClick={onDemoClick} className="w-full px-3 py-3 text-center font-semibold text-[#1D9E75] border border-emerald-100 rounded-xl">Masuk Demo</button>
            <button className="w-full px-3 py-3 text-center font-semibold text-white bg-[#1D9E75] rounded-xl">Coba Gratis</button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="p-4 bg-white rounded-xl border border-border-theme shadow-sm hover:shadow-md transition-all group"
  >
    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-primary mb-3">
      <Icon size={18} />
    </div>
    <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
    <p className="text-xs text-gray-500 leading-normal">{description}</p>
  </motion.div>
);

const PricingCard = ({ title, price, features, recommended = false }: { title: string, price: string, features: string[], recommended?: boolean }) => (
  <div className={`p-5 rounded-xl border flex flex-col ${recommended ? 'border-primary bg-white ring-1 ring-primary shadow-lg' : 'border-border-theme bg-white'}`}>
    <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
    <div className="flex items-baseline mb-3">
      <span className="text-2xl font-extrabold text-gray-900">{price}</span>
      <span className="text-gray-500 ml-1 text-[10px]">{price !== 'Gratis' ? '/bulan' : ''}</span>
    </div>
    <div className="space-y-2 mb-6 flex-grow">
      {features.map((f, i) => (
        <div key={i} className="flex items-center gap-2 text-gray-600 text-[11px]">
          <CheckCircle2 size={12} className="text-primary" />
          <span>{f}</span>
        </div>
      ))}
    </div>
    <button className={`w-full py-2 rounded-md text-xs font-bold transition-all ${recommended ? 'bg-primary text-white hover:opacity-90' : 'bg-white text-primary border border-primary hover:bg-emerald-50'}`}>
      Pilih Paket
    </button>
  </div>
);

const LandingPage = ({ onDemoClick }: { onDemoClick: () => void }) => {
  return (
    <div className="bg-bg min-h-screen">
      <Navbar onDemoClick={onDemoClick} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-10 max-w-7xl mx-auto text-center bg-white border-b border-border-theme">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[38px] font-extrabold text-gray-900 leading-tight mb-3">
            Kelola Stok Toko Anda Jadi Mudah
          </h1>
          <p className="text-base text-gray-500 mb-6 max-w-2xl mx-auto">
            Platform manajemen inventaris dan penjualan yang dirancang khusus untuk kemajuan UMKM Indonesia.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              className="px-[18px] py-2 bg-primary text-white font-bold rounded-md hover:opacity-90 transition-all text-sm"
            >
              Mulai Sekarang
            </button>
            <button onClick={onDemoClick} className="px-[18px] py-2 border border-primary text-primary font-bold rounded-md hover:bg-emerald-50 transition-all text-sm">
              Masuk Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="fitur" className="py-12 bg-bg px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon={Package} title="Manajemen Produk" description="Input ribuan produk dengan mudah dan cepat." />
            <FeatureCard icon={Box} title="Stok Otomatis" description="Update stok real-time setiap transaksi terjadi." />
            <FeatureCard icon={ArrowRightLeft} title="Catat Transaksi" description="Pencatatan penjualan harian yang akurat." />
            <FeatureCard icon={BarChart3} title="Laporan Bisnis" description="Laba rugi dan laporan harian otomatis." />
            <FeatureCard icon={Bell} title="Notifikasi Stok" description="Peringatan saat stok barang menipis." />
            <FeatureCard icon={Cloud} title="Akses Cloud" description="Pantau bisnis dari mana saja secara online." />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" className="py-12 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            <PricingCard 
              title="Free" 
              price="Rp 0" 
              features={["Maks 20 Produk", "1 User Admin", "Catatan dasar"]} 
            />
            <PricingCard 
              recommended={true}
              title="Basic" 
              price="Rp 99rb" 
              features={["Produk Tak Terbatas", "Hingga 5 user", "Laporan lengkap"]} 
            />
            <PricingCard 
              title="Pro" 
              price="Rp 199rb" 
              features={["Multi-user + Report", "Multi-cabang", "Integrasi marketplace"]} 
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-[#0F172A] text-white overflow-hidden px-10">
        <div className="max-w-7xl mx-auto relative">
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold mb-2">Kata Pemilik Toko</h2>
            <p className="text-slate-400 text-sm">Telah membantu ribuan pengusaha UMKM naik kelas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Andi Saputra", store: "Aksesoris Berkibar", quote: "Dulu stok sering selisih, sekarang semuanya tercatat rapi. Sangat membantu!" },
              { name: "Siti Aminah", store: "Butik Cantik", quote: "Interface-nya ramah banget buat orang gaptek kayak saya. Laporan penjualannya juara." },
              { name: "Budi Darmono", store: "Toko Kelontong Sejahtera", quote: "Paling suka fitur notifikasi stok menipis. Saya jadi gak pernah telat restock barang." }
            ].map((t, i) => (
              <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-xl">
                <p className="text-sm text-slate-300 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full" />
                  <div>
                    <p className="text-xs font-bold">{t.name}</p>
                    <p className="text-[10px] text-primary">{t.store}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-white border-t border-border-theme px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8 text-[13px]">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-extrabold text-primary">Stockku</span>
              </div>
              <p className="text-slate-500 max-w-xs mb-4">Platform manajemen stok dan penjualan nomor 1 untuk UMKM Indonesia.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900">Navigasi</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-primary">Fitur</a></li>
                <li><a href="#" className="hover:text-primary">Harga</a></li>
                <li><a href="#" className="hover:text-primary">Tentang</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900">Bantuan</h4>
              <ul className="space-y-2 text-slate-500">
                <li><a href="#" className="hover:text-primary">Pusat Bantuan</a></li>
                <li><a href="#" className="hover:text-primary">Kontak</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border-theme flex justify-between items-center text-slate-400 text-[11px]">
            <p>© 2024 Stockku - Solusi Inventaris UMKM</p>
            <div>Made with ❤ in Jakarta</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className="flex h-screen bg-bg overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#0F172A] text-white flex flex-col pt-5">
        <div className="px-6 mb-10">
          <span className="text-2xl font-extrabold tracking-tight text-primary">Stockku</span>
        </div>

        <nav className="flex-grow space-y-0">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Produk', icon: Package },
            { name: 'Stok', icon: Box },
            { name: 'Transaksi', icon: ArrowRightLeft },
            { name: 'Laporan', icon: BarChart3 },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveMenu(item.name)}
              className={`w-full flex items-center gap-3 px-6 py-3 transition-all font-medium text-xs ${
                activeMenu === item.name 
                ? 'opacity-100 bg-white/5 border-l-4 border-primary' 
                : 'opacity-70 hover:opacity-100'
              }`}
            >
              <item.icon size={16} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pb-5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-6 py-3 transition-all text-xs font-medium opacity-70 hover:opacity-100"
          >
            <LogOut size={16} />
            Keluar Demo
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Ringkasan Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="relative p-1.5 text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
            </button>
            <div className="w-8 h-8 bg-slate-200 border border-slate-300 rounded-full flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Produk', value: '47', color: 'text-gray-900' },
            { label: 'Stok Menipis', value: '3', color: 'text-red-500' },
            { label: 'Transaksi Hari Ini', value: '12', color: 'text-gray-900' },
            { label: 'Pendapatan Bulan Ini', value: 'Rp4.250.000', color: 'text-primary' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-border-theme shadow-sm">
              <p className="text-[11px] font-medium text-slate-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Chart & Activity */}
        <div className="bg-white p-5 rounded-xl border border-border-theme mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-5">Penjualan 7 Hari Terakhir</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10 }} 
                />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={40} fill="#1D9E75" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently Transactions Table */}
        <div className="bg-white rounded-xl border border-border-theme overflow-hidden">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-slate-50 border-b border-border-theme">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase">ID</th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase">Pelanggan</th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase">Produk</th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase">Total</th>
                <th className="px-4 py-3 font-semibold text-slate-500 text-[11px] uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme">
              {[
                { id: '#TX001', customer: 'Rudi Hermawan', item: 'Casing Silicone iPhone 13', amount: 'Rp85.000' },
                { id: '#TX002', customer: 'Santi Wijaya', item: 'Kabel Charger Type-C', amount: 'Rp45.000' },
                { id: '#TX003', customer: 'Budi Santoso', item: 'Screen Guard Glass Pro', amount: 'Rp120.000' },
                { id: '#TX004', customer: 'Ani Melani', item: 'PopSocket Karakter', amount: 'Rp25.000' },
                { id: '#TX005', customer: 'Eko Prasetyo', item: 'Earphone Bluetooth V5.0', amount: 'Rp210.000' },
              ].map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3 text-slate-500 font-mono">{tx.id}</td>
                  <td className="px-4 py-3 font-medium">{tx.customer}</td>
                  <td className="px-4 py-3 text-slate-600">{tx.item}</td>
                  <td className="px-4 py-3 font-bold">{tx.amount}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-emerald-50 text-primary rounded text-[10px] font-bold">
                      Selesai
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-md shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');

  return (
    <div className="font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onDemoClick={() => setView('dashboard')} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard onLogout={() => setView('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  ShieldCheck,
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Zap,
  AlertCircle,
  CheckCircle2,
  Wrench,
  ChevronRight,
  BarChart3,
  Wallet,
  Package,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { cn } from '@/utils/cn';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';

/* ─── Animation Variants ─────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

/* ─── Tiny Sparkline data ─────────────────────────────────────────────── */
const sparkRevenue = [2800, 3200, 2900, 4100, 3800, 5200, 4900];
const sparkOccupancy = [72, 75, 80, 78, 85, 88, 90];
const sparkUnits = [10, 11, 12, 12, 13, 14, 14];
const sparkPending = [900, 750, 1100, 680, 820, 950, 700];

/* ─── Monthly Chart Data ──────────────────────────────────────────────── */
const monthlyData = [
  { month: 'Oct', revenue: 3200, expenses: 900 },
  { month: 'Nov', revenue: 4100, expenses: 1100 },
  { month: 'Dec', revenue: 3800, expenses: 950 },
  { month: 'Jan', revenue: 5000, expenses: 1200 },
  { month: 'Feb', revenue: 4400, expenses: 1050 },
  { month: 'Mar', revenue: 6100, expenses: 1400 },
  { month: 'Apr', revenue: 5600, expenses: 1300 },
];

/* ─── Mini Sparkline Component ───────────────────────────────────────── */
const Sparkline: React.FC<{ data: number[]; color: string; positive?: boolean }> = ({
  data,
  color,
  positive = true,
}) => (
  <ResponsiveContainer width="100%" height={48}>
    <AreaChart data={data.map((v, i) => ({ i, v }))} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={positive ? 0.25 : 0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="v"
        stroke={color}
        strokeWidth={2}
        fill={`url(#spark-${color.replace('#', '')})`}
        dot={false}
      />
    </AreaChart>
  </ResponsiveContainer>
);

/* ─── Dashboard ──────────────────────────────────────────────────────── */
const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { stats, transactions, properties, tenants } = useData();
  const isDark = theme === 'midnight';
  const [activeTab, setActiveTab] = useState<'revenue' | 'bar'>('revenue');

  const occupiedCount = properties.filter(p => p.status === 'occupied').length;
  const availableCount = properties.filter(p => p.status === 'available').length;
  const paidTenants = tenants.filter(t => t.paymentStatus === 'paid').length;

  const now = new Date();
  const greeting =
    now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  /* ── KPI cards config ── */
  const kpis = [
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      sub: '+12.5% vs last month',
      positive: true,
      icon: DollarSign,
      accent: '#10b981',
      spark: sparkRevenue,
      link: '/payments',
    },
    {
      label: 'Active Units',
      value: stats.activeUnits.toString(),
      sub: `${occupiedCount} occupied · ${availableCount} free`,
      positive: true,
      icon: Building2,
      accent: '#6366f1',
      spark: sparkUnits,
      link: '/properties',
    },
    {
      label: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      sub: '+2.1% this quarter',
      positive: true,
      icon: Activity,
      accent: '#f59e0b',
      spark: sparkOccupancy,
      link: '/properties',
    },
    {
      label: 'Pending Payments',
      value: `$${stats.pendingPayments.toLocaleString()}`,
      sub: `${transactions.filter(t => t.status === 'pending').length} outstanding`,
      positive: false,
      icon: Wallet,
      accent: '#ef4444',
      spark: sparkPending,
      link: '/payments',
    },
  ];

  const gridStroke = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
  const tickStyle = { fill: isDark ? '#64748b' : '#94a3b8', fontSize: 11, fontWeight: 700 };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      className="space-y-8 pb-16"
    >
      {/* ── Header ── */}
      <motion.div custom={0} variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              <Zap size={9} className="animate-pulse" />
              Live Dashboard
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {greeting} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Here's what's happening with your portfolio today.
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/inventory"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-blue-500/30 hover:scale-[1.03]"
          >
            <Package size={14} />
            Inventory
          </Link>
          <Link
            to="/maintenance"
            className="flex items-center gap-2 px-4 py-2.5 glass-card border border-white/20 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-2xl hover:scale-[1.03] transition-all"
          >
            <Wrench size={14} />
            Maintenance
          </Link>
        </div>
      </motion.div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpis.map((k, i) => (
          <motion.div key={k.label} custom={i + 1} variants={fadeUp}>
            <Link
              to={k.link}
              className="block glass-card rounded-3xl p-5 border border-white/20 hover:scale-[1.02] hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              {/* Glow blob */}
              <div
                className="absolute -right-6 -top-6 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: k.accent }}
              />

              {/* Icon + trend */}
              <div className="flex items-start justify-between mb-3 relative">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                  style={{ backgroundColor: `${k.accent}20`, color: k.accent }}
                >
                  <k.icon size={18} />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full',
                    k.positive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-500/10 text-red-500'
                  )}
                >
                  {k.positive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {k.positive ? 'UP' : 'DUE'}
                </div>
              </div>

              {/* Value */}
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                {k.label}
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {k.value}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                {k.sub}
              </p>

              {/* Sparkline */}
              <div className="mt-3 -mx-1">
                <Sparkline data={k.spark} color={k.accent} positive={k.positive} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── Main Grid: Chart + Feed ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ─ Revenue Chart (3/5) ─ */}
        <motion.div custom={5} variants={fadeUp} className="lg:col-span-3 glass-card rounded-3xl p-6 border border-white/20 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black dark:text-white flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" />
                Revenue vs Expenses
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Last 7 months performance</p>
            </div>
            <div className="flex bg-white/40 dark:bg-slate-800/60 p-1 rounded-xl border border-white/10 gap-1">
              {(['revenue', 'bar'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all',
                    activeTab === tab
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
                  )}
                >
                  {tab === 'revenue' ? 'Area' : 'Bar'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'revenue' ? (
                <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="areaRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="areaExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={tickStyle} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={tickStyle} dx={-8} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 20px 40px -8px rgba(0,0,0,0.2)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fill="url(#areaRev)" dot={false} />
                  <Area type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#areaExp)" dot={false} strokeDasharray="4 2" />
                </AreaChart>
              ) : (
                <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridStroke} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={tickStyle} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={tickStyle} dx={-8} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(99,102,241,0.2)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(12px)',
                      boxShadow: '0 20px 40px -8px rgba(0,0,0,0.2)',
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} opacity={0.7} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" />
              Revenue
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              Expenses
            </div>
            <div className="ml-auto text-xs font-black text-emerald-500 flex items-center gap-1">
              <TrendingUp size={12} />
              Net: ${(monthlyData[monthlyData.length - 1].revenue - monthlyData[monthlyData.length - 1].expenses).toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* ─ Right column: summary + feed (2/5) ─ */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Occupancy progress */}
          <motion.div custom={6} variants={fadeUp} className="glass-card rounded-3xl p-5 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black dark:text-white">Portfolio Health</h3>
              <span className="text-[10px] font-black text-primary uppercase tracking-wider">Live</span>
            </div>
            <div className="space-y-3">
              {/* Occupied */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                  <span>Occupied</span>
                  <span className="text-emerald-500">{occupiedCount}/{properties.length}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.occupancyRate}%` }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600"
                  />
                </div>
              </div>
              {/* Payments */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                  <span>Paid Tenants</span>
                  <span className="text-indigo-500">{paidTenants}/{tenants.length}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: tenants.length ? `${(paidTenants / tenants.length) * 100}%` : '0%' }}
                    transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-linear-to-r from-indigo-400 to-indigo-600"
                  />
                </div>
              </div>
              {/* Available */}
              <div>
                <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1.5">
                  <span>Available</span>
                  <span className="text-amber-500">{availableCount} units</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: properties.length ? `${(availableCount / properties.length) * 100}%` : '0%' }}
                    transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-linear-to-r from-amber-400 to-amber-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent transactions */}
          <motion.div custom={7} variants={fadeUp} className="glass-card rounded-3xl p-5 border border-white/20 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black dark:text-white">Recent Activity</h3>
              <Link to="/payments" className="text-[10px] font-black text-primary uppercase tracking-wider hover:brightness-110 flex items-center gap-1">
                View All <ChevronRight size={10} />
              </Link>
            </div>
            <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide max-h-64">
              {transactions.length > 0 ? (
                transactions.slice(0, 6).map((tx, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 dark:hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div
                      className={cn(
                        'w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                        tx.status === 'completed'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-amber-500/10 text-amber-500'
                      )}
                    >
                      {tx.status === 'completed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
                        {tx.tenantName}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{tx.propertyName} · {tx.date}</p>
                    </div>
                    <span
                      className={cn(
                        'text-xs font-black shrink-0',
                        tx.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'
                      )}
                    >
                      ${tx.amount}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-slate-300 dark:text-slate-600 space-y-2">
                  <Activity size={32} className="opacity-40 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No activity yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Row: Properties Snapshot + Tenant Status ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Properties quick-view */}
        <motion.div custom={8} variants={fadeUp} className="glass-card rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-black dark:text-white flex items-center gap-2">
              <Building2 size={15} className="text-indigo-500" />
              Properties Snapshot
            </h3>
            <Link to="/properties" className="text-[10px] font-black text-primary uppercase tracking-wider hover:brightness-110 flex items-center gap-1">
              Manage <ChevronRight size={10} />
            </Link>
          </div>
          <div className="space-y-3">
            {properties.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 ring-2 ring-white/10 group-hover:ring-primary/40 transition-all">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-100">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.district} · {p.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-slate-900 dark:text-white">${p.rent}/mo</p>
                  <span
                    className={cn(
                      'text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full',
                      p.status === 'occupied'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-amber-500/10 text-amber-500'
                    )}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tenant payment status */}
        <motion.div custom={9} variants={fadeUp} className="glass-card rounded-3xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-black dark:text-white flex items-center gap-2">
              <Users size={15} className="text-emerald-500" />
              Tenant Status
            </h3>
            <Link to="/tenants" className="text-[10px] font-black text-primary uppercase tracking-wider hover:brightness-110 flex items-center gap-1">
              Manage <ChevronRight size={10} />
            </Link>
          </div>
          <div className="space-y-3">
            {tenants.length > 0 ? (
              tenants.slice(0, 4).map((t) => (
                <div key={t.id} className="flex items-center gap-3 group cursor-pointer">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-primary/40 transition-all bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-100">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.propertyName} · {t.unit}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {t.paymentStatus === 'paid' ? (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                        <ShieldCheck size={9} /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                        <AlertCircle size={9} /> Pending
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-28 text-slate-300 dark:text-slate-600 space-y-2">
                <Users size={28} className="opacity-40" />
                <p className="text-[10px] font-black uppercase tracking-widest">No tenants yet</p>
              </div>
            )}
            {tenants.length > 0 && (
              <Link
                to="/tenants"
                className="flex items-center justify-center gap-2 mt-2 py-2.5 rounded-2xl border border-dashed border-white/20 hover:border-primary/40 hover:bg-primary/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all"
              >
                View All Tenants <ArrowRight size={10} />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

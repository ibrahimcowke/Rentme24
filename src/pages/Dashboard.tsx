import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  MapPin, 
  Search, 
  Bell, 
  ShieldCheck, 
  Clock, 
  Filter,
  ArrowRight,
  Plus,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/utils/cn';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Dashboard: React.FC = () => {
  const { isDark } = useTheme();
  const { stats, transactions } = useData();

  const [metric, setMetric] = useState<'revenue' | 'yield'>('revenue');

  const chartData = [
    { name: 'Jan', revenue: 4000, yield: 85 },
    { name: 'Feb', revenue: 3000, yield: 82 },
    { name: 'Mar', revenue: 5000, yield: 91 },
    { name: 'Apr', revenue: stats.totalRevenue || 4500, yield: stats.occupancyRate || 88 },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-10 animate-in fade-in duration-700 pb-12"
    >
      {/* Prime Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">Operational Hub</span>
            <span className="text-slate-300 dark:text-slate-700 hidden xs:block">|</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Intelligence</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Welcome back, <span className="text-primary italic">Admin</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
           <div className="relative group flex-1 sm:flex-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-12 pr-6 py-3.5 w-full sm:w-64 lg:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-lg shadow-slate-200/50 dark:shadow-none font-medium text-sm"
              />
           </div>
           <button className="relative p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group shadow-md dark:shadow-none shrink-0">
              <Bell size={20} className="group-hover:rotate-12 transition-transform dark:text-slate-100" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-4 border-white dark:border-slate-900" />
           </button>
        </div>
      </div>

      {/* Quick Command Center */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Register Asset', sub: 'New Property', icon: Plus, path: '/properties', color: 'bg-primary' },
          { label: 'Onboard Resident', sub: 'New Tenant', icon: Users, path: '/tenants', color: 'bg-emerald-600' },
          { label: 'Post Payment', sub: 'Rent Entry', icon: DollarSign, path: '/payments', color: 'bg-indigo-600' },
          { label: 'Issue Report', sub: 'Export PDF', icon: FileText, path: '/reports', color: 'bg-slate-900' },
        ].map((action, i) => (
          <Link key={i} to={action.path} className="glass-card p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-lg group hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12", action.color)}>
              <action.icon size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-black tracking-tight dark:text-white uppercase">{action.label}</p>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{action.sub}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Core KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+12.5%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { title: 'Active Units', value: stats.activeUnits.toString(), trend: '+4%', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Market Reach', value: '20 Dis', trend: 'Global', icon: MapPin, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { title: 'Occupancy', value: `${stats.occupancyRate}%`, trend: '+2.1%', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-xl group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={cn("p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110", kpi.bg, kpi.color)}>
                <kpi.icon size={24} />
              </div>
              <span className={cn("text-xs font-black px-2 py-1 rounded-lg border", kpi.color, isDark ? "bg-slate-800/50 border-slate-700" : "bg-white/50 border-slate-100")}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{kpi.title}</p>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase line-clamp-1">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 flex gap-4">
             <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-inner">
                <button 
                  onClick={() => setMetric('revenue')}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                    metric === 'revenue' ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setMetric('yield')}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                    metric === 'yield' ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  Yield
                </button>
             </div>
             <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:text-primary transition-all shadow-sm">
                <Filter size={18} className="dark:text-slate-400 hover:text-inherit" />
             </button>
          </div>
          
          <div className="mb-12">
            <h3 className="text-2xl font-black italic mb-1 dark:text-white">Performance Velocity</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Analytics cluster 24A-2.43</p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={isDark ? 0.4 : 0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1E293B" : "#E2E8F0"} opacity={isDark ? 0.8 : 0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12, fontWeight: 700}} dx={-15} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0F172A' : '#1E293B', 
                    border: isDark ? '1px solid #1E293B' : 'none', 
                    borderRadius: '20px', 
                    color: '#fff', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#fff', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey={metric} stroke="#2563EB" strokeWidth={5} fillOpacity={1} fill="url(#colorRevenue)" dot={{ r: 6, fill: '#2563EB', strokeWidth: 3, stroke: isDark ? '#0F172A' : '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Intelligence Sidefeed */}
        <motion.div variants={itemVariants} className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black italic dark:text-white">Intelligence Feed</h3>
              <Link to="/properties" className="text-[10px] font-black uppercase text-primary tracking-widest hover:brightness-110 transition-all decoration-none">Global View</Link>
           </div>
           
           <div className="glass-card p-8 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl h-[470px] overflow-y-auto space-y-6 scrollbar-hide">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx, i) => (
                  <div key={i} className="flex gap-5 group cursor-pointer">
                    <div className={cn(
                      "w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-black/5",
                      tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                    )}>
                        {tx.status === 'completed' ? <ShieldCheck size={24} /> : <Clock size={24} />}
                    </div>
                    <div className="border-b border-slate-100 dark:border-slate-800/50 pb-5 flex-1 group-last:border-none">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-black group-hover:text-primary transition-colors dark:text-slate-100">{tx.type === 'rent' ? 'Rental Payment' : 'Internal Transfer'}</h4>
                          <span className="text-[10px] font-bold text-slate-400">{tx.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{tx.tenantName} processed ${tx.amount} for {tx.propertyName}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                  <Activity size={48} className="opacity-20 translate-y-2 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No active intelligence</p>
                </div>
              )}
           </div>
           
           <Link to="/reports" className="w-full py-5 bg-linear-to-br from-indigo-600 to-primary rounded-3xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 decoration-none">
              Full Analytics Report
              <ArrowRight size={18} />
           </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

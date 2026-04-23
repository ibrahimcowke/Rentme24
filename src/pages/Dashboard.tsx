import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Activity, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Brain,
  TrendingUp,
  Zap,
  Target
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
  const { theme } = useTheme();
  const { stats, transactions } = useData();
  const isDark = theme === 'midnight';

  const [metric, setMetric] = useState<'revenue' | 'yield'>('revenue');

  const chartData = [
    { name: 'Jan', revenue: 4000, yield: 85 },
    { name: 'Feb', revenue: 3000, yield: 82 },
    { name: 'Mar', revenue: 5000, yield: 91 },
    { name: 'Apr', revenue: stats.totalRevenue || 4500, yield: stats.occupancyRate || 88 },
    { name: 'May', revenue: 6200, yield: 94 },
  ];

  const aiInsights = [
    { 
      title: 'Optimal Pricing', 
      desc: 'Unit 4C is 15% below market rate. Recommended increase: $200/mo.', 
      icon: Target, 
      color: 'text-amber-500', 
      bg: 'bg-amber-500/10' 
    },
    { 
      title: 'Tenant Retention', 
      desc: 'Sarah Miller (Unit 2A) has a 92% satisfaction score. High renewal probability.', 
      icon: Users, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-500/10' 
    },
    { 
      title: 'Predictive Maintenance', 
      desc: 'HVAC in Building B shows signs of wear. Schedule inspection within 30 days.', 
      icon: Brain, 
      color: 'text-primary', 
      bg: 'bg-primary/10' 
    }
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
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20 flex items-center gap-2">
              <Zap size={10} className="animate-pulse" />
              Operational Hub
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden xs:block">|</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Intelligence</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Dashboard <span className="text-primary italic">Overview</span>
          </h1>
        </div>

      </div>

      {/* Core KPIs with Glass Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+12.5%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { title: 'Active Units', value: stats.activeUnits.toString(), trend: '+4%', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { title: 'Market Reach', value: '20 Dis', trend: 'Global', icon: MapPin, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { title: 'Occupancy', value: `${stats.occupancyRate}%`, trend: '+2.1%', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card p-6 rounded-3xl border border-white/20 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl shadow-lg transition-transform group-hover:scale-110", kpi.bg, kpi.color)}>
                <kpi.icon size={20} />
              </div>
              <div className={cn("flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full", kpi.color, "bg-white/50 dark:bg-black/20")}>
                <TrendingUp size={10} />
                {kpi.trend}
              </div>
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{kpi.title}</p>
            <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase line-clamp-1">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* AI Insights Section - NEW FEATURE */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="text-primary animate-pulse" size={24} />
          <h2 className="text-2xl font-black italic dark:text-white">AI Property Insights</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiInsights.map((insight, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border border-white/20 hover:scale-[1.02] transition-all group cursor-pointer">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:rotate-12 shadow-lg", insight.bg, insight.color)}>
                <insight.icon size={24} />
              </div>
              <h4 className="text-lg font-black dark:text-white mb-2">{insight.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{insight.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                Take Action <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-white/20 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <h3 className="text-2xl font-black italic dark:text-white">Performance Velocity</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Global yield & revenue vectors</p>
            </div>
            <div className="flex bg-white/50 dark:bg-black/20 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                <button 
                  onClick={() => setMetric('revenue')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                    metric === 'revenue' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  )}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setMetric('yield')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all",
                    metric === 'yield' ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  )}
                >
                  Yield
                </button>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 12, fontWeight: 700}} dx={-15} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '24px', 
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                />
                <Area type="monotone" dataKey={metric} stroke="var(--color-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" dot={{ r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Intelligence Feed */}
        <motion.div variants={itemVariants} className="space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black italic dark:text-white">Recent Activity</h3>
              <Link to="/reports" className="text-[10px] font-black uppercase text-primary tracking-widest hover:brightness-110 transition-all">View All</Link>
           </div>
           
           <div className="glass-card p-6 rounded-[2.5rem] border border-white/20 h-[480px] overflow-y-auto space-y-4 scrollbar-hide">
              {transactions.length > 0 ? (
                transactions.slice(0, 6).map((tx, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10">
                    <div className={cn(
                      "w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                      tx.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                    )}>
                        {tx.status === 'completed' ? <ShieldCheck size={20} /> : <Clock size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors dark:text-slate-100">{tx.tenantName}</h4>
                          <span className="text-[10px] font-bold text-slate-500 shrink-0">{tx.date}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">${tx.amount} • {tx.propertyName}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                  <Activity size={48} className="opacity-20 animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest">No recent data</p>
                </div>
              )}
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

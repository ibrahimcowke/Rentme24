import React from 'react';
import { 
  DollarSign, 
  Calendar,
  Filter,
  FileText,
  BarChart3,
  Download,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
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
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/Toasts';

const Reports: React.FC = () => {
  const { theme } = useTheme();
  const { stats } = useData();
  const isDark = theme === 'midnight';
  const { addToast } = useToast();

  const handleExport = () => {
    addToast('Financial Ledger exported successfully as PDF.', 'success');
  };

  const revenueData = [
    { month: 'Jan', revenue: 4500, expenses: 1200 },
    { month: 'Feb', revenue: 5200, expenses: 1400 },
    { month: 'Mar', revenue: 4800, expenses: 1100 },
    { month: 'Apr', revenue: 6100, expenses: 1800 },
    { month: 'May', revenue: stats.totalRevenue, expenses: stats.totalExpenses },
  ];

  const distributionData = [
    { name: 'Residential', value: 65, color: '#2563EB' },
    { name: 'Commercial', value: 25, color: '#10B981' },
    { name: 'Industrial', value: 10, color: '#F59E0B' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl ring-4 ring-indigo-500/5">
              <BarChart3 size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tight dark:text-white">Finance <span className="text-indigo-600 italic">Core</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Advanced financial analytics and performance reporting.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-slate-100 shadow-sm active:scale-95">
            <Calendar size={18} />
            <span>Last 6 Months</span>
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-500/20 glow-primary whitespace-nowrap active:scale-95"
          >
            <Download size={18} />
            <span>Export Financials</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, trend: '+12.5%', isUp: true, icon: TrendingUp },
          { title: 'Net Profit', value: `$${stats.netProfit.toLocaleString()}`, trend: '+18.2%', isUp: true, icon: DollarSign },
          { title: 'Total Expenses', value: `$${stats.totalExpenses.toLocaleString()}`, trend: '-2.4%', isUp: false, icon: TrendingDown },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-4xl shadow-xl group border-white/20 dark:border-white/5"
          >
             <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{card.title}</span>
                <card.icon size={20} className={card.isUp ? 'text-emerald-500' : 'text-rose-500'} />
             </div>
             <h3 className="text-4xl font-black tracking-tighter mb-2 dark:text-white uppercase line-clamp-1">{card.value}</h3>
             <div className="flex items-center gap-2">
                <span className={cn("text-xs font-black", card.isUp ? 'text-emerald-500' : 'text-rose-500')}>{card.trend}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth vs LY</span>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-4xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 flex gap-2">
             <button className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl hover:text-indigo-600 transition-all text-slate-400"><Filter size={18} /></button>
          </div>
          
          <h3 className="text-xl font-black mb-10 italic dark:text-white">Revenue Velocity</h3>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={isDark ? 0.4 : 0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1E293B" : "#E2E8F0"} opacity={isDark ? 0.8 : 0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 10, fontWeight: 800}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 10, fontWeight: 800}} dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#0F172A' : '#1E293B', 
                    border: 'none', 
                    borderRadius: '20px', 
                    color: '#fff', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenueReports)" dot={{ r: 5, fill: '#4F46E5', strokeWidth: 2, stroke: isDark ? '#0F172A' : '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8 rounded-4xl shadow-2xl">
           <h3 className="text-xl font-black mb-10 italic dark:text-white">Quarterly Expenses</h3>
           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={revenueData.slice(2)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#1E293B" : "#E2E8F0"} opacity={isDark ? 0.6 : 0.3} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 10, fontWeight: 800}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#64748B' : '#94A3B8', fontSize: 10, fontWeight: 800}} />
                    <Bar dataKey="expenses" radius={[15, 15, 0, 0]}>
                       {revenueData.slice(2).map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4F46E5' : '#818CF8'} fillOpacity={0.8} />
                       ))}
                    </Bar>
                    <Tooltip cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }} contentStyle={{ backgroundColor: isDark ? '#0F172A' : '#1E293B', border: 'none', borderRadius: '16px' }} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="glass-card p-8 rounded-4xl shadow-2xl flex flex-col items-center">
            <h3 className="text-xl font-black w-full text-left italic mb-6 dark:text-white">Asset Allocation</h3>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={distributionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={10}
                        dataKey="value"
                        stroke="none"
                     >
                        {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Pie>
                     <Tooltip />
                  </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
               {distributionData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50 group cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-all">
                     <span className="text-xs font-black dark:text-slate-200">{item.name}</span>
                     <span className="text-xs font-black text-slate-500 dark:text-slate-400">{item.value}%</span>
                  </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-2 glass-card p-8 rounded-4xl shadow-2xl">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black italic dark:text-white">Recent Exports</h3>
               <button className="text-[10px] font-black uppercase text-indigo-600 tracking-widest hover:underline transition-all">Clear History</button>
            </div>
            <div className="space-y-4">
               {[
                  { name: 'Q2 Financial Summary.pdf', size: '2.4 MB', date: '2 hours ago', type: 'PDF' },
                  { name: 'Property Tax Ledger - 2024.xlsx', size: '4.1 MB', date: 'Yesterday', type: 'EXCEL' },
                  { name: 'Maintenance Expense Audit.pdf', size: '1.2 MB', date: '2 days ago', type: 'PDF' },
               ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-100/50 dark:bg-slate-800/20 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 group hover:shadow-xl hover:border-indigo-500/30 transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                           <FileText size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-black group-hover:text-indigo-600 transition-colors uppercase tracking-tight dark:text-slate-100">{report.name}</p>
                           <p className="text-[10px] font-bold text-slate-400">{report.size} • {report.date}</p>
                        </div>
                     </div>
                     <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-indigo-600 text-slate-500 dark:text-slate-400 hover:text-white transition-all shadow-sm">
                        <Download size={18} />
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;

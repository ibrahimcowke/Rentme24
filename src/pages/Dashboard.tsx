import React from 'react';
import { 
  Building2, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  Calendar,
  Users,
  Search,
  Bell
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4200, expenses: 2100 },
  { name: 'Feb', revenue: 3800, expenses: 1900 },
  { name: 'Mar', revenue: 5200, expenses: 2400 },
  { name: 'Apr', revenue: 4800, expenses: 2200 },
  { name: 'May', revenue: 6400, expenses: 2800 },
  { name: 'Jun', revenue: 5900, expenses: 2600 },
];

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

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative overflow-hidden glass-card p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-2xl group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 bg-linear-to-br ${color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-500`} />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{title}</span>
            <h3 className="text-3xl font-black mt-1 tracking-tight">{value}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center px-2 py-1 rounded-lg text-[10px] font-black ${trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-600'}`}>
              {trend > 0 ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
              {Math.abs(trend)}%
            </div>
            <span className="text-[10px] font-bold text-slate-400">vs last month</span>
          </div>
        </div>

        <div className={`p-4 rounded-2xl bg-linear-to-br ${color} shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
      
      <div className="mt-6 flex items-end gap-1 h-8 opacity-30 group-hover:opacity-60 transition-opacity">
        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
          <div key={i} className={`flex-1 rounded-full ${color.split(' ')[0]}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-lg border border-primary/20">System Live</span>
            <span className="text-slate-400 text-xs font-medium">• Mogadishu, Somalia</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            GuriFlow <span className="text-primary italic">Pro</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">Intelligence-driven property management platform.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Command search..." 
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl relative">
            <Bell size={20} className="text-slate-600 dark:text-slate-400" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Portfolio" 
          value="125" 
          trend={12} 
          icon={Building2} 
          color="from-blue-600 to-blue-400" 
        />
        <StatCard 
          title="Lease Velocity" 
          value="97%" 
          trend={5} 
          icon={CheckCircle2} 
          color="from-emerald-600 to-emerald-400" 
        />
        <StatCard 
          title="Gross Revenue" 
          value="$42.5k" 
          trend={8} 
          icon={DollarSign} 
          color="from-indigo-600 to-indigo-400" 
        />
        <StatCard 
          title="Overdue Debt" 
          value="$1.2k" 
          trend={-2} 
          icon={Clock} 
          color="from-rose-600 to-rose-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 flex gap-2">
             <button className="px-4 py-1.5 bg-primary/5 text-primary text-xs font-black rounded-lg border border-primary/10">Growth</button>
             <button className="px-4 py-1.5 text-slate-400 text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Yield</button>
          </div>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black">Financial Performance</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time revenue stream analysis</p>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} 
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ stroke: '#2563EB', strokeWidth: 2, strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', border: 'none', borderRadius: '16px', backdropFilter: 'blur(10px)', padding: '12px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2563EB" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  animationBegin={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-r from-emerald-500 via-primary to-rose-500 opacity-50" />
           
           <h3 className="text-xl font-black mb-8 italic">Portfolio Efficiency</h3>
           
           <div className="flex-1 flex flex-col justify-center items-center gap-6">
              <div className="relative w-48 h-48">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                    <circle 
                      cx="96" 
                      cy="96" 
                      r="88" 
                      stroke="currentColor" 
                      strokeWidth="12" 
                      fill="transparent" 
                      strokeDasharray="552.9" 
                      strokeDashoffset="110" 
                      className="text-primary drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter">82 <span className="text-xl text-slate-400">%</span></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Growth Index</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Occupancy</p>
                    <p className="text-lg font-black">94.2%</p>
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Retention</p>
                    <p className="text-lg font-black">88.5%</p>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl relative">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-black tracking-tight">Intelligence Feed</h3>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Full Audit</button>
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-5 group cursor-pointer">
                <div className="relative flex flex-col items-center">
                   <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {i === 1 ? <AlertCircle size={20} /> : i === 2 ? <DollarSign size={20} /> : <Users size={20} />}
                   </div>
                   {i !== 3 && <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-800 mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-black group-hover:text-primary transition-colors">
                    {i === 1 ? 'High Priority Maintenance' : i === 2 ? 'Large Payment Received' : 'New Lease Signed'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                    {i === 1 ? 'Electrical issue reported at Villa Hodan Block B (#402). Engineering team dispatched.' : 
                     i === 2 ? 'International wire transfer of $12,500.00 verified for Commercial Hub - Unit 10.' : 
                     'Hafsa Ahmed has finalized the lease agreement for Blue Sky Apt - #302.'}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                     <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {i * 15}m ago
                     </span>
                     {i === 1 && <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 text-[10px] font-black uppercase rounded-md tracking-wider">Critical</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 p-8">
              <h3 className="text-xl font-black italic">Portfolio Distribution</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Asset Allocation</p>
           </div>
           
           <div className="h-[300px] w-full mt-12">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data.slice(0, 4)}>
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} 
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px' }}
                    />
                    <Bar dataKey="revenue" radius={[10, 10, 0, 0]}>
                       {data.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2563EB' : '#14B8A6'} fillOpacity={0.8} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
                 <div className="flex items-center gap-3">
                    <Calendar className="text-primary" size={18} />
                    <span className="text-sm font-black">Renewals due this week</span>
                 </div>
                 <span className="text-lg font-black text-primary">12</span>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

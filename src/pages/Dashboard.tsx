import React, { useState } from 'react';
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
  Bell,
  ArrowRight
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

const intelligenceFeed = [
  { id: 1, type: 'critical', title: 'High Priority Maintenance', detail: 'Electrical issue reported at Villa Hodan Block B (#402). Engineering team dispatched.', time: '15m ago', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-500/10' },
  { id: 2, type: 'financial', title: 'Large Payment Received', detail: 'International wire transfer of $12,500.00 verified for Commercial Hub - Unit 10.', time: '30m ago', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-500/10' },
  { id: 3, type: 'contract', title: 'New Lease Signed', detail: 'Hafsa Ahmed has finalized the lease agreement for Blue Sky Apt - #302.', time: '45m ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { id: 4, type: 'warning', title: 'Unpaid Utility Bill', detail: 'Dayniile Plaza has an outstanding water bill of $420.00 due in 2 days.', time: '1h ago', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10' },
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
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFeed = intelligenceFeed.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-emerald-500/20 shadow-sm shadow-emerald-500/10">Active Operations</span>
            <span className="text-slate-400 text-xs font-medium tracking-wide">• Mogadishu Digital Office</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            GuriFlow <span className="text-primary italic">Pro</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1">AI-Enhanced Real Estate Operating System.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter intelligence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl relative group overflow-hidden">
             <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
            <Bell size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Portfolio Value" 
          value="$2.4M" 
          trend={12} 
          icon={Building2} 
          color="from-blue-600 to-blue-400" 
        />
        <StatCard 
          title="Occupancy" 
          value="98.2%" 
          trend={5} 
          icon={CheckCircle2} 
          color="from-emerald-600 to-emerald-400" 
        />
        <StatCard 
          title="Monthly Goal" 
          value="84%" 
          trend={8} 
          icon={TrendingUp} 
          color="from-indigo-600 to-indigo-400" 
        />
        <StatCard 
          title="Delinquency" 
          value="1.4%" 
          trend={-2} 
          icon={AlertCircle} 
          color="from-rose-600 to-rose-400" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 flex gap-2 z-10">
             <button className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-lg border border-primary/20">Monthly</button>
             <button className="px-4 py-1.5 text-slate-400 text-xs font-black hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Quarterly</button>
          </div>
          
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black">Velocity & Growth</h3>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Real-time revenue stream analysis</p>
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
           
           <h3 className="text-xl font-black mb-8 italic">Operating Margin</h3>
           
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
                      className="text-primary drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black tracking-tighter">82 <span className="text-xl text-slate-400">%</span></span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">System Health</span>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-3 w-full">
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Collection Rate</p>
                      <p className="text-lg font-black">96.5%</p>
                    </div>
                    <ArrowUpRight className="text-emerald-500" size={20} />
                 </div>
                 <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retention Rate</p>
                      <p className="text-lg font-black">91.4%</p>
                    </div>
                    <ArrowUpRight className="text-emerald-500" size={20} />
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl relative min-h-[500px]">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                  <Activity size={20} />
                </div>
                <div>
                   <h3 className="text-xl font-black tracking-tight">Intelligence Stream</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Audits</p>
                </div>
             </div>
             <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary transition-all">
                <Calendar size={18} />
             </button>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredFeed.length > 0 ? filteredFeed.map((item) => (
                <motion.div 
                  layout
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex gap-5 group cursor-pointer"
                >
                  <div className="relative flex flex-col items-center pt-1">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm",
                      item.bg, item.color, "group-hover:scale-110"
                    )}>
                      <item.icon size={22} />
                    </div>
                    <div className="w-px h-full bg-slate-100 dark:bg-slate-800 my-2" />
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black group-hover:text-primary transition-colors">{item.title}</p>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed max-w-md">
                      {item.detail}
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                       <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-black rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-2 group/btn uppercase tracking-widest">
                          Resolve
                          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                       {item.type === 'critical' && <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 text-[10px] font-black uppercase rounded-md tracking-wider border border-rose-500/20 shadow-sm shadow-rose-500/5">Priority</span>}
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                   <Search size={48} className="mb-4 opacity-20" />
                   <p className="text-sm font-bold tracking-tight">No intelligence found matching your search</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 p-8 flex items-center justify-between w-full">
              <div>
                <h3 className="text-xl font-black italic">Collection Trend</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Past 4 Quarters</p>
              </div>
              <button className="text-[10px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-xl uppercase tracking-widest">Export PDF</button>
           </div>
           
           <div className="h-[300px] w-full mt-16">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data.slice(0, 4)}>
                    <XAxis 
                       dataKey="name" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 800}} 
                    />
                    <Tooltip 
                       cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
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

           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
                 <div className="flex flex-col gap-2">
                    <Calendar className="text-primary group-hover:scale-110 transition-transform" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Weekly Renewals</span>
                    <span className="text-3xl font-black text-primary">12</span>
                 </div>
              </div>
              <div className="p-5 bg-slate-100/50 dark:bg-slate-800/30 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 group hover:shadow-xl transition-all">
                 <div className="flex flex-col gap-2">
                    <CheckCircle2 className="text-emerald-500 group-hover:scale-110 transition-transform" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tasks Solved</span>
                    <span className="text-3xl font-black text-emerald-500">42</span>
                 </div>
              </div>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

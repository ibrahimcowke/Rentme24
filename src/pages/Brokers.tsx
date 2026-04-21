import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Briefcase, 
  Phone, 
  Mail,
  Plus,
  MoreVertical,
  Star,
  Search,
  Filter,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const mockBrokers = [
  { 
    id: 1, 
    name: "Abdiwahab Ahmed", 
    deals: 24, 
    earnings: 3250, 
    rate: 5, 
    status: "active", 
    score: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdi" 
  },
  { 
    id: 2, 
    name: "Sahra Hassan", 
    deals: 18, 
    earnings: 2100, 
    rate: 4, 
    status: "active", 
    score: 4.5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sahra" 
  },
  { 
    id: 3, 
    name: "Mohamed Ali", 
    deals: 12, 
    earnings: 1450, 
    rate: 4.5, 
    status: "active", 
    score: 4.2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed" 
  },
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

const Brokers: React.FC = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl ring-4 ring-blue-500/5">
              <Briefcase size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Broker <span className="text-blue-600 italic">Network</span></h1>
          </div>
          <p className="text-slate-500 font-medium">Coordinate with external agents and track performance-based payouts.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search brokers..." 
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <Plus size={18} />
            <span>Add Broker</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <motion.div variants={itemVariants} className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-blue-600 to-indigo-500 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-48 h-48 -mr-12 -mt-12 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500" />
             <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                   <Briefcase size={32} />
                </div>
                <span className="text-[10px] font-black bg-white/20 px-4 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-md">Tier 1 Partners</span>
             </div>
             <p className="text-white/70 text-xs font-black uppercase tracking-[0.2em] relative z-10">Total Broker Commissions</p>
             <h3 className="text-5xl font-black mt-2 tracking-tighter relative z-10">$12,450.00</h3>
             <div className="mt-8 flex items-center gap-3 text-[10px] font-black text-white/90 bg-white/10 w-fit px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 relative z-10">
                <TrendingUp size={14} />
                <span>+15% GROWTH FROM Q1</span>
             </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 shadow-2xl flex flex-col justify-between">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black italic">Leaderboard</h3>
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                   <Award size={20} />
                </div>
             </div>
             <div className="space-y-4 mt-8">
                {mockBrokers.map((b, i) => (
                  <div key={b.id} className="flex items-center gap-4 group cursor-pointer">
                    <span className="text-[10px] font-black text-slate-400 w-4 tracking-tighter">0{i+1}</span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 p-0.5 shadow-sm group-hover:scale-110 transition-transform">
                       <img src={b.avatar} alt={b.name} className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800" />
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-black group-hover:text-primary transition-colors">{b.name}</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{b.deals} Deals</p>
                    </div>
                    <span className="text-sm font-black text-primary">${b.earnings}</span>
                  </div>
                ))}
             </div>
             <button className="mt-10 w-full py-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Download Audit</button>
          </div>
        </motion.div>

        {/* Smart Score Widget */}
        <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 shadow-2xl bg-linear-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent relative overflow-hidden">
           <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
           
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black italic">Network Health</h3>
              <button className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm"><Filter size={18} /></button>
           </div>
           
           <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                    <circle 
                      cx="80" 
                      cy="80" 
                      r="74" 
                      stroke="currentColor" 
                      strokeWidth="10" 
                      fill="transparent" 
                      strokeDasharray="464.96" 
                      strokeDashoffset="37.2" 
                      className="text-primary drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black tracking-tighter">9.2</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Global Score</span>
                 </div>
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-widest text-slate-500 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200/50 dark:border-slate-700/50">Efficiency: Optimal</p>
           </div>
        </motion.div>
      </div>

      {/* Broker List */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-xl font-black tracking-tight italic">Active Network</h3>
           <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors"><MoreVertical size={20} /></button>
           </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {mockBrokers.map((broker) => (
              <motion.div 
                layout
                key={broker.id} 
                className="glass-card rounded-[2.5rem] p-8 border border-white/20 dark:border-slate-800/50 flex flex-col sm:flex-row gap-8 hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary"><ExternalLink size={16} /></button>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-[2rem] bg-linear-to-tr from-primary to-indigo-500 p-1 mb-4 shadow-xl shadow-primary/20 group-hover:rotate-3 transition-transform duration-500">
                     <div className="w-full h-full rounded-[1.75rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-900">
                        <img src={broker.avatar} alt={broker.name} className="w-full h-full object-cover" />
                     </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20 shadow-sm shadow-amber-500/5">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{broker.score}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-2xl tracking-tight group-hover:text-primary transition-all">{broker.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Rate: {broker.rate}% commission</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50 group-hover:border-primary/20 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Impact</p>
                        <p className="text-xl font-black">{broker.deals} <span className="text-xs uppercase text-slate-400">Deals</span></p>
                     </div>
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50 group-hover:border-primary/20 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Generated</p>
                        <p className="text-xl font-black text-primary">${broker.earnings.toLocaleString()}</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                     <button className="flex-1 h-12 flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all group/btn shadow-sm">
                        <Phone size={18} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">Call Agent</span>
                     </button>
                     <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                        <Mail size={18} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Brokers;

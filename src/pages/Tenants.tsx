import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  Mail, 
  Home, 
  MoreVertical,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const mockTenants = [
  { 
    id: 1, 
    name: "Ali Omar", 
    property: "Villa Hodan", 
    unit: "B-402", 
    status: "active", 
    phone: "+252 61 555 0123", 
    email: "ali.omar@email.so",
    joinDate: "Jan 2024",
    paymentStatus: "paid",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali"
  },
  { 
    id: 2, 
    name: "Hafsa Ahmed", 
    property: "Blue Sky Apt", 
    unit: "302", 
    status: "active", 
    phone: "+252 61 555 0456", 
    email: "hafsa.a@email.so",
    joinDate: "Mar 2024",
    paymentStatus: "pending",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hafsa"
  },
  { 
    id: 3, 
    name: "Khalid Yusuf", 
    property: "Commercial Hub", 
    unit: "10", 
    status: "active", 
    phone: "+252 61 555 0789", 
    email: "khalid.y@email.so",
    joinDate: "Dec 2023",
    paymentStatus: "paid",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Tenants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl ring-4 ring-emerald-500/5">
              <Users size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Tenant <span className="text-emerald-600 italic">Registry</span></h1>
          </div>
          <p className="text-slate-500 font-medium">Coordinate resident relationships and lease history records.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap">
            <Plus size={18} />
            <span>Add Tenant</span>
          </button>
        </div>
      </div>

      {/* KPI Summary for Tenants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Active Leases', value: '124', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'New Arrivals', value: '+12', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Pending Payouts', value: '$2,400', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-500/10' },
         ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-xl flex items-center gap-5">
               <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}>
                  <stat.icon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
               </div>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {mockTenants.map((tenant) => (
            <motion.div
              layout
              key={tenant.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-[2.5rem] border border-white/20 dark:border-slate-800/50 shadow-2xl group relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-emerald-500 opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:rotate-3 transition-transform duration-500">
                    <div className="w-full h-full rounded-[1.125rem] bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900 overflow-hidden">
                       <img src={tenant.avatar} alt={tenant.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md w-fit">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Residential</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                   <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                        <Home size={16} className="text-primary" />
                     </div>
                     <div>
                        <p className="text-xs font-black">{tenant.property}</p>
                        <p className="text-[10px] font-bold text-slate-400">Unit {tenant.unit}</p>
                     </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                    tenant.paymentStatus === 'paid' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                  )}>
                    {tenant.paymentStatus}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 group/item hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
                     <Phone size={16} className="text-slate-400 group-hover/item:text-primary transition-colors" />
                     <span className="text-[10px] font-black truncate">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 group/item hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
                     <Mail size={16} className="text-slate-400 group-hover/item:text-primary transition-colors" />
                     <span className="text-[10px] font-black truncate">Email</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Resident since {tenant.joinDate}</span>
                 </div>
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:translate-x-1 transition-all">
                    Full Ledger <ArrowRight size={14} />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tenants;

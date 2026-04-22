import React, { useState } from 'react';
import { 
  DollarSign, 
  Smartphone, 
  Building2, 
  ArrowUpRight,
  Plus,
  Search,
  FileDown,
  CreditCard,
  History,
  TrendingUp,
  Clock,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal';

import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/Toasts';

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

const Payments: React.FC = () => {
  const { transactions, tenants, addTransaction, stats } = useData();
  const { addToast } = useToast();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    tenantId: tenants[0]?.id || '',
    amount: 0,
    method: 'Mobile Money (EVC Plus)',
    type: 'rent' as 'rent' | 'deposit' | 'maintenance',
    status: 'completed' as 'completed' | 'pending'
  });

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.status === filter
  );

  const handlePostPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant = tenants.find(t => t.id === formData.tenantId);
    if (!tenant) return;

    addTransaction({
      ...formData,
      tenantName: tenant.name,
      propertyId: tenant.propertyId,
      propertyName: tenant.propertyName
    });
    addToast(`Payment of $${formData.amount} posted for ${tenant.name}.`, 'success');
    
    setIsAddModalOpen(false);
    setFormData({ 
      tenantId: tenants[0]?.id || '', 
      amount: 0, 
      method: 'Mobile Money (EVC Plus)', 
      type: 'rent',
      status: 'completed'
    });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in fade-in duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl ring-4 ring-emerald-500/5">
              <DollarSign size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Financial <span className="text-emerald-600 NOT-italic">Cloud</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Digital ledger and real-time transaction monitoring.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter payments..." 
              className="pl-12 pr-6 py-3.5 w-72 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-xl dark:text-white text-sm font-bold"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 whitespace-nowrap glow-primary active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Post Payment</span>
          </button>
        </div>
      </div>

      {/* Transaction Overview with Glass Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Today Revenue', value: '$1,250', trend: '+8%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Weekly Gross', value: '$8,400', trend: '+12%', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Payouts', value: '$2,300', trend: '-2%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Cash Flow', value: '42.5%', trend: '+5%', icon: History, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-3xl group cursor-pointer shadow-xl flex items-center gap-4 transition-all hover:scale-[1.02]">
             <div className={cn("p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                <stat.icon size={22} />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                <p className="text-xl font-black dark:text-white uppercase tracking-tighter">{stat.value}</p>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
             <h3 className="text-2xl font-black italic dark:text-white uppercase tracking-tighter">Recent Transactions</h3>
             <div className="flex items-center gap-4">
                <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner">
                   <button onClick={() => setFilter('all')} className={cn("px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all", filter === 'all' ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200")}>All</button>
                   <button onClick={() => setFilter('completed')} className={cn("px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all", filter === 'completed' ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200")}>Paid</button>
                   <button onClick={() => setFilter('pending')} className={cn("px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all", filter === 'pending' ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200")}>Due</button>
                </div>
                <button className="p-3 glass rounded-2xl text-slate-400 hover:text-emerald-500 transition-all">
                   <FileDown size={20} />
                </button>
             </div>
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Transaction</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Resident Member</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Transfer Channel</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Settlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 glass rounded-xl shadow-sm border transition-transform group-hover:scale-110",
                          tx.status === 'completed' ? "text-emerald-500 border-emerald-500/20" : "text-amber-500 border-amber-500/20"
                        )}>
                          <ArrowUpRight size={20} />
                        </div>
                        <div>
                          <p className="font-black tracking-tight uppercase text-xs dark:text-white">{tx.id}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{tx.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-sm dark:text-slate-100 uppercase tracking-tight">{tx.tenantName}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">{tx.propertyName}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 glass rounded-lg text-slate-400">
                           {tx.method.includes('Mobile') ? <Smartphone size={16} /> : <Building2 size={16} />}
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{tx.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xl font-black text-emerald-600 tracking-tighter">${tx.amount}</span>
                        <span className={cn(
                          "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-lg",
                          tx.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}>
                          {tx.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Financial Configuration */}
        <motion.div variants={itemVariants} className="space-y-6">
           <h3 className="text-2xl font-black italic px-2 dark:text-white uppercase tracking-tighter">Settlement Hub</h3>
           <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl border border-white/10 space-y-8">
              <div className="space-y-4">
                 {[
                   { label: 'Mobile Payouts', icon: Smartphone, active: true, color: 'text-emerald-500' },
                   { label: 'Cloud Sync', icon: History, active: false, color: 'text-slate-500' },
                   { label: 'Auto Receipts', icon: Zap, active: true, color: 'text-primary' },
                 ].map((toggle, i) => (
                   <div key={i} className="flex items-center justify-between p-5 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <toggle.icon className={toggle.color} size={20} />
                         <span className="text-xs font-black dark:text-slate-100 uppercase tracking-widest">{toggle.label}</span>
                      </div>
                      <div className={cn(
                        "w-12 h-6 rounded-full p-1 flex transition-all shadow-inner",
                        toggle.active ? "bg-emerald-500 justify-end" : "bg-white/10 justify-start"
                      )}>
                         <div className="w-4 h-4 bg-white rounded-full shadow-xl" />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-8 bg-linear-to-br from-emerald-600 to-teal-500 rounded-4xl text-white shadow-2xl relative overflow-hidden group glow-primary">
                 <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform duration-700"><TrendingUp size={80} /></div>
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-emerald-100">Market Occupancy</h4>
                 <p className="text-5xl font-black tracking-tighter mb-8 relative z-10">{stats.occupancyRate}%</p>
                 <button className="w-full py-4 glass text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-3">
                    Full Ledger View
                    <ArrowRight size={16} />
                 </button>
              </div>

              <div className="pt-4 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">Network Protocols</p>
                 <div className="flex gap-4">
                    {[0, 1, 2].map((i) => (
                       <div key={i} className="flex-1 py-5 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 cursor-pointer">
                          <CreditCard size={20} className="text-slate-500" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Post Payment Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Initialize Financial Settlement">
        <form onSubmit={handlePostPayment} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Select Resident</label>
            <select 
              required 
              value={formData.tenantId}
              onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
              className="w-full px-5 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white appearance-none"
            >
              {tenants.map(t => (
                 <option key={t.id} value={t.id} className="bg-slate-900">{t.name} • {t.propertyName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Transfer Channel</label>
              <select 
                required 
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                className="w-full px-5 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white appearance-none"
              >
                 <option value="Mobile Money (EVC Plus)" className="bg-slate-900">Mobile Money (EVC Plus)</option>
                 <option value="e-Dahab" className="bg-slate-900">e-Dahab</option>
                 <option value="Bank Transfer" className="bg-slate-900">Bank Transfer</option>
                 <option value="Cash" className="bg-slate-900">Cash</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Volume ($)</label>
              <input 
                type="number" required placeholder="500" 
                value={formData.amount || ''} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full px-5 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4.5 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all glow-primary">
            Post Settlement To Ledger
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Payments;

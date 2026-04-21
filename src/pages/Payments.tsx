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
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal';

const transactions = [
  { id: 'PAY-771', tenant: 'Ali Omar', property: 'Villa Hodan', amount: 500, type: 'rent', method: 'Mobile Money', date: '2024-03-20', status: 'completed' },
  { id: 'PAY-772', tenant: 'Hafsa Ahmed', property: 'Blue Sky Apt', amount: 350, type: 'rent', method: 'e-Dahab', date: '2024-03-19', status: 'pending' },
  { id: 'PAY-773', tenant: 'Khalid Yusuf', property: 'Commercial Hub', amount: 1200, type: 'rent', method: 'Bank Transfer', date: '2024-03-18', status: 'completed' },
  { id: 'PAY-774', tenant: 'Zahra Hassan', property: 'Villa Hodan', amount: 450, type: 'deposit', method: 'Mobile Money', date: '2024-03-15', status: 'completed' },
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

const Payments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' || tx.status === filter
  );

  const handlePostPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    alert('Payment successfully posted to the digital ledger.');
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in fade-in duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl ring-4 ring-emerald-500/5">
              <DollarSign size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Payment <span className="text-emerald-600 italic">Cloud</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Digital ledger and real-time transaction monitoring.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter payments..." 
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm dark:text-slate-100 placeholder-slate-400"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-500/20 whitespace-nowrap glow-primary"
          >
            <Plus size={18} />
            <span>Post Payment</span>
          </button>
        </div>
      </div>

      {/* Transaction Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Today Revenue', value: '$1,250', trend: '+8%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Weekly Gross', value: '$8,400', trend: '+12%', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending Payouts', value: '$2,300', trend: '-2%', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Cash Collection', value: '42.5%', trend: '+5%', icon: History, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-3xl group cursor-pointer shadow-xl flex items-center gap-4 transition-transform hover:scale-[1.02]">
             <div className={cn("p-4 rounded-2xl transition-transform group-hover:scale-110 shadow-sm", stat.bg, stat.color)}>
                <stat.icon size={20} />
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
          <div className="flex items-center justify-between px-2">
             <h3 className="text-xl font-black italic dark:text-white">Recent Transactions</h3>
             <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800/50 shadow-inner">
                   <button onClick={() => setFilter('all')} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", filter === 'all' ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" : "text-slate-400")}>All</button>
                   <button onClick={() => setFilter('completed')} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", filter === 'completed' ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" : "text-slate-400")}>Paid</button>
                   <button onClick={() => setFilter('pending')} className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", filter === 'pending' ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" : "text-slate-400")}>Due</button>
                </div>
                <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:text-emerald-600 transition-all shadow-sm">
                   <FileDown size={18} className="dark:text-slate-400 hover:text-inherit" />
                </button>
             </div>
          </div>

          <div className="glass-card rounded-4xl overflow-hidden shadow-2xl overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Transaction</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Member</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Method</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Volume</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-3 rounded-xl shadow-sm border",
                          tx.status === 'completed' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-500/20" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-100 dark:border-amber-500/20"
                        )}>
                          <ArrowUpRight size={18} />
                        </div>
                        <div>
                          <p className="font-black tracking-tight uppercase text-xs dark:text-slate-100">{tx.id}</p>
                          <p className="text-[10px] font-bold text-slate-400">{tx.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-black text-sm dark:text-slate-200">{tx.tenant}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.property}</p>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                         {tx.method.includes('Mobile') || tx.method.includes('e-Dahab') ? <Smartphone size={14} className="text-emerald-500" /> : <Building2 size={14} className="text-slate-400" />}
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{tx.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">${tx.amount}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm",
                        tx.status === 'completed' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      )}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Payment Configuration */}
        <motion.div variants={itemVariants} className="space-y-6">
           <h3 className="text-xl font-black italic px-2 dark:text-white">Configuration</h3>
           <div className="glass-card p-8 rounded-4xl shadow-2xl space-y-8">
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                       <Smartphone className="text-emerald-500" size={20} />
                       <span className="text-sm font-black dark:text-slate-200">Mobile Payouts</span>
                    </div>
                    <div className="w-10 h-5 bg-emerald-500 rounded-full p-1 flex justify-end transition-all cursor-pointer shadow-sm">
                       <div className="w-3 h-3 bg-white rounded-full shadow-md" />
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                       <History className="text-slate-400" size={20} />
                       <span className="text-sm font-black text-slate-400">Escrow Sync</span>
                    </div>
                    <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700/50 rounded-full p-1 flex justify-start transition-all cursor-pointer" />
                 </div>
              </div>

              <div className="p-6 bg-linear-to-br from-emerald-600 to-teal-500 rounded-4xl text-white shadow-xl relative overflow-hidden group glow-primary">
                 <div className="absolute top-0 right-0 p-4 opacity-30 group-hover:scale-110 transition-transform"><TrendingUp size={48} /></div>
                 <h4 className="text-lg font-black italic mb-2 relative z-10 text-emerald-50">Revenue Yield</h4>
                 <p className="text-4xl font-black tracking-tighter mb-4 relative z-10">94.2%</p>
                 <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all border border-white/10">Full Settlement</button>
              </div>

              <div className="pt-4 space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Integrations</p>
                 <div className="flex gap-3">
                    {[0, 1, 2, 3].map((i) => (
                       <div key={i} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-center justify-center opacity-50 hover:opacity-100 transition-all border border-transparent hover:border-emerald-500/30 cursor-pointer">
                          <CreditCard size={18} className="dark:text-slate-400" />
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>
      </div>

      {/* Post Payment Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Post New Transaction">
        <form onSubmit={handlePostPayment} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Select Resident</label>
            <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold appearance-none dark:text-slate-100">
                 <option className="bg-white dark:bg-slate-900">Ali Omar (Villa Hodan)</option>
                 <option className="bg-white dark:bg-slate-900">Hafsa Ahmed (Blue Sky Apt)</option>
                 <option className="bg-white dark:bg-slate-900">Khalid Yusuf (Commercial Hub)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Payment Method</label>
              <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold appearance-none dark:text-slate-100">
                 <option className="bg-white dark:bg-slate-900">Mobile Money (EVC Plus)</option>
                 <option className="bg-white dark:bg-slate-900">e-Dahab</option>
                 <option className="bg-white dark:bg-slate-900">Bank Transfer</option>
                 <option className="bg-white dark:bg-slate-900">Cash</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Amount ($)</label>
              <input type="number" required placeholder="500" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Transaction Ref (Optional)</label>
            <input type="text" placeholder="e.g. TX-99281" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" />
          </div>

          <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 glow-primary">
            Post To Ledger
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Payments;

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Star,
  ExternalLink,
  Plus,
  Search,
  Filter,
  UserSquare2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal';

const brokers = [
  { id: 1, name: 'Zakaria Ali', units: 48, rating: 4.9, score: 98, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zak' },
  { id: 2, name: 'Muna Yusuf', units: 36, rating: 4.8, score: 94, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Muna' },
  { id: 3, name: 'Abdi Hassan', units: 24, rating: 4.7, score: 89, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abdi' },
];

const Brokers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredBrokers = brokers.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddBroker = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    alert('Broker successfully onboarded to the performance network.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 animate-in slide-in-from-bottom-4 duration-700">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl ring-4 ring-indigo-500/5">
              <UserSquare2 size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Broker <span className="text-indigo-600 italic">Network</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Coordinate with elite real estate professionals and monitor yields.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search network..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm dark:text-slate-100 placeholder-slate-400"
              />
           </div>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-500/20 glow-primary whitespace-nowrap"
           >
             <Plus size={18} />
             <span>Add Broker</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Brokers', value: '42', icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
          { label: 'Network Yield', value: '$84,200', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Expansion Rate', value: '+14%', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl group cursor-pointer shadow-xl flex items-center gap-5 transition-transform hover:scale-[1.02]"
          >
            <div className={cn("p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110", card.bg, card.color)}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{card.label}</p>
              <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBrokers.map((broker) => (
            <motion.div
              layout
              key={broker.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-4xl p-8 shadow-2xl flex flex-col sm:flex-row gap-8 hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors dark:text-slate-400"><ExternalLink size={16} /></button>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-4xl bg-linear-to-tr from-primary to-indigo-500 p-1 mb-4 shadow-xl shadow-primary/20 group-hover:rotate-3 transition-transform duration-500">
                   <div className="w-full h-full rounded-[1.75rem] bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                      <img src={broker.avatar} alt={broker.name} className="w-full h-full object-cover" />
                   </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20 shadow-sm shadow-amber-500/5">
                  <Star size={14} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{broker.score}</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-black mb-1 dark:text-white tracking-tight">{broker.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-tight">
                    <MapPin size={14} className="text-primary" />
                    Mogadishu, Somalia
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Managed Units</p>
                    <p className="text-xl font-black dark:text-slate-100 uppercase tracking-tighter">{broker.units}</p>
                  </div>
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Avg Rating</p>
                    <p className="text-xl font-black text-amber-500 uppercase tracking-tighter">{broker.rating}</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all dark:text-slate-300 hover:text-primary dark:hover:text-primary">View Performance Profile</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Broker Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Network Expansion">
        <form onSubmit={handleAddBroker} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Professional Name</label>
            <input type="text" required placeholder="e.g. Liban Ghedi" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold dark:text-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Specialization</label>
              <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold appearance-none dark:text-slate-100">
                 <option className="bg-white dark:bg-slate-900">Residential Luxury</option>
                 <option className="bg-white dark:bg-slate-900">Commercial Portfolio</option>
                 <option className="bg-white dark:bg-slate-900">Industrial Leasing</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">License No.</label>
              <input type="text" required placeholder="LIC-9022" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold dark:text-slate-100" />
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-center">
             <Filter className="text-slate-300 dark:text-slate-600 mb-2" size={32} />
             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Commission Settings Strategy</p>
             <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Standard 5% Platform Flat Fee</p>
          </div>

          <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 glow-primary">
            Initiate Partnership
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Brokers;

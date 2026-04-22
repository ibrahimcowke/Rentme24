import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Home, 
  MoreVertical,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Trash2,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Tenants: React.FC = () => {
  const { tenants, properties, addTenant, deleteTenant } = useData();
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyId: properties[0]?.id || '',
    unit: ''
  });

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProp = properties.find(p => p.id === formData.propertyId);
    if (!selectedProp) return;

    addTenant({
      ...formData,
      propertyName: selectedProp.name
    });
    addToast(`${formData.name} successfully onboarded.`, 'success');
    setIsAddModalOpen(false);
    setFormData({ name: '', phone: '', email: '', propertyId: properties[0]?.id || '', unit: '' });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl ring-4 ring-emerald-500/5">
              <Users size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Resident <span className="text-emerald-600 NOT-italic">Network</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Managing resident relationships and lease history records.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3.5 w-72 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-xl dark:text-white text-sm font-bold"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 whitespace-nowrap glow-primary active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Onboard Resident</span>
          </button>
        </div>
      </div>

      {/* KPI Summary with Glass Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: 'Active Leases', value: '124', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
            { label: 'New Arrivals', value: '+12', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Pending Payouts', value: '$2,400', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-500/10' },
         ].map((stat, i) => (
            <motion.div key={i} variants={itemVariants} className="glass-card p-6 rounded-3xl border border-white/20 shadow-xl flex items-center gap-5 group">
               <div className={cn("p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon size={24} />
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-black dark:text-white uppercase tracking-tighter">{stat.value}</p>
               </div>
            </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredTenants.map((tenant) => (
            <motion.div
              layout
              key={tenant.id}
              variants={itemVariants}
              className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 -mr-10 -mt-10 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl glass p-1 shadow-xl group-hover:rotate-6 transition-transform duration-500">
                    <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white/10">
                       <img src={tenant.avatar} alt={tenant.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter group-hover:text-emerald-500 transition-colors dark:text-white uppercase">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1 px-3 py-1 glass rounded-lg w-fit">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Residential</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 glass rounded-2xl text-slate-400 hover:text-emerald-500 transition-all">
                   <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="p-5 glass rounded-3xl group-hover:bg-white/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 glass rounded-xl text-emerald-600">
                          <Home size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-black dark:text-slate-100">{tenant.propertyName}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit {tenant.unit}</p>
                       </div>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                      tenant.paymentStatus === 'paid' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    )}>
                      {tenant.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 glass rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                     <Phone size={16} className="text-emerald-500" />
                     <span className="text-[10px] font-black truncate dark:text-slate-300">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 glass rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                     <MessageSquare size={16} className="text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest dark:text-slate-300">Message</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        deleteTenant(tenant.id);
                        addToast("Resident offboarded successfully.", "info");
                      }}
                      className="p-3 glass text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                       <Trash2 size={18} />
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:translate-x-2 transition-all">
                       Audit History <ArrowRight size={14} />
                    </button>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{tenant.joinDate}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Tenant Modal with Glass Styling */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Provision New Resident">
        <form onSubmit={handleAddTenant} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Legal Name</label>
            <input 
              type="text" required placeholder="e.g. Hassan Ahmed" 
              value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Phone</label>
              <input 
                type="tel" required placeholder="+252..." 
                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Property</label>
              <select 
                required value={formData.propertyId} onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-white appearance-none"
              >
                {properties.map(p => <option key={p.id} value={p.id} className="bg-slate-900">{p.name}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-4.5 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all glow-primary">
            Initialize Resident Profile
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Tenants;

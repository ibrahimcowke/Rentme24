import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Home, 
  MoreVertical,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Trash2,
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl ring-4 ring-emerald-500/5">
              <Users size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Tenant <span className="text-emerald-600 italic">Registry</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Coordinate resident relationships and lease history records.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search registry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm dark:text-slate-100"
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap glow-primary"
          >
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
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl group relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-emerald-500 opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-500" />

              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-linear-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:rotate-3 transition-transform duration-500">
                    <div className="w-full h-full rounded-[1.125rem] bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900 overflow-hidden">
                       <img src={tenant.avatar} alt={tenant.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-emerald-500 transition-colors dark:text-white">{tenant.name}</h3>
                    <div className="flex items-center gap-2 mt-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-md w-fit">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Residential</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                   <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-white dark:bg-slate-900/50 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <Home size={16} className="text-emerald-600" />
                     </div>
                     <div>
                        <p className="text-xs font-black dark:text-slate-100">{tenant.propertyName}</p>
                        <p className="text-[10px] font-bold text-slate-400">Unit {tenant.unit}</p>
                     </div>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                    tenant.paymentStatus === 'paid' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-500/20" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 border-rose-100 dark:border-rose-500/20"
                  )}>
                    {tenant.paymentStatus}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 group/item hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
                     <Phone size={16} className="text-slate-400 group-hover/item:text-emerald-500 transition-colors" />
                     <span className="text-[10px] font-black truncate dark:text-slate-300">{tenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50 group/item hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
                     <Mail size={16} className="text-slate-400 group-hover/item:text-emerald-500 transition-colors" />
                     <span className="text-[10px] font-black truncate dark:text-slate-300">Email</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between relative z-10">
                 <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        deleteTenant(tenant.id);
                        addToast("Resident offboarded successfully.", "info");
                      }}
                      className="p-2.5 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    >
                       <Trash2 size={16} />
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:translate-x-1 transition-all">
                       Full Ledger <ArrowRight size={14} />
                    </button>
                 </div>
                 <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{tenant.joinDate}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Tenant Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Resident">
        <form onSubmit={handleAddTenant} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Legal Name</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Hassan Ahmed" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Primary Phone</label>
              <input 
                type="tel" 
                required 
                placeholder="+252..." 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="hassan@email.so" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Property</label>
              <select 
                required 
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold appearance-none dark:text-slate-100"
              >
                 {properties.map(p => <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900">{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Unit Number</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. 402" 
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 glow-primary">
            Onboard Resident
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Tenants;

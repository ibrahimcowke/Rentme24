import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  MoreVertical,
  LayoutGrid,
  List as ListIcon,
  Home,
  Building2,
  Store,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { MOGADISHU_DISTRICTS } from '@/constants/districts';
import Modal from '@/components/Modal';

const mockProperties = [
  { id: 1, name: "Villa Hodan", code: "HOD-001", type: "house", district: "Hodan", rent: 500, status: "occupied", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Blue Sky Apartment", code: "WAD-042", type: "apartment", district: "Wadajir", rent: 350, status: "available", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Commercial Hub", code: "XW-105", type: "office", district: "Hamar-Weyne", rent: 1200, status: "occupied", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Sunset Residence", code: "DAR-009", type: "house", district: "Darussalam", rent: 600, status: "available", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" },
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

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProperties = mockProperties.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         prop.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All Districts' || prop.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    setIsAddModalOpen(false);
    alert('Asset successfully provisioned in the registry.');
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
            <div className="p-2 bg-primary/10 text-primary rounded-xl ring-4 ring-primary/5">
              <Home size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter">Property <span className="text-primary italic">Vault</span></h1>
          </div>
          <p className="text-slate-500 font-medium">Managing assets across Mogadishu's {MOGADISHU_DISTRICTS.length} Districts.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-inner">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-2 rounded-xl transition-all", viewMode === 'grid' ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-400")}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-2 rounded-xl transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-700 text-primary shadow-md" : "text-slate-400")}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap"
          >
            <Plus size={18} />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* District Toolbar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
         <button 
           onClick={() => setSelectedDistrict('All Districts')}
           className={cn(
             "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap",
             selectedDistrict === 'All Districts' 
               ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
               : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-primary/50"
           )}
         >
           All Districts
         </button>
         {MOGADISHU_DISTRICTS.map((d) => (
            <button 
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={cn(
                "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap",
                selectedDistrict === d 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-primary/50"
              )}
            >
              {d}
            </button>
         ))}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop) => (
              <motion.div 
                layout
                key={prop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="group glass-card rounded-4xl overflow-hidden border border-white/20 dark:border-slate-800/50 shadow-2xl relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 right-6">
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border",
                      prop.status === 'occupied' ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" : "bg-primary/20 text-blue-100 border-primary/30"
                    )}>
                      {prop.status}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">{prop.code}</p>
                        <h3 className="text-xl font-black text-white tracking-tight">{prop.name}</h3>
                     </div>
                     <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
                        {prop.type === 'house' ? <Home size={18} /> : prop.type === 'office' ? <Building2 size={18} /> : <Store size={18} />}
                     </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                       <MapPin size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-bold">{prop.district}, Mogadishu</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Monthly Yield</p>
                        <p className="text-xl font-black text-primary">${prop.rent.toLocaleString()}</p>
                     </div>
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Growth Index</p>
                        <div className="flex items-center gap-2">
                           <TrendingUp size={16} className="text-emerald-500" />
                           <p className="text-xl font-black italic">+4.2%</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                     <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-100 overflow-hidden shadow-lg">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + prop.id}`} alt="User" />
                           </div>
                        ))}
                        <div className="w-10 h-10 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-md">
                           +2
                        </div>
                     </div>
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:translate-x-1 transition-all">
                        Deep Review <ArrowRight size={14} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div variants={itemVariants} className="glass-card rounded-4xl overflow-hidden border border-white/20 dark:border-slate-800/50 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Identity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Geographic Area</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Yield Stream</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Utilization</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-12 rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
                        <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">{prop.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 italic">{prop.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">{prop.district}, Mogadishu</td>
                  <td className="px-8 py-5">
                    <span className="text-lg font-black text-primary">${prop.rent.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                      prop.status === 'occupied' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Add Asset Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="New Asset Provisioning">
        <form onSubmit={handleAddAsset} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Name</label>
              <input type="text" required placeholder="e.g. Ocean View" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Unique Code</label>
              <input type="text" required placeholder="e.g. OV-101" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">District</label>
            <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold appearance-none">
               {MOGADISHU_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Type</label>
              <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold appearance-none">
                 <option value="house">Residential House</option>
                 <option value="apartment">Apartment Suite</option>
                 <option value="office">Commercial Office</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Monthly Rent ($)</label>
              <input type="number" required placeholder="450" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
            Initialize Asset
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Properties;

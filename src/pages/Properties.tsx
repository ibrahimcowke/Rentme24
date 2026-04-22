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
  Trash2,
  ShieldCheck,
  Activity,
  Users,
  Bed,
  Utensils,
  Bath
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { MOGADISHU_DISTRICTS } from '@/constants/districts';
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

const Properties: React.FC = () => {
  const { properties, addProperty, deleteProperty } = useData();
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    district: MOGADISHU_DISTRICTS[0],
    type: 'house' as 'house' | 'apartment' | 'office',
    rent: 0,
    beds: 0,
    kitchens: 0,
    toilets: 0
  });

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         prop.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All Districts' || prop.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    addProperty(formData);
    addToast(`${formData.name} successfully provisioned.`, 'success');
    setIsAddModalOpen(false);
    setFormData({ 
      name: '', 
      code: '', 
      district: MOGADISHU_DISTRICTS[0], 
      type: 'house', 
      rent: 0,
      beds: 0,
      kitchens: 0,
      toilets: 0
    });
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
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Property <span className="text-primary italic">Vault</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Managing assets across Mogadishu's {MOGADISHU_DISTRICTS.length} Districts.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filter assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm dark:text-slate-100"
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
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20 whitespace-nowrap glow-primary"
          >
            <Plus size={18} />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      {/* District Toolbar */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
         <button 
           onClick={() => setSelectedDistrict('All Districts')}
           className={cn(
             "px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap",
             selectedDistrict === 'All Districts' 
               ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 glow-primary" 
               : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-primary/50"
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
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 glow-primary" 
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-primary/50"
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
                className="group glass-card rounded-4xl overflow-hidden shadow-2xl relative"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  
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
                    <div className="p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                       <MapPin size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-bold">{prop.district}, Mogadishu</span>
                  </div>

                  {/* Residential Features */}
                  {(prop.type === 'house' || prop.type === 'apartment') && (
                    <div className="flex gap-4 p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50">
                       <div className="flex items-center gap-2">
                          <Bed size={14} className="text-primary" />
                          <span className="text-[10px] font-black dark:text-slate-200">{prop.beds || 0} Beds</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Utensils size={14} className="text-primary" />
                          <span className="text-[10px] font-black dark:text-slate-200">{prop.kitchens || 0} Kitchen</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Bath size={14} className="text-primary" />
                          <span className="text-[10px] font-black dark:text-slate-200">{prop.toilets || 0} Toilet</span>
                       </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Monthly Yield</p>
                        <p className="text-xl font-black text-primary">${prop.rent.toLocaleString()}</p>
                     </div>
                     <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100/50 dark:border-slate-800/50">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Growth Index</p>
                        <div className="flex items-center gap-2">
                           <TrendingUp size={16} className="text-emerald-500" />
                           <p className="text-xl font-black italic dark:text-slate-100">+4.2%</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => {
                            deleteProperty(prop.id);
                            addToast("Asset removed from registry.", "info");
                          }}
                          className="p-2.5 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        >
                           <Trash2 size={16} />
                        </button>
                        <button 
                          onClick={() => {
                             setSelectedProperty(prop);
                             setIsDetailModalOpen(true);
                          }}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:translate-x-1 transition-all"
                        >
                           Deep Review <ArrowRight size={14} />
                        </button>
                     </div>
                     <div className="flex -space-x-3">
                        {[1, 2].map((i) => (
                           <div key={i} className="w-10 h-10 rounded-2xl border-4 border-white dark:border-slate-900 bg-slate-100 overflow-hidden shadow-lg">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + parseInt(prop.id)}`} alt="User" />
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div variants={itemVariants} className="glass-card rounded-4xl overflow-hidden border border-white/20 dark:border-slate-800/50 shadow-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Asset Identity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Geographic Area</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Yield Stream</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Utilization</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Command</th>
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
                        <p className="font-black text-lg tracking-tight group-hover:text-primary transition-colors dark:text-slate-100">{prop.name}</p>
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
                      prop.status === 'occupied' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-500/20" : "bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-100 dark:border-blue-500/20"
                    )}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => {
                        setSelectedProperty(prop);
                        setIsDetailModalOpen(true);
                      }}
                      className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      <MoreVertical size={18} className="dark:text-slate-400 group-hover:text-inherit" />
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
              <input 
                type="text" 
                required 
                placeholder="e.g. Ocean View" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Unique Code</label>
              <input 
                type="text" 
                required 
                placeholder="e.g. OV-101" 
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">District</label>
            <select 
              required 
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold appearance-none dark:text-slate-100"
            >
               {MOGADISHU_DISTRICTS.map(d => <option key={d} value={d} className="bg-white dark:bg-slate-900">{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Type</label>
              <select 
                required 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold appearance-none dark:text-slate-100"
              >
                 <option value="house" className="bg-white dark:bg-slate-900">Residential House</option>
                 <option value="apartment" className="bg-white dark:bg-slate-900">Apartment Suite</option>
                 <option value="office" className="bg-white dark:bg-slate-900">Commercial Office</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Monthly Rent ($)</label>
              <input 
                type="number" 
                required 
                placeholder="450" 
                value={formData.rent || ''}
                onChange={(e) => setFormData({ ...formData, rent: Number(e.target.value) })}
                className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
              />
            </div>
          </div>

          {(formData.type === 'house' || formData.type === 'apartment') && (
            <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Beds</label>
                  <input 
                    type="number" 
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Kitchen</label>
                  <input 
                    type="number" 
                    value={formData.kitchens}
                    onChange={(e) => setFormData({ ...formData, kitchens: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Toilet</label>
                  <input 
                    type="number" 
                    value={formData.toilets}
                    onChange={(e) => setFormData({ ...formData, toilets: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-slate-100" 
                  />
               </div>
            </div>
          )}
          <button type="submit" className="w-full py-4 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 glow-primary">
            Initialize Asset
          </button>
        </form>
      </Modal>

      {/* Asset Deep Review Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Asset Deep Review">
        {selectedProperty && (
          <div className="space-y-8 pb-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-48 h-32 rounded-3xl overflow-hidden shadow-xl ring-4 ring-slate-100 dark:ring-slate-800">
                <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-3xl font-black tracking-tighter dark:text-white uppercase">{selectedProperty.name}</h3>
                   <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-xs",
                      selectedProperty.status === 'occupied' ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-500/20" : "bg-blue-50 dark:bg-blue-500/10 text-blue-600 border-blue-100 dark:border-blue-500/20"
                   )}>
                      {selectedProperty.status}
                   </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                   <MapPin size={14} className="text-primary" />
                   {selectedProperty.district}, Mogadishu • Code: {selectedProperty.code}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[
                 { label: 'Annual Yield', value: `$${(selectedProperty.rent * 12).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                 { label: 'Risk Profile', value: 'Low', icon: ShieldCheck, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                 { label: 'Health Score', value: '98%', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
               ].map((stat, i) => (
                 <div key={i} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm", stat.bg, stat.color)}>
                       <stat.icon size={20} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-black dark:text-white uppercase tracking-tighter">{stat.value}</p>
                 </div>
               ))}
            </div>

            {/* Residential Specifications */}
            {(selectedProperty.type === 'house' || selectedProperty.type === 'apartment') && (
              <div className="p-8 bg-slate-50 dark:bg-slate-800/80 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50 shadow-inner">
                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-6 px-1">Interior Specifications</h4>
                 <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col items-center gap-2">
                       <Bed size={24} className="text-primary" />
                       <span className="text-xl font-black dark:text-white uppercase tracking-tighter">{selectedProperty.beds || 0}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 border-x border-slate-200 dark:border-slate-700/50">
                       <Utensils size={24} className="text-primary" />
                       <span className="text-xl font-black dark:text-white uppercase tracking-tighter">{selectedProperty.kitchens || 0}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kitchen</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                       <Bath size={24} className="text-primary" />
                       <span className="text-xl font-black dark:text-white uppercase tracking-tighter">{selectedProperty.toilets || 0}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toilet</span>
                    </div>
                 </div>
              </div>
            )}

            <div className="glass-card p-6 rounded-4xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Users size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Stakeholders</p>
                     <p className="text-sm font-black dark:text-slate-100">8 Residents • 2 Brokers</p>
                  </div>
               </div>
               <div className="flex -space-x-3 pr-2">
                  {[1, 2, 3].map((i) => (
                     <div key={i} className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden shadow-md">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + parseInt(selectedProperty.id)}`} alt="User" />
                     </div>
                  ))}
               </div>
            </div>

            <div className="flex gap-4 pt-2">
               <button 
                 onClick={() => addToast('Comprehensive Property Audit generated and downloading...', 'success')}
                 className="flex-1 py-4 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all glow-primary"
               >
                  Download Full Audit
               </button>
               <button onClick={() => setIsDetailModalOpen(false)} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Close
               </button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Properties;

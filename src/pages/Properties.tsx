import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
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
  DoorOpen,
  Utensils,
  Bath,
  Edit3,
  Scale,
  Sparkles,
  X
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
  const { properties, addProperty, updateProperty, deleteProperty } = useData();
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    district: MOGADISHU_DISTRICTS[0],
    type: 'house' as 'house' | 'apartment' | 'office',
    rent: 0,
    rooms: 0,
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
    if (editingPropertyId) {
       updateProperty(editingPropertyId, formData);
       addToast(`${formData.name} updated successfully.`, 'success');
    } else {
       addProperty(formData);
       addToast(`${formData.name} successfully provisioned.`, 'success');
    }
    setIsAddModalOpen(false);
    setEditingPropertyId(null);
    setFormData({ 
      name: '', 
      code: '', 
      district: MOGADISHU_DISTRICTS[0], 
      type: 'house', 
      rent: 0,
      rooms: 0,
      kitchens: 0,
      toilets: 0
    });
  };

  const handleOpenEdit = (prop: any) => {
     setEditingPropertyId(prop.id);
     setFormData({
        name: prop.name,
        code: prop.code,
        district: prop.district,
        type: prop.type,
        rent: prop.rent,
        rooms: prop.rooms || 0,
        kitchens: prop.kitchens || 0,
        toilets: prop.toilets || 0
     });
     setIsAddModalOpen(true);
  };

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, id]);
      } else {
        addToast("Can only compare up to 3 properties", "info");
      }
    }
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
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl ring-4 ring-primary/5">
              <Home size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Property <span className="text-primary NOT-italic">Vault</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Managing assets across {MOGADISHU_DISTRICTS.length} Specialized Districts.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search properties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 w-64 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-xl dark:text-white text-sm font-bold"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={cn("p-2 rounded-xl transition-all", viewMode === 'grid' ? "bg-primary text-white shadow-lg" : "text-slate-400")}
               >
                 <LayoutGrid size={18} />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={cn("p-2 rounded-xl transition-all", viewMode === 'list' ? "bg-primary text-white shadow-lg" : "text-slate-400")}
               >
                 <ListIcon size={18} />
               </button>
            </div>
            <button 
              onClick={() => {
                setEditingPropertyId(null);
                setFormData({ name: '', code: '', district: MOGADISHU_DISTRICTS[0], type: 'house', rent: 0, rooms: 0, kitchens: 0, toilets: 0 });
                setIsAddModalOpen(true);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 glow-primary whitespace-nowrap active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              <span>Provision Asset</span>
            </button>
          </div>
        </div>
      </div>

      {/* District Toolbar with Enhanced Glass */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
         <button 
           onClick={() => setSelectedDistrict('All Districts')}
           className={cn(
             "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap",
             selectedDistrict === 'All Districts' 
               ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
               : "glass text-slate-500 dark:text-slate-400 hover:bg-white/10"
           )}
         >
           All Districts
         </button>
         {MOGADISHU_DISTRICTS.map((d) => (
            <button 
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={cn(
                "px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap",
                selectedDistrict === d 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "glass text-slate-500 dark:text-slate-400 hover:bg-white/10"
              )}
            >
              {d}
            </button>
         ))}
      </div>

      {/* Property Comparison Bar - NEW FEATURE */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-8 py-4 rounded-3xl border border-white/20 z-50 flex items-center gap-8 shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Scale className="text-primary" size={20} />
              <span className="text-xs font-black uppercase tracking-widest dark:text-white">{compareList.length} Selected for Comparison</span>
            </div>
            <div className="flex gap-2">
              {compareList.map(id => {
                const prop = properties.find(p => p.id === id);
                return (
                  <div key={id} className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary/20">
                    <img src={prop?.image} className="w-full h-full object-cover" />
                  </div>
                );
              })}
            </div>
            <button 
              className="px-6 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"
              onClick={() => addToast("Comparison Engine launching...", "info")}
            >
              Compare Assets
            </button>
            <button onClick={() => setCompareList([])} className="text-slate-400 hover:text-rose-500 transition-colors">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((prop) => (
              <motion.div 
                layout
                key={prop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => {
                   setSelectedProperty(prop);
                   setIsDetailModalOpen(true);
                }}
                className="group glass-card rounded-4xl overflow-hidden border border-white/20 shadow-2xl flex flex-col md:flex-row relative cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <span className={cn(
                      "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border",
                      prop.status === 'occupied' ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30" : "bg-primary/20 text-blue-100 border-primary/30"
                    )}>
                      {prop.status}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(prop.id);
                      }}
                      className={cn(
                        "p-2 rounded-xl backdrop-blur-md border transition-all",
                        compareList.includes(prop.id) ? "bg-primary border-primary text-white" : "bg-white/10 border-white/20 text-white"
                      )}
                    >
                      <Scale size={14} />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">{prop.code}</p>
                        <h3 className="text-2xl font-black text-white tracking-tighter">{prop.name}</h3>
                     </div>
                     <div className="p-3 glass rounded-2xl text-white">
                        {prop.type === 'house' ? <Home size={18} /> : prop.type === 'office' ? <Building2 size={18} /> : <Store size={18} />}
                     </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                    <div className="p-2 glass rounded-xl">
                       <MapPin size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-bold">{prop.district}, Mogadishu</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 glass rounded-3xl group-hover:bg-white/5 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Monthly Yield</p>
                        <p className="text-2xl font-black text-primary">${prop.rent.toLocaleString()}</p>
                     </div>
                     <div className="p-5 glass rounded-3xl group-hover:bg-white/5 transition-colors">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Health Score</p>
                        <div className="flex items-center gap-2">
                           <Activity size={16} className="text-emerald-500" />
                           <p className="text-2xl font-black italic dark:text-slate-100">98%</p>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             handleOpenEdit(prop);
                           }}
                           className="p-3 glass text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                         >
                            <Edit3 size={18} />
                         </button>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             if(confirm("Are you sure you want to remove this asset?")) {
                                deleteProperty(prop.id);
                                addToast("Asset removed from registry.", "info");
                             }
                           }}
                           className="p-3 glass text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                         >
                            <Trash2 size={18} />
                         </button>
                     </div>
                     <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           setSelectedProperty(prop);
                           setIsDetailModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:translate-x-2 transition-all"
                      >
                         Audit Report <ArrowRight size={14} />
                      </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div variants={itemVariants} className="glass-card rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl overflow-x-auto">
          {/* List View Styles remain similar but with glass classes */}
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Asset Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Geographic Area</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Yield Stream</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Utilization</th>
                <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Command</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProperties.map((prop) => (
                <tr 
                  key={prop.id} 
                  onClick={() => {
                     setSelectedProperty(prop);
                     setIsDetailModalOpen(true);
                  }}
                  className="hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <td className="px-8 py-6">
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
                  <td className="px-8 py-6 text-sm font-bold text-slate-600 dark:text-slate-400">{prop.district}</td>
                  <td className="px-8 py-6">
                    <span className="text-xl font-black text-primary">${prop.rent.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                      prop.status === 'occupied' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-primary/10 text-primary border-primary/20"
                    )}>
                      {prop.status}
                    </span>
                  </td>
                   <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEdit(prop);
                        }}
                        className="p-3 glass text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
                      >
                         <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={(e) => {
                           e.stopPropagation();
                           setSelectedProperty(prop);
                           setIsDetailModalOpen(true);
                        }}
                        className="p-3 glass text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all border border-white/10 shadow-sm"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Asset Deep Review Modal - Enhanced with Glass */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Asset Audit Analysis">
        {selectedProperty && (
          <div className="space-y-8 pb-4">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full sm:w-64 h-40 rounded-4xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <img src={selectedProperty.image} alt={selectedProperty.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                   <h3 className="text-4xl font-black tracking-tighter dark:text-white uppercase">{selectedProperty.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                   <MapPin size={14} className="text-primary" />
                   {selectedProperty.district} • {selectedProperty.code}
                </div>
                <div className="mt-6 flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl">
                    <Sparkles size={14} className="text-amber-500" />
                    <span className="text-[10px] font-black uppercase text-amber-500">Premium Listing</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-emerald-500">Verified Asset</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {[
                 { label: 'Annual Yield', value: `$${(selectedProperty.rent * 12).toLocaleString()}`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                 { label: 'Market Velocity', value: 'High', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                 { label: 'Asset Health', value: '98%', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-500/10' },
               ].map((stat, i) => (
                 <div key={i} className="p-6 glass rounded-3xl border border-white/5">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg", stat.bg, stat.color)}>
                       <stat.icon size={22} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-black dark:text-white uppercase tracking-tighter">{stat.value}</p>
                 </div>
               ))}
            </div>

            {/* Residential Specifications */}
            {(selectedProperty.type === 'house' || selectedProperty.type === 'apartment') && (
              <div className="p-8 glass rounded-[2.5rem] border border-white/10 shadow-inner">
                 <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-8 text-center">Interior Matrix</h4>
                 <div className="grid grid-cols-3 gap-8">
                    <div className="flex flex-col items-center gap-3">
                       <div className="p-4 glass rounded-2xl text-primary"><DoorOpen size={24} /></div>
                       <span className="text-2xl font-black dark:text-white">{selectedProperty.rooms || 0}</span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase">Rooms</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 border-x border-white/10">
                       <div className="p-4 glass rounded-2xl text-primary"><Utensils size={24} /></div>
                       <span className="text-2xl font-black dark:text-white">{selectedProperty.kitchens || 0}</span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase">Kitchen</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                       <div className="p-4 glass rounded-2xl text-primary"><Bath size={24} /></div>
                       <span className="text-2xl font-black dark:text-white">{selectedProperty.toilets || 0}</span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase">Toilet</span>
                    </div>
                 </div>
              </div>
            )}

            <div className="flex gap-3 pt-6">
               <button 
                 onClick={() => addToast('Comprehensive Property Audit generated...', 'success')}
                 className="flex-1 py-4.5 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all glow-primary"
               >
                  Download Audit
               </button>
               <button 
                 onClick={() => {
                    setIsDetailModalOpen(false);
                    handleOpenEdit(selectedProperty);
                 }}
                 className="px-5 py-4.5 glass text-primary rounded-3xl hover:bg-primary hover:text-white transition-all shadow-sm flex items-center justify-center tooltip-trigger"
                 title="Edit Asset"
               >
                  <Edit3 size={18} />
               </button>
               <button 
                 onClick={() => {
                    if(confirm("Are you sure you want to remove this asset?")) {
                       deleteProperty(selectedProperty.id);
                       addToast("Asset removed from registry.", "info");
                       setIsDetailModalOpen(false);
                    }
                 }}
                 className="px-5 py-4.5 glass text-rose-500 rounded-3xl hover:bg-rose-500 hover:text-white transition-all shadow-sm flex items-center justify-center tooltip-trigger"
                 title="Delete Asset"
               >
                  <Trash2 size={18} />
               </button>
               <button onClick={() => setIsDetailModalOpen(false)} className="px-8 py-4.5 glass text-slate-900 dark:text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                  Close
               </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal simplified for the example but would use similar glass styling */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => {
           setIsAddModalOpen(false);
           setEditingPropertyId(null);
        }} 
        title={editingPropertyId ? "Update Asset Intelligence" : "New Asset Provisioning"}
      >
        <form onSubmit={handleAddAsset} className="space-y-6">
           {/* Form fields with glass classes */}
           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Name</label>
              <input 
                type="text" required placeholder="e.g. Ocean View" 
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-white" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Unique Code</label>
              <input 
                type="text" required placeholder="e.g. OV-101" 
                value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-white" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">District</label>
              <select 
                required value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-white appearance-none"
              >
                {MOGADISHU_DISTRICTS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Monthly Rent ($)</label>
              <input 
                type="number" required placeholder="450" 
                value={formData.rent || ''} onChange={(e) => setFormData({ ...formData, rent: Number(e.target.value) })}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold dark:text-white" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4.5 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all glow-primary">
            {editingPropertyId ? "Update Asset" : "Initialize Asset"}
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Properties;

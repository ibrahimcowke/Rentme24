import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  LayoutGrid,
  List as ListIcon,
  Home,
  Building2,
  Store,
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
  X,
  Filter,
  DollarSign,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { MOGADISHU_DISTRICTS } from '@/constants/districts';
import Modal from '@/components/Modal';
import { useData } from '@/contexts/DataContext';
import { useToast } from '@/components/Toasts';

const Properties: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty, stats } = useData();
  const { addToast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | 'house' | 'apartment' | 'office'>('All');
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

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           prop.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = selectedDistrict === 'All' || prop.district === selectedDistrict;
      const matchesType = selectedType === 'All' || prop.type === selectedType;
      return matchesSearch && matchesDistrict && matchesType;
    });
  }, [properties, searchQuery, selectedDistrict, selectedType]);

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
        addToast("Comparison limit reached (max 3)", "info");
      }
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 px-1">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-3 glow-primary">
                <ShieldCheck className="text-white" size={30} strokeWidth={2.5} />
             </div>
             <div>
                <h1 className="text-5xl font-black tracking-tighter dark:text-white uppercase italic leading-none">Property <span className="text-blue-600 NOT-italic">Vault</span></h1>
                <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Securing & Optimizing {properties.length} High-Yield Assets</p>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
           <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner">
               <button 
                 onClick={() => setViewMode('grid')}
                 className={cn("p-2.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200")}
               >
                 <LayoutGrid size={20} />
               </button>
               <button 
                 onClick={() => setViewMode('list')}
                 className={cn("p-2.5 rounded-xl transition-all", viewMode === 'list' ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200")}
               >
                 <ListIcon size={20} />
               </button>
           </div>
           
           <button 
             onClick={() => {
               setEditingPropertyId(null);
               setFormData({ name: '', code: '', district: MOGADISHU_DISTRICTS[0], type: 'house', rent: 0, rooms: 0, kitchens: 0, toilets: 0 });
               setIsAddModalOpen(true);
             }}
             className="group flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-2xl hover:scale-[1.03] transition-all font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/20 active:scale-95 glow-primary"
           >
             <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
             <span>Acquire Asset</span>
           </button>
        </div>
      </div>

      {/* ── KPI INSIGHTS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         {[
           { label: 'Vault Valuation', value: `$${(stats.totalRevenue * 12 * 10).toLocaleString()}`, sub: 'Est. Portfolio Value', icon: DollarSign, color: 'text-emerald-500', trend: '+4.2%' },
           { label: 'Portfolio Yield', value: `$${stats.totalRevenue.toLocaleString()}`, sub: 'Monthly Cash Flow', icon: TrendingUp, color: 'text-blue-500', trend: '+1.8%' },
           { label: 'Asset Utilization', value: `${stats.occupancyRate}%`, sub: 'Current Occupancy', icon: Activity, color: 'text-amber-500', trend: 'Stable' },
           { label: 'Technical Health', value: '98.4%', sub: 'System Integrity', icon: ShieldCheck, color: 'text-purple-500', trend: 'Excellent' },
         ].map((kpi, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass-card p-6 rounded-[2.5rem] border border-white/20 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl"
           >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-3 rounded-2xl bg-white/5 shadow-inner", kpi.color)}>
                    <kpi.icon size={22} />
                 </div>
                 <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg bg-white/5 border border-white/10", kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-400')}>
                    {kpi.trend}
                 </span>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-black dark:text-white tracking-tighter uppercase italic line-clamp-1">{kpi.value}</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-1">{kpi.sub}</p>
           </motion.div>
         ))}
      </div>

      {/* ── FILTER ARCHITECTURE ── */}
      <div className="glass-card p-6 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col xl:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Query Vault Identity (Name or Code)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white placeholder-slate-500 tracking-tight"
            />
         </div>

         <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
               <Filter size={16} className="text-slate-400" />
               <select 
                 value={selectedDistrict}
                 onChange={(e) => setSelectedDistrict(e.target.value)}
                 className="bg-transparent outline-none font-bold text-sm dark:text-slate-300 min-w-[140px] appearance-none cursor-pointer"
               >
                 <option value="All" className="bg-slate-900">All Districts</option>
                 {MOGADISHU_DISTRICTS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
               </select>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl">
               <Building2 size={16} className="text-slate-400" />
               <select 
                 value={selectedType}
                 onChange={(e) => setSelectedType(e.target.value as any)}
                 className="bg-transparent outline-none font-bold text-sm dark:text-slate-300 min-w-[140px] appearance-none cursor-pointer"
               >
                 <option value="All" className="bg-slate-900">All Asset Types</option>
                 <option value="house" className="bg-slate-900">Houses</option>
                 <option value="apartment" className="bg-slate-900">Apartments</option>
                 <option value="office" className="bg-slate-900">Offices</option>
               </select>
            </div>

            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('All');
                setSelectedType('All');
              }}
              className="px-6 py-3 glass hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
            >
              Reset
            </button>
         </div>
      </div>

      {/* ── PROPERTY GRID ── */}
      <AnimatePresence mode="popLayout">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <motion.div
                layout
                key={prop.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group glass-card rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl hover:border-blue-500/50 transition-all flex flex-col relative"
              >
                {/* Visual Header */}
                <div className="relative h-72 overflow-hidden">
                  <img src={prop.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                     <span className={cn(
                       "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md border",
                       prop.status === 'occupied' ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-blue-600 text-white border-blue-500/30"
                     )}>
                        {prop.status}
                     </span>
                     <div className="flex flex-col gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleCompare(prop.id); }}
                          className={cn(
                            "p-3 rounded-xl backdrop-blur-md border transition-all",
                            compareList.includes(prop.id) ? "bg-blue-600 border-blue-500 text-white scale-110" : "bg-black/20 border-white/10 text-white hover:bg-black/40"
                          )}
                        >
                          <Scale size={16} />
                        </button>
                     </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                     <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2">{prop.code}</p>
                     <h3 className="text-3xl font-black text-white tracking-tighter leading-tight italic">{prop.name}</h3>
                     <div className="flex items-center gap-2 text-white/60 mt-2">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="text-xs font-bold">{prop.district} District</span>
                     </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 glass rounded-3xl border border-white/5 space-y-1">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Monthly Rent</p>
                         <p className="text-2xl font-black dark:text-white tracking-tighter">${prop.rent.toLocaleString()}</p>
                      </div>
                      <div className="p-5 glass rounded-3xl border border-white/5 space-y-1">
                         <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Asset Type</p>
                         <div className="flex items-center gap-2 text-blue-500">
                            {prop.type === 'house' ? <Home size={18} /> : prop.type === 'office' ? <Building2 size={18} /> : <Store size={18} />}
                            <span className="text-xs font-black uppercase italic">{prop.type}</span>
                         </div>
                      </div>
                   </div>

                   {/* Features Bar */}
                   <div className="flex items-center justify-between px-2 py-4 glass rounded-2xl border border-white/10">
                      {[
                        { icon: DoorOpen, val: prop.rooms || 0, label: 'Rooms' },
                        { icon: Utensils, val: prop.kitchens || 0, label: 'Kitchen' },
                        { icon: Bath, val: prop.toilets || 0, label: 'Toilet' },
                      ].map((feat, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1 border-r last:border-r-0 border-white/10">
                           <feat.icon size={16} className="text-slate-400" />
                           <span className="text-sm font-black dark:text-white tracking-tighter">{feat.val}</span>
                        </div>
                      ))}
                   </div>

                   <div className="flex items-center gap-3 pt-6">
                      <button 
                        onClick={() => { setSelectedProperty(prop); setIsDetailModalOpen(true); }}
                        className="flex-1 py-4 bg-white/5 hover:bg-blue-600 hover:text-white text-slate-400 dark:text-slate-200 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                         Audit Report <ArrowUpRight size={14} />
                      </button>
                      <button 
                        onClick={() => handleOpenEdit(prop)}
                        className="p-4 glass text-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                         <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm("Confirm Asset Removal?")) {
                             deleteProperty(prop.id);
                             addToast("Asset expunged from Vault.", "info");
                          }
                        }}
                        className="p-4 glass text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/5 border-b border-white/10">
                   <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Profile</th>
                   <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Yield Configuration</th>
                   <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Spec</th>
                   <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Vault Management</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/10">
                  {filteredProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-white/5 transition-all group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-6">
                             <div className="w-20 h-14 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-110 transition-transform border border-white/10">
                                <img src={prop.image} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <h4 className="text-lg font-black dark:text-white tracking-tight leading-tight">{prop.name}</h4>
                                <p className="text-[10px] font-bold text-blue-500 uppercase italic tracking-widest">{prop.code} · {prop.district}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-xl font-black text-emerald-500 tracking-tighter">${prop.rent.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Income</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4 text-slate-400">
                             <div className="flex items-center gap-1.5"><DoorOpen size={14} /><span className="text-xs font-black text-slate-200">{prop.rooms}</span></div>
                             <div className="flex items-center gap-1.5"><Utensils size={14} /><span className="text-xs font-black text-slate-200">{prop.kitchens}</span></div>
                             <div className="flex items-center gap-1.5"><Bath size={14} /><span className="text-xs font-black text-slate-200">{prop.toilets}</span></div>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-3">
                             <button 
                               onClick={() => { setSelectedProperty(prop); setIsDetailModalOpen(true); }}
                               className="p-3 glass rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                             >
                                <Maximize2 size={18} />
                             </button>
                             <button 
                               onClick={() => handleOpenEdit(prop)}
                               className="p-3 glass rounded-xl hover:bg-blue-600 hover:text-white transition-all text-blue-500"
                             >
                                <Edit3 size={18} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
          </div>
        )}
      </AnimatePresence>

      {/* ── COMPARISON BAR ── */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 glass-card px-10 py-5 rounded-[2.5rem] border border-white/20 z-50 flex items-center gap-10 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Scale size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest dark:text-white">{compareList.length} Selected Assets</p>
                <p className="text-[8px] font-bold text-slate-400">Comparing Technical Benchmarks</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {compareList.map(id => {
                const p = properties.find(prop => prop.id === id);
                return (
                  <div key={id} className="relative group">
                    <img src={p?.image} className="w-12 h-12 rounded-xl object-cover border-2 border-blue-500/20" />
                    <button 
                      onClick={() => toggleCompare(id)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform"
                    >
                      <X size={10} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
               <button 
                 onClick={() => addToast("Launching Neural Comparison Matrix...", "success")}
                 className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
               >
                 Launch Analytics
               </button>
               <button 
                 onClick={() => setCompareList([])}
                 className="p-3 text-slate-400 hover:text-rose-500 transition-colors"
               >
                 <Trash2 size={20} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AUDIT MODAL ── */}
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Intelligence Asset Audit" maxWidth="5xl">
         {selectedProperty && (
           <div className="flex flex-col lg:flex-row gap-16 pb-6">
              <div className="lg:w-[440px] space-y-10 shrink-0">
                 <div className="aspect-4/5 rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/5 relative group">
                    <img src={selectedProperty.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10">
                       <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-xl">{selectedProperty.code}</span>
                       <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">{selectedProperty.name}</h2>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] px-4">Verification Registry</h5>
                    <div className="grid grid-cols-1 gap-3">
                       <div className="flex items-center gap-4 p-5 glass rounded-4xl border border-white/5">
                          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500"><ShieldCheck size={24} /></div>
                          <div>
                             <p className="text-sm font-black dark:text-white tracking-tight uppercase italic">Identity Verified</p>
                             <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Registry ID: {selectedProperty.id.split('-')[0]}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-5 glass rounded-4xl border border-white/5">
                          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500"><Activity size={24} /></div>
                          <div>
                             <p className="text-sm font-black dark:text-white tracking-tight uppercase italic">Structural Integrity</p>
                             <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Condition: Excellent</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex-1 space-y-12">
                 {/* Performance Insights */}
                 <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Financial Matrix Performance</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="p-10 glass rounded-[3rem] border border-white/5 relative group hover:border-emerald-500/30 transition-all">
                          <div className="absolute top-6 right-8 text-emerald-500 opacity-20"><TrendingUp size={48} /></div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Projected Annual Yield</p>
                          <h4 className="text-5xl font-black text-emerald-500 italic tracking-tighter">${(selectedProperty.rent * 12).toLocaleString()}</h4>
                          <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-emerald-500/60 uppercase">
                             <Sparkles size={12} /> Optimization Active
                          </div>
                       </div>
                       <div className="p-10 glass rounded-[3rem] border border-white/5 relative group hover:border-blue-500/30 transition-all">
                          <div className="absolute top-6 right-8 text-blue-500 opacity-20"><DollarSign size={48} /></div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Market Valuation Index</p>
                          <h4 className="text-5xl font-black text-blue-500 italic tracking-tighter">${(selectedProperty.rent * 12 * 10).toLocaleString()}</h4>
                          <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-blue-500/60 uppercase italic">
                             Appraisal: Automated Model
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Configuration Architecture */}
                 <div className="space-y-6">
                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Spatial Architecture Specification</h5>
                    <div className="p-10 glass rounded-[4rem] border border-white/5 shadow-2xl relative">
                       <div className="grid grid-cols-3 gap-10">
                          {[
                            { icon: DoorOpen, val: selectedProperty.rooms || 0, label: 'Rooms' },
                            { icon: Utensils, val: selectedProperty.kitchens || 0, label: 'Kitchen' },
                            { icon: Bath, val: selectedProperty.toilets || 0, label: 'Toilet' },
                          ].map((feat, i) => (
                             <div key={i} className="flex flex-col items-center gap-6 group">
                                <div className="w-20 h-20 glass rounded-[2.5rem] flex items-center justify-center text-blue-600 transition-all group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:rotate-6">
                                   <feat.icon size={34} strokeWidth={2.5} />
                                </div>
                                <div className="text-center">
                                   <p className="text-4xl font-black dark:text-white tracking-tighter italic leading-none">{feat.val}</p>
                                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{feat.label}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-white/5">
                    <button 
                      onClick={() => addToast('System generating PDF Dossier...', 'success')}
                      className="flex-1 py-5 bg-blue-600 text-white rounded-4xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/30 hover:scale-[1.03] active:scale-95 transition-all glow-primary"
                    >
                       Download Strategic Asset PDF
                    </button>
                    <div className="flex gap-4">
                       <button 
                         onClick={() => { setIsDetailModalOpen(false); handleOpenEdit(selectedProperty); }}
                         className="px-10 py-5 glass text-blue-600 rounded-4xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 border border-white/10"
                       >
                          Edit
                       </button>
                       <button 
                         onClick={() => setIsDetailModalOpen(false)}
                         className="px-10 py-5 glass text-slate-400 rounded-4xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 border border-white/10"
                       >
                          Close
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         )}
      </Modal>

      {/* ── ACQUISITION MODAL ── */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditingPropertyId(null); }} 
        title={editingPropertyId ? "Intelligence Update" : "Asset Acquisition Registry"}
      >
        <form onSubmit={handleAddAsset} className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Asset Identity (Name)</label>
                 <input 
                   type="text" required placeholder="e.g. Royal Crown Residence" 
                   value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   className="w-full px-6 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black dark:text-white placeholder-slate-600" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Registry Code</label>
                 <input 
                   type="text" required placeholder="e.g. RC-001" 
                   value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                   className="w-full px-6 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black dark:text-white placeholder-slate-600" 
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">District Jurisdiction</label>
                 <select 
                   required value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                   className="w-full px-6 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black dark:text-white appearance-none cursor-pointer"
                 >
                   {MOGADISHU_DISTRICTS.map(d => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Yield Target (Monthly $)</label>
                 <input 
                   type="number" required placeholder="800" 
                   value={formData.rent || ''} onChange={(e) => setFormData({ ...formData, rent: Number(e.target.value) })}
                   className="w-full px-6 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-black dark:text-white placeholder-slate-600" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Asset Categorization</label>
              <div className="grid grid-cols-3 gap-3">
                 {['house', 'apartment', 'office'].map((t) => (
                   <button 
                     key={t}
                     type="button"
                     onClick={() => setFormData({ ...formData, type: t as any })}
                     className={cn(
                       "py-4 rounded-2xl border font-black text-[10px] uppercase tracking-widest transition-all italic",
                       formData.type === t ? "bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-500/20" : "glass border-white/10 text-slate-400"
                     )}
                   >
                      {t}
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-3 gap-4 p-6 glass rounded-3xl border border-white/5">
              {[
                { label: 'Rooms', key: 'rooms' },
                { label: 'Kitchen', key: 'kitchens' },
                { label: 'Toilet', key: 'toilets' },
              ].map((f) => (
                <div key={f.key} className="space-y-1">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest text-center">{f.label}</p>
                   <input 
                     type="number" 
                     value={formData[f.key as keyof typeof formData] as number || ''} 
                     onChange={(e) => setFormData({ ...formData, [f.key]: Number(e.target.value) })}
                     className="w-full bg-white/5 border border-white/10 rounded-xl py-3 text-center font-black dark:text-white outline-none focus:border-blue-500/50 transition-colors"
                   />
                </div>
              ))}
           </div>

           <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-4xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all glow-primary">
             {editingPropertyId ? "Submit Intelligence Update" : "Authorize Asset Acquisition"}
           </button>
        </form>
      </Modal>
    </div>
  );
};

export default Properties;

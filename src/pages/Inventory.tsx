import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Package, 
  Calendar, 
  Building2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useData } from '@/contexts/DataContext';
import Modal from '@/components/Modal';

const Inventory: React.FC = () => {
  const { assets, properties, addAsset, deleteAsset } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const categories = ['All', 'Furniture', 'Appliances', 'Electronics', 'Other'];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         asset.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const [formData, setFormData] = useState({
    name: '',
    propertyId: properties[0]?.id || '',
    category: 'Furniture' as any,
    condition: 'Excellent' as any,
    value: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const property = properties.find(p => p.id === formData.propertyId);
    addAsset({
      ...formData,
      propertyName: property?.name || 'Unknown',
      value: Number(formData.value)
    });
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      propertyId: properties[0]?.id || '',
      category: 'Furniture',
      condition: 'Excellent',
      value: '',
      purchaseDate: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl ring-4 ring-blue-500/5">
              <Package size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Asset <span className="text-blue-600 NOT-italic">Inventory</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Track and manage high-value equipment across your portfolio.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm dark:text-slate-100 placeholder-slate-400 font-bold text-sm"
            />
          </div>

          <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner overflow-x-auto scrollbar-hide">
             {categories.map((cat) => (
               <button 
                 key={cat}
                 onClick={() => setFilterCategory(cat)}
                 className={cn(
                   "px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap",
                   filterCategory === cat ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                 )}
               >
                 {cat}
               </button>
             ))}
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 glow-primary whitespace-nowrap active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAssets.map((asset) => (
            <motion.div
              layout
              key={asset.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 rounded-4xl border border-white/20 shadow-xl group hover:border-blue-500/30 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 glass rounded-2xl text-blue-500 shadow-inner">
                      <Package size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black dark:text-white uppercase tracking-tight">{asset.name}</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{asset.category}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteAsset(asset.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 glass rounded-xl space-y-1">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Building2 size={8} /> Property
                    </p>
                    <p className="text-xs font-black dark:text-slate-200 truncate">{asset.propertyName}</p>
                  </div>
                  <div className="p-3 glass rounded-xl space-y-1">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle size={8} /> Condition
                    </p>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg",
                      asset.condition === 'Excellent' ? "text-emerald-500 bg-emerald-500/10" :
                      asset.condition === 'Good' ? "text-blue-500 bg-blue-500/10" :
                      asset.condition === 'Fair' ? "text-amber-500 bg-amber-500/10" :
                      "text-rose-500 bg-rose-500/10"
                    )}>
                      {asset.condition}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                   <div className="flex items-center gap-2">
                      <div className="p-2 glass rounded-lg text-slate-400">
                         <Calendar size={14} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{asset.purchaseDate}</span>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Asset Value</p>
                      <p className="text-lg font-black dark:text-white">${asset.value.toLocaleString()}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredAssets.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Package size={64} className="opacity-10" />
            <div className="text-center">
              <p className="text-xl font-black uppercase tracking-widest opacity-20">No Assets Found</p>
              <p className="text-sm font-medium opacity-40">Try adjusting your search or filters.</p>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Register Technical Asset">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Asset Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Sony Bravia 55\" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Location</label>
              <select 
                required
                value={formData.propertyId}
                onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white appearance-none"
              >
                {properties.map(p => (
                  <option key={p.id} value={p.id} className="bg-slate-900">{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Category</label>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white appearance-none"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c} className="bg-slate-900">{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Condition</label>
              <select 
                required
                value={formData.condition}
                onChange={(e) => setFormData({...formData, condition: e.target.value as any})}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white appearance-none"
              >
                <option value="Excellent" className="bg-slate-900">Excellent</option>
                <option value="Good" className="bg-slate-900">Good</option>
                <option value="Fair" className="bg-slate-900">Fair</option>
                <option value="Poor" className="bg-slate-900">Poor</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Valuation ($)</label>
              <input 
                required
                type="number" 
                placeholder="0.00" 
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-bold dark:text-white" 
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4.5 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all glow-primary">
            Onboard Asset to System
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Inventory;

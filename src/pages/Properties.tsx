import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Home, 
  Building, 
  Store, 
  MoreVertical,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { cn } from '../utils/cn';

const districts = [
  "Hodan", "Wadajir", "Dayniile", "Heliwaa", "Yaqshiid", "Karaan", "Shangaani", "Abdulaziz", "Bondhere", "Xamar Weyne", "Xamar Jajab"
];

const propertyTypes = [
  { id: 'house', label: 'House', icon: Home },
  { id: 'apartment', label: 'Apartment', icon: Building },
  { id: 'office', label: 'Office', icon: Building },
  { id: 'shop', label: 'Shop', icon: Store },
];

const mockProperties = [
  { id: 1, name: "Villa Hodan", code: "HOD-001", type: "house", district: "Hodan", rent: 500, status: "occupied", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Blue Sky Apartment", code: "WAD-042", type: "apartment", district: "Wadajir", rent: 350, status: "available", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Commercial Hub", code: "XW-105", type: "office", district: "Xamar Weyne", rent: 1200, status: "occupied", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" },
];

const Properties: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search properties by name, code, or area..." 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={cn("p-1.5 rounded-lg transition-all", viewMode === 'grid' ? "bg-slate-100 dark:bg-slate-800 text-primary" : "text-slate-400")}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn("p-1.5 rounded-lg transition-all", viewMode === 'list' ? "bg-slate-100 dark:bg-slate-800 text-primary" : "text-slate-400")}
            >
              <ListIcon size={20} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
            <Plus size={18} />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProperties.map((prop) => (
            <div key={prop.id} className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-800">
              <div className="relative h-48">
                <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg",
                    prop.status === 'occupied' ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                  )}>
                    {prop.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{prop.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">ID: {prop.code}</p>
                  </div>
                  <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm mb-4">
                  <MapPin size={16} className="text-primary" />
                  <span>{prop.district}, Mogadishu</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs text-slate-500">Monthly Rent</p>
                    <p className="font-bold text-lg text-primary">${prop.rent}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + prop.id}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                      +1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Property</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">District</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Rent</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockProperties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={prop.image} alt={prop.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold">{prop.name}</p>
                        <p className="text-xs text-slate-500">{prop.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{prop.district}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">${prop.rent}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      prop.status === 'occupied' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Properties;

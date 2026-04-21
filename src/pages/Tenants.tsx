import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  MoreVertical,
  Calendar,
  CheckCircle,
  Home
} from 'lucide-react';


const mockTenants = [
  { 
    id: 1, 
    name: "Ali Omar Gure", 
    phone: "+252 61 555 1234", 
    email: "ali.gure@email.com", 
    property: "Villa Hodan", 
    status: "active", 
    paid_until: "2026-05-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali" 
  },
  { 
    id: 2, 
    name: "Hafsa Ahmed", 
    phone: "+252 61 777 9876", 
    email: "hafsa.a@email.com", 
    property: "Blue Sky Apt - 302", 
    status: "late", 
    paid_until: "2026-04-01",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hafsa" 
  },
  { 
    id: 3, 
    name: "Mohamed Farah", 
    phone: "+252 61 888 2211", 
    email: "m.farah@email.com", 
    property: "Commercial Hub - B12", 
    status: "active", 
    paid_until: "2026-06-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed" 
  },
];

const Tenants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search tenants by name, phone, or property..." 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
          <Plus size={18} />
          <span>New Tenant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockTenants.map((tenant) => (
          <div key={tenant.id} className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center p-1 overflow-hidden border border-blue-100 dark:border-blue-800">
                  <img src={tenant.avatar} alt={tenant.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tenant.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CheckCircle size={14} className={tenant.status === 'active' ? "text-green-500" : "text-amber-500"} />
                    <span className="uppercase font-bold tracking-wider">{tenant.status}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <MoreVertical size={18} />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500">
                  <Phone size={16} />
                </div>
                <a href={`tel:${tenant.phone}`} className="font-medium hover:text-primary transition-colors">{tenant.phone}</a>
                <a href={`https://wa.me/${tenant.phone.replace(/\+/g, '')}`} className="p-1.5 bg-green-500/10 text-green-600 rounded-lg ml-auto">
                    <MessageSquare size={16} />
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500">
                  <Mail size={16} />
                </div>
                <span className="font-medium">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-500">
                   <Home size={16} />
                </div>
                <span className="font-medium">{tenant.property}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-slate-400" />
                <div className="text-xs">
                  <p className="text-slate-500">Paid Until</p>
                  <p className="font-bold">{new Date(tenant.paid_until).toLocaleDateString()}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tenants;

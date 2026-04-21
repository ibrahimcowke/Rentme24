import React from 'react';
import { 
  Building, 
  MapPin, 
  Globe, 
  Shield, 
  Bell, 
  Palette, 
  Trash2,
  Save,
  Languages
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

const Settings: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-slate-500">Manage your company profile, localization, and security.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {[
            { icon: Building, label: 'Company Profile' },
            { icon: Globe, label: 'Localization' },
            { icon: Palette, label: 'Theme & Appearance' },
            { icon: Bell, label: 'Notifications' },
            { icon: Shield, label: 'Security' },
            { icon: Trash2, label: 'Danger Zone', danger: true },
          ].map((item, i) => (
            <button 
              key={i}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                i === 0 ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-primary" : "text-slate-500 hover:bg-white/50 dark:hover:bg-slate-900/50",
                item.danger && "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* General Section */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6">General Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Name</label>
                  <input type="text" defaultValue="RentFlow Pro" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Business ID</label>
                  <input type="text" defaultValue="RF-MOG-001" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Operating Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-slate-400" size={18} />
                  <input type="text" defaultValue="Maka al Mukarama Road, Hodan, Mogadishu" className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Localization Section */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Localization</h3>
              <Languages size={20} className="text-primary" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">System Language</p>
                  <p className="text-xs text-slate-500">Toggle between English and Somali interface.</p>
                </div>
                <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button 
                    onClick={() => i18n.changeLanguage('en')}
                    className={cn("px-4 py-1.5 rounded-lg text-sm font-bold transition-all", i18n.language === 'en' ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500")}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => i18n.changeLanguage('so')}
                    className={cn("px-4 py-1.5 rounded-lg text-sm font-bold transition-all", i18n.language === 'so' ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-slate-500")}
                  >
                    Somali
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Currency Display</p>
                  <p className="text-xs text-slate-500">Primary currency used for payments.</p>
                </div>
                <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm font-bold px-4 py-2">
                  <option>USD ($)</option>
                  <option>SOS (Sh.So)</option>
                </select>
              </div>
            </div>
          </div>

           {/* Broker Settings */}
           <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-lg mb-6">Broker Commission</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium">Default Commission Rate</p>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="5" className="w-20 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary outline-none" />
                  <span className="font-bold text-slate-500">%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 max-w-[200px]">This is the standard percentage paid to brokers for new lease agreements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

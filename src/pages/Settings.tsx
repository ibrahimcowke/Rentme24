import React, { useState } from 'react';
import { 
  Building, 
  Globe, 
  Shield, 
  Bell, 
  Palette, 
  Trash2,
  Save,
  Languages,
  Leaf,
  Crown,
  Moon,
  Sun,
  Flame
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import { useTheme } from '@/contexts/ThemeContext';
import type { ThemeType } from '@/contexts/ThemeContext';

const Settings: React.FC = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('theme');

  const themes: { id: ThemeType; label: string; icon: any; color: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Vault', icon: Sun, color: 'bg-blue-600', desc: 'Standard business trust interface' },
    { id: 'forest', label: 'Forest Wild', icon: Leaf, color: 'bg-emerald-600', desc: 'Serene greenery for calm management' },
    { id: 'royal', label: 'Royal Legacy', icon: Crown, color: 'bg-purple-600', desc: 'Elegant purple & gold high-tier ui' },
    { id: 'sunset', label: 'Sunset Horizon', icon: Flame, color: 'bg-orange-500', desc: 'Warm gradients for evening audits' },
    { id: 'midnight', label: 'Midnight Ops', icon: Moon, color: 'bg-slate-900', desc: 'Tethered shadows for deep focus' },
  ];

  return (
    <div className="max-w-6xl space-y-10 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic">System <span className="text-primary italic">Command</span></h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Managing global configurations and security protocols.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 glow-primary active:scale-95">
          <Save size={18} />
          <span>Commit Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: Building, label: 'Company Profile', id: 'profile' },
            { icon: Palette, label: 'Appearance', id: 'theme' },
            { icon: Globe, label: 'Localization', id: 'local' },
            { icon: Bell, label: 'Notifications', id: 'notify' },
            { icon: Shield, label: 'Security', id: 'security' },
            { icon: Trash2, label: 'Danger Zone', id: 'danger', danger: true },
          ].map((item, i) => (
            <button 
              key={i}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest",
                activeTab === item.id 
                  ? (item.danger ? "bg-rose-500 text-white shadow-xl glow-primary" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-primary")
                  : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-900/50",
                item.danger && activeTab !== item.id && "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 border-transparent hover:border-rose-500/20 border"
              )}
            >
              <item.icon size={20} strokeWidth={2.5} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Company Profile Section */}
          {activeTab === 'profile' && (
            <div className="glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
              <h3 className="text-xl font-black dark:text-white italic mb-2">Company Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Update your business information and operational details.</p>
              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center text-slate-400">
                <Building size={48} className="mb-4 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest">Profile Configuration coming soon</p>
              </div>
            </div>
          )}

          {/* Appearance Section */}
          {activeTab === 'theme' && (
            <div className="glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 text-slate-100 dark:text-slate-800/10 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
               <Palette size={120} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-xl font-black mb-2 dark:text-white italic">Atmospheric Environment</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">Select a global visual preset to match your current operational focus.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {themes.map((t) => (
                   <button
                     key={t.id}
                     onClick={() => setTheme(t.id)}
                     className={cn(
                       "flex items-center gap-5 p-6 rounded-4xl border-2 transition-all text-left relative overflow-hidden group/theme",
                       theme === t.id 
                         ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
                         : "border-slate-100 dark:border-slate-800 hover:border-primary/30 bg-white dark:bg-slate-900"
                     )}
                   >
                     <div className={cn(
                       "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                       theme === t.id ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover/theme:bg-primary/10 group-hover/theme:text-primary"
                     )}>
                        <t.icon size={24} />
                     </div>
                     <div className="flex-1">
                        <p className={cn("text-xs font-black uppercase tracking-widest", theme === t.id ? "text-primary" : "text-slate-600 dark:text-slate-200")}>{t.label}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{t.desc}</p>
                     </div>
                     <div className={cn("absolute bottom-0 right-0 w-12 h-12 translate-x-4 translate-y-4 opacity-10", t.color)} />
                   </button>
                 ))}
              </div>

              <div className="p-6 bg-slate-100 dark:bg-slate-950/50 rounded-3xl border border-slate-200 dark:border-slate-800/50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center">
                       <Palette size={20} />
                    </div>
                    <div>
                       <p className="text-sm font-black dark:text-slate-100 uppercase tracking-tighter">Current Schema</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{theme.toUpperCase()} - ALPHA PROTOCOL</p>
                    </div>
                 </div>
                 <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest">Active</div>
              </div>
            </div>
          </div>
          )}

          {/* Localization Section */}
          {activeTab === 'local' && (
            <div className="glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black dark:text-white italic">Localization</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">Synchronize regional linguistic preferences.</p>
              </div>
              <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                 <Languages size={24} />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                <div>
                  <p className="text-sm font-black dark:text-slate-100">Interface Vocabulary</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select operational language</p>
                </div>
                <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-inner border border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => i18n.changeLanguage('en')}
                    className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", i18n.language === 'en' ? "bg-primary text-white shadow-xl glow-primary" : "text-slate-400 hover:text-slate-600")}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => i18n.changeLanguage('so')}
                    className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", i18n.language === 'so' ? "bg-primary text-white shadow-xl glow-primary" : "text-slate-400 hover:text-slate-600")}
                  >
                    Somali
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                <div>
                  <p className="text-sm font-black dark:text-slate-100">Currency Protocol</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard financial unit display</p>
                </div>
                <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest px-6 py-3 outline-none focus:ring-4 focus:ring-primary/10 transition-all dark:text-slate-100">
                  <option className="bg-white dark:bg-slate-900">USD ($) - International</option>
                  <option className="bg-white dark:bg-slate-900">SOS (Sh.So) - National</option>
                </select>
              </div>
            </div>
          </div>
          )}

          {/* Notifications Section */}
          {activeTab === 'notify' && (
            <div className="glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
              <h3 className="text-xl font-black dark:text-white italic mb-2">Notifications</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Manage alert preferences and system communications.</p>
              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center text-slate-400">
                <Bell size={48} className="mb-4 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest">Notification Channels coming soon</p>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeTab === 'security' && (
            <div className="glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
              <h3 className="text-xl font-black dark:text-white italic mb-2">Security</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Enforce access controls and monitor security events.</p>
              <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50 flex flex-col items-center justify-center text-slate-400">
                <Shield size={48} className="mb-4 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-widest">Access Controls coming soon</p>
              </div>
            </div>
          )}

          {/* Danger Zone Section */}
          {activeTab === 'danger' && (
            <div className="glass-card p-10 rounded-[3rem] border border-rose-500/20 bg-rose-500/5 shadow-2xl">
              <h3 className="text-xl font-black text-rose-500 italic mb-2">Danger Zone</h3>
              <p className="text-xs text-rose-500/70 font-medium">Irreversible destructive actions and system resets.</p>
              <div className="mt-8 space-y-4">
                 <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/20 flex items-center justify-between">
                    <div>
                       <p className="text-sm font-black dark:text-slate-100">Purge Operational Cache</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Clears temporary storage and state</p>
                    </div>
                    <button className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Clear Cache</button>
                 </div>
                 <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-rose-500/20 flex items-center justify-between">
                    <div>
                       <p className="text-sm font-black dark:text-slate-100">Reset System Settings</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revert to factory configurations</p>
                    </div>
                    <button className="px-6 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 glow-primary">Reset All</button>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

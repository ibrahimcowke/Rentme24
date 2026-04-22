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
  Languages,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/utils/cn';
import { useTheme } from '@/contexts/ThemeContext';

const Settings: React.FC = () => {
  const { i18n } = useTranslation();
  const { mode, setMode, colorTheme, setColorTheme } = useTheme();

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
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest",
                i === 1 
                  ? "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-primary" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-900/50",
                item.danger && "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 border-transparent hover:border-rose-500/20 border"
              )}
            >
              <item.icon size={20} strokeWidth={2.5} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Appearance Section */}
          <div className="glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 text-slate-100 dark:text-slate-800 pointer-events-none group-hover:rotate-12 transition-transform duration-700">
               <Palette size={120} />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-xl font-black mb-2 dark:text-white italic">Theme Architecture</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-tight">Toggle the global visual environment of the GuriFlow platform.</p>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Visual Mode</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'light', icon: Sun, label: 'Solar' },
                      { id: 'dark', icon: Moon, label: 'Obsidian' },
                      { id: 'system', icon: Monitor, label: 'Mirror' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setMode(t.id as any)}
                        className={cn(
                          "flex flex-col items-center gap-4 p-6 rounded-4xl border-2 transition-all group/btn",
                          mode === t.id 
                            ? "bg-primary/5 border-primary text-primary shadow-lg shadow-primary/10" 
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 text-slate-400 hover:border-primary/30"
                        )}
                      >
                        <div className={cn(
                          "p-4 rounded-2xl transition-all",
                          mode === t.id ? "bg-primary text-white" : "bg-white dark:bg-slate-900 group-hover/btn:bg-primary/10"
                        )}>
                            <t.icon size={24} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Design Language</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { id: 'default', label: 'Corporate', color: 'bg-blue-600' },
                      { id: 'royal', label: 'Royal', color: 'bg-purple-600' },
                      { id: 'emerald', label: 'Emerald', color: 'bg-emerald-600' },
                      { id: 'rose', label: 'Rose', color: 'bg-rose-600' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setColorTheme(t.id as any)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                          colorTheme === t.id 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-100 dark:border-slate-800/50 hover:border-primary/30 text-slate-500 dark:text-slate-400"
                        )}
                      >
                         <div className={cn("w-6 h-6 rounded-lg shadow-inner", t.color)} />
                         <span className="text-[10px] font-black uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-sm font-black dark:text-slate-100">Motion Reduction</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Optimize interface for stability</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 dark:bg-slate-800 rounded-full p-1 flex justify-start cursor-pointer transition-all">
                       <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Localization Section */}
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

          {/* Company Section */}
          <div className="glass-card p-10 rounded-[3rem] border border-white/20 dark:border-slate-800/50 shadow-2xl">
            <h3 className="text-xl font-black mb-8 dark:text-white italic">Entity Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Registry Name</label>
                   <input type="text" defaultValue="GuriFlow Global Ltd" className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-sm dark:text-slate-100" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Tax Identity</label>
                   <input type="text" defaultValue="SO-99281-FLOW" className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-sm dark:text-slate-100" />
                </div>
                <div className="sm:col-span-2 space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Global HQ</label>
                   <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" defaultValue="Diplomatic Wing, Maka Al-Mukarama, Mogadishu" className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black text-sm dark:text-slate-100" />
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

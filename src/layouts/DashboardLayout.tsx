import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  Wrench,
  UserSquare2,
  BarChart3,
  Globe,
  ChevronRight,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'common.dashboard', path: '/' },
  { icon: Building2, label: 'common.properties', path: '/properties' },
  { icon: Users, label: 'common.tenants', path: '/tenants' },
  { icon: CreditCard, label: 'common.payments', path: '/payments' },
  { icon: Wrench, label: 'common.maintenance', path: '/maintenance' },
  { icon: UserSquare2, label: 'common.brokers', path: '/brokers' },
  { icon: BarChart3, label: 'common.reports', path: '/reports' },
  { icon: Settings, label: 'common.settings', path: '/settings' },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'so' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-[#060810] text-slate-900 dark:text-slate-100 flex overflow-hidden font-inter transition-colors duration-500">
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 transform transition-all duration-500 ease-in-out bg-white dark:bg-[#0B1120] border-r border-slate-200 dark:border-slate-800/50",
          isSidebarOpen ? "w-72" : "w-20 -translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-24 flex items-center px-6 border-b border-slate-100 dark:border-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 rotate-3 transition-transform cursor-pointer">
                <Building2 className="text-white" size={24} />
              </div>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col"
                >
                  <span className="text-xl font-black tracking-tight text-gradient">GuriFlow</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 -mt-1">Pro Manager</span>
                </motion.div>
              )}
            </div>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center h-12 rounded-2xl transition-all duration-300 relative group",
                  location.pathname === item.path 
                    ? "bg-slate-100 dark:bg-slate-800/50 text-primary shadow-sm" 
                    : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full"
                  />
                )}
                <div className={cn(
                  "flex items-center justify-center transition-all duration-300",
                  isSidebarOpen ? "w-14" : "w-full"
                )}>
                  <item.icon size={22} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                </div>
                {isSidebarOpen && (
                  <span className={cn(
                    "font-bold text-sm transition-all duration-300",
                    location.pathname === item.path ? "translate-x-1" : "group-hover:translate-x-1"
                  )}>
                    {t(item.label)}
                  </span>
                )}
                {isSidebarOpen && location.pathname === item.path && (
                  <ChevronRight size={14} className="ml-auto mr-4 opacity-50" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 space-y-2 border-t border-slate-100 dark:border-slate-800/50">
            <button 
              onClick={toggleLanguage}
              className="w-full h-12 flex items-center gap-3 px-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all group"
            >
              <div className="w-6 flex justify-center">
                 <Globe size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              {isSidebarOpen && <span className="text-sm font-bold text-slate-500">{i18n.language.toUpperCase()} | Somaali</span>}
            </button>
            <button className="w-full h-12 flex items-center gap-3 px-4 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/10 text-rose-500 transition-all group">
              <div className="w-6 flex justify-center">
                 <LogOut size={20} />
              </div>
              {isSidebarOpen && <span className="text-sm font-bold">{t('common.logout')}</span>}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-primary/5 blur-[120px] pointer-events-none -z-10" />

        <header className="h-20 flex items-center justify-between px-8 sticky top-0 bg-white/70 dark:bg-[#060810]/70 backdrop-blur-xl z-30 border-b border-slate-100 dark:border-slate-800/50">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <nav className="hidden sm:flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                 <span>Vault</span>
                 <ChevronRight size={12} />
                 <span className="text-slate-900 dark:text-slate-100">
                    {location.pathname === '/' ? 'Intelligence' : location.pathname.substring(1)}
                 </span>
              </nav>
           </div>

           <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-slate-500"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/20">
                 <Sparkles size={14} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-wider">Sync Active</span>
              </div>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800/50">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-black tracking-tight">Abdi Ahmed</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master Associate</p>
                 </div>
                 <div className="w-10 h-10 rounded-[14px] bg-linear-to-tr from-primary to-indigo-500 p-0.5 shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-[12px] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abdi" alt="User" />
                    </div>
                 </div>
              </div>
           </div>
        </header>

        <div className="p-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {children}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

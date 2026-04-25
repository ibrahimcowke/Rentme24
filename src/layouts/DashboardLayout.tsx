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
  Bell,
  Search,
  MessageSquare,
  AlertCircle,
  Folder,
  Calendar as CalendarIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useData } from '@/contexts/DataContext';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'common.dashboard', path: '/' },
  { icon: Building2, label: 'common.properties', path: '/properties' },
  { icon: Users, label: 'common.tenants', path: '/tenants' },
  { icon: CreditCard, label: 'common.payments', path: '/payments' },
  { icon: MessageSquare, label: 'common.communication', path: '/communication' },
  { icon: Folder, label: 'common.documents', path: '/documents' },
  { icon: CalendarIcon, label: 'common.calendar', path: '/calendar' },
  { icon: Wrench, label: 'common.maintenance', path: '/maintenance' },
  { icon: UserSquare2, label: 'common.brokers', path: '/brokers' },
  { icon: BarChart3, label: 'common.reports', path: '/reports' },
  { icon: Settings, label: 'common.settings', path: '/settings' },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { stats } = useData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // On mobile, we start with the mini sidebar for that landscape feel
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'so' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 flex overflow-hidden font-inter transition-colors duration-500 relative">
      {/* Animated Mesh Background */}
      <div className="bg-mesh" />



      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-all duration-500 ease-in-out glass dark:bg-black/40 border-r border-white/20 dark:border-white/5",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-24 flex items-center px-6 border-b border-white/10">
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
                  <span className="text-lg font-black tracking-tighter uppercase italic leading-none">Guri<span className="text-primary italic">Flow</span></span>
                  <span className="text-[8px] font-black tracking-[0.2em] text-slate-400 uppercase">Pro Network</span>
                </motion.div>
              )}
            </div>
            {isMobile && isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(false)} className="ml-auto p-2 text-slate-400">
                <X size={20} />
              </button>
            )}
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group relative h-14 flex items-center rounded-2xl transition-all duration-300",
                  location.pathname === item.path 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 glow-primary" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-white/10"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                {isSidebarOpen && item.path === '/maintenance' && stats.activeMaintenance > 0 && (
                  <span className="ml-auto mr-4 px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-rose-500/20">
                    {stats.activeMaintenance}
                  </span>
                )}
                {isSidebarOpen && location.pathname === item.path && item.path !== '/maintenance' && (
                  <ChevronRight size={14} className="ml-auto mr-4 opacity-50" />
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 space-y-2 border-t border-white/10">
            <button 
              onClick={toggleLanguage}
              className="w-full h-12 flex items-center gap-3 px-4 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="w-6 flex justify-center">
                 <Globe size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              {isSidebarOpen && <span className="text-sm font-bold text-slate-500">{i18n.language.toUpperCase()} | Somaali</span>}
            </button>
            <button className="w-full h-12 flex items-center gap-3 px-4 rounded-2xl hover:bg-rose-500/10 text-rose-500 transition-all group">
              <div className="w-6 flex justify-center">
                 <LogOut size={20} />
              </div>
              {isSidebarOpen && <span className="text-sm font-bold">{t('common.logout')}</span>}
            </button>
          </div>
        </div>
      </aside>

      <main 
        className={cn(
          "flex-1 flex flex-col relative h-screen overflow-y-auto transition-all duration-500",
          isSidebarOpen ? "pl-72" : "pl-20"
        )}
      >
        <header className="h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 bg-white/40 dark:bg-black/40 backdrop-blur-2xl z-30 border-b border-white/10">
           <div className="flex items-center gap-6 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 glass rounded-xl hover:bg-white/20 transition-all"
              >
                <Menu size={20} />
              </button>
              
              <div className="hidden lg:flex items-center gap-3 px-4 py-2 glass rounded-2xl w-full max-w-md">
                <Search size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search properties, tenants, or records..." 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                 <Sparkles size={14} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Network Active</span>
              </div>

              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 glass rounded-xl hover:bg-white/20 transition-all"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" alt="User" />
              </div>
           </div>
        </header>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-24 right-8 w-80 glass-card rounded-3xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold">Notifications</h3>
                <span className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary rounded-full font-bold">4 NEW</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-2">
                {[
                  { icon: CreditCard, title: 'Rent Payment', desc: 'Unit 4B paid $1,200', time: '2m ago', color: 'text-emerald-500' },
                  { icon: Wrench, title: 'Maintenance', desc: 'New request for Leakage', time: '1h ago', color: 'text-amber-500' },
                  { icon: AlertCircle, title: 'Contract Expiring', desc: 'Tenant Sarah in 15 days', time: '3h ago', color: 'text-rose-500' },
                  { icon: Users, title: 'New Tenant', desc: 'Verified John Doe', time: '5h ago', color: 'text-blue-500' },
                ].map((n, i) => (
                  <div key={i} className="p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3">
                    <div className={cn("p-2 rounded-xl bg-white/5", n.color)}>
                      <n.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{n.title}</p>
                      <p className="text-xs text-slate-400">{n.desc}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full p-4 text-center text-xs font-bold text-primary hover:bg-white/5 transition-colors border-t border-white/10">
                View All Notifications
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

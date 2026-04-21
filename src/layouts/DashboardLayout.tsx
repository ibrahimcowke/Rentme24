import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  LogOut,
  Wrench,
  UserSquare2,
  BarChart3,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';

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
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'so' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "glass-card fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 border-r border-slate-200 dark:border-slate-800 m-4 rounded-2xl",
          !isSidebarOpen && "-translate-x-full md:w-20"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 px-2">
            <h1 className={cn("text-2xl font-bold text-gradient", !isSidebarOpen && "hidden")}>RentFlow</h1>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl transition-all duration-200 group",
                  location.pathname === item.path 
                    ? "bg-primary text-white shadow-lg shadow-primary/30" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
              >
                <item.icon size={22} className={cn(location.pathname === item.path ? "text-white" : "group-hover:text-primary")} />
                {isSidebarOpen && <span className="ml-3 font-medium">{t(item.label)}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 group"
            >
              <Globe size={22} className="group-hover:text-primary" />
              {isSidebarOpen && <span className="ml-3 font-medium">{i18n.language.toUpperCase()} | Somali</span>}
            </button>
            <button className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 group">
              <LogOut size={22} />
              {isSidebarOpen && <span className="ml-3 font-medium">{t('common.logout')}</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {new Date().toLocaleDateString(i18n.language === 'so' ? 'so-SO' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <h1 className="text-3xl font-bold tracking-tight">
              {location.pathname === '/' ? t('dashboard.welcome') : t(`common.${location.pathname.substring(1)}`)}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
               <button className="p-3 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
               </button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full premium-gradient p-0.5">
                <img 
                   src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                   alt="Avatar" 
                   className="w-full h-full rounded-full bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800"
                />
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

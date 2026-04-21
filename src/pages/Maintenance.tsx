import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  MapPin,
  User,
  ArrowRight,
  Building2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const tickets = [
  { id: 'TIC-001', title: 'Leaking Pipe', property: 'Villa Hodan', unit: 'B-402', tenant: 'Ali Omar', priority: 'critical', status: 'pending', date: '2024-03-20', description: 'Water leaking from kitchen sink.' },
  { id: 'TIC-002', title: 'AC Not Working', property: 'Blue Sky Apt', unit: '302', tenant: 'Hafsa Ahmed', priority: 'high', status: 'in-progress', date: '2024-03-19', description: 'The AC unit in the master bedroom is not cooling.' },
  { id: 'TIC-003', title: 'Broken Window', property: 'Commercial Hub', unit: '10', tenant: 'Khalid Yusuf', priority: 'medium', status: 'completed', date: '2024-03-18', description: 'Window pane shattered during storm.' },
  { id: 'TIC-004', title: 'Light Flicker', property: 'Villa Hodan', unit: 'A-101', tenant: 'Zahra Hassan', priority: 'low', status: 'pending', date: '2024-03-17', description: 'Hallway light flickers constantly.' },
];

const priorityColors = {
  critical: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  medium: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  low: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

const statusIcons = {
  pending: Clock,
  'in-progress': Activity,
  completed: CheckCircle2,
};

const Maintenance: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-xl ring-4 ring-primary/5">
              <Wrench size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Maintenance <span className="text-primary italic">Vault</span></h1>
          </div>
          <p className="text-slate-500 font-medium">Manage and monitor all facility requests in real-time.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
            <Plus size={18} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl w-fit border border-slate-200/50 dark:border-slate-800/50">
        {(['all', 'pending', 'in-progress', 'completed'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              filter === s 
                ? "bg-white dark:bg-slate-800 text-primary shadow-sm" 
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTickets.map((ticket) => (
            <motion.div
              layout
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-6 rounded-[2rem] border border-white/20 dark:border-slate-800/50 shadow-2xl relative group overflow-hidden"
            >
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-500",
                ticket.priority === 'critical' ? 'bg-rose-500' : 'bg-primary'
              )} />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{ticket.id}</span>
                  <h3 className="font-black text-lg group-hover:text-primary transition-colors">{ticket.title}</h3>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm",
                  priorityColors[ticket.priority as keyof typeof priorityColors]
                )}>
                  {ticket.priority}
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{ticket.property}</p>
                    <p className="text-[10px] font-medium italic">Unit {ticket.unit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold">{ticket.tenant}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 italic">{ticket.date}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    ticket.status === 'completed' ? 'bg-emerald-500' : ticket.status === 'in-progress' ? 'bg-blue-500' : 'bg-amber-500'
                  )} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{ticket.status}</span>
                </div>
                <button className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Maintenance;

import React, { useState } from 'react';
import { 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Hammer,
  ArrowRight,
  Filter,
  Wrench,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import Modal from '@/components/Modal';

const tickets = [
  { id: 'TKT-101', property: 'Villa Hodan', issue: 'Leaking pipe in kitchen', priority: 'high', status: 'pending', date: '2h ago', technician: 'Ahmed' },
  { id: 'TKT-102', property: 'Blue Sky Apt', issue: 'AC unit not functional', priority: 'medium', status: 'in-progress', date: '5h ago', technician: 'Mohamed' },
  { id: 'TKT-103', property: 'Commercial Hub', issue: 'elevator inspection', priority: 'low', status: 'completed', date: 'Yesterday', technician: 'Yasin' },
];

const Maintenance: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    alert('Support ticket successfully dispatched to the technician pool.');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl ring-4 ring-amber-500/5">
              <Wrench size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Maintenance <span className="text-amber-600 NOT-italic">Grid</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Coordinate support requests and technical asset servicing.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner">
             {['all', 'pending', 'in-progress', 'completed'].map((f) => (
               <button 
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={cn(
                   "px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap",
                   filter === f ? "bg-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200"
                 )}
               >
                 {f.replace('-', ' ')}
               </button>
             ))}
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3.5 bg-amber-600 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 glow-primary whitespace-nowrap active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredTickets.map((ticket) => (
              <motion.div
                layout
                key={ticket.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col md:flex-row gap-8 group hover:border-amber-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors" />

                <div className="flex-1 space-y-4 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ticket.id}</span>
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm",
                        ticket.priority === 'high' ? "bg-rose-500/10 text-rose-500 border-rose-500/20" :
                        ticket.priority === 'medium' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}>
                        {ticket.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 glass px-3 py-1 rounded-full">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{ticket.date}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black group-hover:text-amber-600 transition-colors dark:text-white uppercase tracking-tighter">{ticket.issue}</h3>
                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="p-2 glass rounded-xl text-amber-500">
                        <AlertCircle size={16} />
                      </div>
                      <span className="font-bold dark:text-slate-200">{ticket.property}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-2 glass rounded-xl text-slate-400">
                        <Hammer size={16} />
                      </div>
                      <span className="font-bold dark:text-slate-200 uppercase tracking-widest text-[10px]">Tech: {ticket.technician}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 relative z-10">
                   <div className={cn(
                     "px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg border",
                     ticket.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                     ticket.status === 'in-progress' ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                     "bg-amber-500/10 text-amber-600 border-amber-500/20"
                   )}>
                      {ticket.status === 'completed' && <CheckCircle2 size={14} />}
                      {ticket.status}
                   </div>
                   <button className="p-4 glass rounded-2xl hover:bg-amber-600 text-slate-400 hover:text-white transition-all shadow-xl">
                      <ArrowRight size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
           <div className="glass-card p-10 rounded-[3rem] bg-linear-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden shadow-2xl glow-primary">
              <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12"><Wrench size={120} /></div>
              <h3 className="text-3xl font-black tracking-tighter mb-4 italic">Maintenance <span className="text-white/80">Pulse</span></h3>
              <p className="text-sm font-medium text-white/80 mb-8 leading-relaxed">System monitoring indicates optimal performance with average resolution time under <span className="text-white font-black underline decoration-2 underline-offset-4">4 hours</span>.</p>
              <div className="space-y-4">
                 {[
                   { label: 'Active Tasks', value: '42', icon: Zap },
                   { label: 'Idle Techs', value: '08', icon: Hammer },
                   { label: 'CSAT Score', value: '98%', icon: ShieldAlert },
                 ].map((s, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                      <div className="flex items-center gap-3">
                        <s.icon size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                      </div>
                      <span className="text-2xl font-black uppercase tracking-tighter">{s.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-8 rounded-[2.5rem] shadow-xl border border-white/10">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3 italic dark:text-white uppercase tracking-tighter">
                 <Filter size={20} className="text-amber-500" />
                 Resource Map
              </h3>
              <div className="space-y-3">
                 {['Plumbing', 'Electrical', 'HVAC', 'General Decor'].map((tech) => (
                    <div key={tech} className="flex items-center justify-between p-4 glass rounded-2xl group cursor-pointer hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                       <span className="text-xs font-black dark:text-slate-200 uppercase tracking-tight">{tech}</span>
                       <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">Available</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Provision Maintenance Dispatch">
        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Affected Asset</label>
            <select required className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold dark:text-white appearance-none">
                 <option className="bg-slate-900">Villa Hodan - Unit 202</option>
                 <option className="bg-slate-900">Blue Sky Apt - Unit 105</option>
                 <option className="bg-slate-900">Commercial Hub - Ground Floor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Issue Intelligence</label>
            <textarea required placeholder="Describe the technical failure..." className="w-full h-32 px-5 py-4 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold resize-none dark:text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Priority Stream</label>
              <select required className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold dark:text-white appearance-none">
                 <option key="low" value="low" className="bg-slate-900">Low Impact</option>
                 <option key="medium" value="medium" className="bg-slate-900">Medium Urgency</option>
                 <option key="high" value="high" className="bg-slate-900">High Velocity (Critical)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Estimate ($)</label>
              <input type="number" placeholder="50" className="w-full px-5 py-3.5 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold dark:text-white" />
            </div>
          </div>

          <button type="submit" className="w-full py-4.5 bg-amber-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all glow-primary">
            Dispatch Support Personnel
          </button>
        </form>
      </Modal>
    </motion.div>
  );
};

export default Maintenance;

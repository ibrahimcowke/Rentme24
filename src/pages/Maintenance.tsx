import React, { useState } from 'react';
import { 
  Plus, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Hammer,
  ArrowRight,
  Filter,
  Wrench
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
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-xl ring-4 ring-amber-500/5">
              <Wrench size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Maintenance <span className="text-amber-600 italic">Grid</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Coordinate support requests and technical asset servicing.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-inner">
             {['all', 'pending', 'in-progress', 'completed'].map((f) => (
               <button 
                 key={f}
                 onClick={() => setFilter(f as any)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap",
                   filter === f ? "bg-white dark:bg-slate-700 text-amber-600 shadow-md" : "text-slate-400"
                 )}
               >
                 {f.replace('-', ' ')}
               </button>
             ))}
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 text-white rounded-2xl hover:bg-amber-700 transition-all font-bold shadow-lg shadow-amber-500/20 glow-primary whitespace-nowrap"
          >
            <Plus size={18} />
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 rounded-4xl border border-white/20 dark:border-slate-800/50 shadow-2xl flex flex-col md:flex-row gap-8 group hover:border-amber-500/30 transition-all"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ticket.id}</span>
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                        ticket.priority === 'high' ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20" :
                        ticket.priority === 'medium' ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20" :
                        "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20"
                      )}>
                        {ticket.priority} priority
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-bold">{ticket.date}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black group-hover:text-amber-600 transition-colors dark:text-white uppercase tracking-tight">{ticket.issue}</h3>
                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-500" />
                      <span className="font-bold dark:text-slate-200">{ticket.property}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hammer size={16} className="text-slate-400" />
                      <span className="font-bold dark:text-slate-200 uppercase tracking-tighter">Tech: {ticket.technician}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800/50 pt-6 md:pt-0 md:pl-8">
                   <div className={cn(
                     "px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm border",
                     ticket.status === 'completed' ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                     ticket.status === 'in-progress' ? "bg-blue-500/10 text-blue-600 border-blue-500/20" :
                     "bg-amber-500/10 text-amber-600 border-amber-500/20"
                   )}>
                      {ticket.status === 'completed' && <CheckCircle2 size={14} />}
                      {ticket.status}
                   </div>
                   <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-amber-600 text-slate-500 dark:text-slate-400 hover:text-white transition-all shadow-sm">
                      <ArrowRight size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-8">
           <div className="glass-card p-10 rounded-[3rem] bg-linear-to-br from-amber-500 to-orange-600 text-white relative overflow-hidden shadow-2xl glow-primary">
              <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 transition-transform group-hover:rotate-45"><Wrench size={100} /></div>
              <h3 className="text-2xl font-black tracking-tighter mb-4 italic">Operational Status</h3>
              <p className="text-sm font-medium text-white/80 mb-8 leading-relaxed">System monitoring indicates optimal performance with average resolution time under <span className="text-white font-black underline decoration-2 underline-offset-4">4 hours</span>.</p>
              <div className="space-y-4">
                 {[
                   { label: 'Active Tasks', value: '42' },
                   { label: 'Idle Techs', value: '08' },
                   { label: 'CSAT Score', value: '98%' },
                 ].map((s, i) => (
                   <div key={i} className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                      <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                      <span className="text-xl font-black uppercase tracking-tighter">{s.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-8 rounded-4xl shadow-xl">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 italic dark:text-white">
                 <Filter size={18} className="text-amber-500" />
                 Resource Map
              </h3>
              <div className="space-y-4">
                 {['Plumbing', 'Electrical', 'HVAC', 'General'].map((tech) => (
                    <div key={tech} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl group cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                       <span className="text-xs font-black dark:text-slate-200">{tech}</span>
                       <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">Available</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* New Ticket Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Provision Multi-Ticket">
        <form onSubmit={handleCreateTicket} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Affected Asset</label>
            <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold appearance-none dark:text-slate-100">
                 <option className="bg-white dark:bg-slate-900">Villa Hodan - Unit 202</option>
                 <option className="bg-white dark:bg-slate-900">Blue Sky Apt - Unit 105</option>
                 <option className="bg-white dark:bg-slate-900">Commercial Hub - Ground Floor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Issue Description</label>
            <textarea required placeholder="e.g. Broken faucet in the bathroom cabinet..." className="w-full h-32 px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold resize-none dark:text-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Priority Stream</label>
              <select required className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold appearance-none dark:text-slate-100">
                 <option key="low" value="low" className="bg-white dark:bg-slate-900">Low Impact</option>
                 <option key="medium" value="medium" className="bg-white dark:bg-slate-900">Medium Urgency</option>
                 <option key="high" value="high" className="bg-white dark:bg-slate-900">High Velocity (Critical)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Estimated Cost ($)</label>
              <input type="number" placeholder="50" className="w-full px-5 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-amber-500/10 transition-all font-bold dark:text-slate-100" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-amber-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 glow-primary">
            Dispatch Support
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Maintenance;

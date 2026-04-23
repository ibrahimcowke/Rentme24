import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Wrench,
  Users,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useToast } from '@/components/Toasts';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const MOCK_EVENTS = [
  { id: 1, title: 'Apartment Showing', time: '10:00 AM', duration: '1h', type: 'showing', location: 'Ocean View, Unit 4B', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 2, title: 'Plumbing Repair', time: '01:30 PM', duration: '2h', type: 'maintenance', location: 'Sunset Villas, Unit 12', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 3, title: 'Lease Signing', time: '04:00 PM', duration: '30m', type: 'admin', location: 'Main Office', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 4, title: 'Property Inspection', time: '09:00 AM (Tomorrow)', duration: '3h', type: 'inspection', location: 'Palm Grove Estate', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
];

const Calendar: React.FC = () => {
  const { addToast } = useToast();
  const [view, setView] = useState<'week' | 'month'>('week');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = [12, 13, 14, 15, 16, 17, 18];

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'showing': return <Users size={16} />;
      case 'maintenance': return <Wrench size={16} />;
      case 'admin': return <AlertCircle size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-8 animate-in fade-in duration-700 pb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-rose-500/10 text-rose-500 rounded-xl ring-4 ring-rose-500/5">
              <CalendarIcon size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Master <span className="text-rose-500 NOT-italic">Calendar</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Schedule view for maintenance, showings, and admin tasks.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex glass p-1.5 rounded-2xl border border-white/10 shadow-inner">
             <button 
               onClick={() => setView('week')}
               className={cn("px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", view === 'week' ? "bg-rose-500 text-white shadow-lg" : "text-slate-400")}
             >
               Week
             </button>
             <button 
               onClick={() => setView('month')}
               className={cn("px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", view === 'month' ? "bg-rose-500 text-white shadow-lg" : "text-slate-400")}
             >
               Month
             </button>
          </div>
          <button 
            onClick={() => addToast("New event modal opened.", "info")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-500 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Header / Controls */}
          <div className="glass-card p-4 rounded-3xl flex items-center justify-between shadow-lg border border-white/20">
             <div className="flex items-center gap-4">
                <button className="p-2 glass rounded-xl hover:bg-white/20 transition-all text-slate-500 dark:text-slate-300">
                   <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-black tracking-tighter dark:text-white uppercase">October 2026</h2>
                <button className="p-2 glass rounded-xl hover:bg-white/20 transition-all text-slate-500 dark:text-slate-300">
                   <ChevronRight size={20} />
                </button>
             </div>
             <button className="px-4 py-2 bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-white/10 transition-colors">
                Today
             </button>
          </div>

          {/* Week View Grid */}
          <div className="glass-card rounded-[2.5rem] border border-white/20 shadow-2xl p-6 overflow-x-auto">
             <div className="grid grid-cols-7 gap-4 min-w-[600px]">
                {days.map((day, i) => (
                   <div key={day} className="flex flex-col items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{day}</span>
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black transition-all",
                        i === 3 ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-110" : "glass text-slate-600 dark:text-slate-300"
                      )}>
                         {dates[i]}
                      </div>
                   </div>
                ))}
             </div>
             
             {/* Mock Timeline */}
             <div className="mt-8 space-y-4 min-w-[600px] border-t border-white/10 pt-8 relative">
                {/* Time indicators */}
                <div className="absolute left-0 top-8 bottom-0 w-16 border-r border-white/10 space-y-18 text-[10px] font-bold text-slate-400">
                   <div>09:00</div>
                   <div>10:00</div>
                   <div>11:00</div>
                   <div>12:00</div>
                   <div>13:00</div>
                </div>

                <div className="pl-20 space-y-6">
                   <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl relative group cursor-pointer hover:bg-blue-500/20 transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-2xl" />
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-black text-blue-700 dark:text-blue-300">Apartment Showing</h4>
                            <p className="text-xs font-bold text-blue-600/70 dark:text-blue-400/70 flex items-center gap-1 mt-1">
                               <MapPin size={12} /> Ocean View, Unit 4B
                            </p>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase bg-blue-500/20 text-blue-600 px-2 py-1 rounded-md">10:00 AM - 11:00 AM</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl relative group cursor-pointer hover:bg-emerald-500/20 transition-all mt-12">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-l-2xl" />
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-black text-emerald-700 dark:text-emerald-300">Lease Signing</h4>
                            <p className="text-xs font-bold text-emerald-600/70 dark:text-emerald-400/70 flex items-center gap-1 mt-1">
                               <Users size={12} /> Tenant: Sarah Jenkins
                            </p>
                         </div>
                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-600 px-2 py-1 rounded-md">12:30 PM - 01:00 PM</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Schedule */}
        <div className="space-y-6">
           <div className="glass-card p-6 rounded-3xl border border-white/20 shadow-xl">
              <h3 className="text-lg font-black uppercase italic dark:text-white mb-6">Upcoming Agenda</h3>
              <div className="space-y-4">
                 {MOCK_EVENTS.map(event => (
                    <div key={event.id} className="p-4 glass rounded-2xl hover:bg-white/5 transition-all cursor-pointer group">
                       <div className="flex items-center justify-between mb-2">
                          <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", event.bg, event.color)}>
                             {event.time}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                             <Clock size={12} /> {event.duration}
                          </span>
                       </div>
                       <h4 className="font-bold text-sm dark:text-white group-hover:text-rose-500 transition-colors">{event.title}</h4>
                       <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                          {getEventIcon(event.type)}
                          <span className="truncate">{event.location}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-3 glass text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all rounded-xl">
                 View All Events
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Calendar;

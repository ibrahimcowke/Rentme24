import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Briefcase, 
  Phone, 
  Mail,
  Plus,
  MoreVertical,
  Star
} from 'lucide-react';


const mockBrokers = [
  { 
    id: 1, 
    name: "Abdiwahab Ahmed", 
    deals: 24, 
    earnings: 3250, 
    rate: 5, 
    status: "active", 
    score: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdi" 
  },
  { 
    id: 2, 
    name: "Sahra Hassan", 
    deals: 18, 
    earnings: 2100, 
    rate: 4, 
    status: "active", 
    score: 4.5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sahra" 
  },
];

const Brokers: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Broker Management</h2>
          <p className="text-slate-500">Track commissions, deals, and performance of third-party agents.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
          <Plus size={18} />
          <span>Add New Broker</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Performance Overview */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="premium-gradient p-6 rounded-3xl text-white shadow-xl">
             <div className="flex items-center justify-between mb-8">
                <Briefcase size={32} className="text-white/80" />
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase">Top Performing</span>
             </div>
             <p className="text-white/70 text-sm font-medium">Total Broker Commissions</p>
             <h3 className="text-4xl font-black mt-1">$12,450.00</h3>
             <div className="mt-6 flex items-center gap-2 text-xs font-bold text-white/90 bg-white/10 w-fit px-3 py-1.5 rounded-lg">
                <TrendingUp size={14} />
                <span>+15% Growth this month</span>
             </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
             <div className="flex items-center justify-between">
                <h3 className="font-bold">Leaderboard</h3>
                <Award size={20} className="text-amber-500" />
             </div>
             <div className="space-y-4 mt-6">
                {mockBrokers.map((b, i) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 w-4">#{i+1}</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                       <img src={b.avatar} alt={b.name} />
                    </div>
                    <span className="text-sm font-medium flex-1">{b.name}</span>
                    <span className="text-sm font-bold text-primary">${b.earnings}</span>
                  </div>
                ))}
             </div>
             <button className="mt-6 text-xs font-bold text-primary hover:underline">Full Analytics</button>
          </div>
        </div>

        {/* Smart Score Widget */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-blue-50/30 dark:bg-blue-900/10">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">AI Performance Score</h3>
              <div className="p-2 bg-blue-500/10 text-blue-600 rounded-xl">
                <Star size={18} fill="currentColor" />
              </div>
           </div>
           <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="376.8" strokeDashoffset="45" className="text-primary" />
                 </svg>
                 <span className="absolute text-3xl font-black">9.2</span>
              </div>
              <p className="mt-4 text-sm font-bold text-slate-600 dark:text-slate-400">Excellent Efficiency</p>
           </div>
        </div>
      </div>

      {/* Broker List */}
      <h3 className="text-xl font-bold">Active Brokers</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockBrokers.map((broker) => (
          <div key={broker.id} className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl premium-gradient p-1 mb-3">
                 <img src={broker.avatar} alt={broker.name} className="w-full h-full rounded-xl bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-800" />
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold">{broker.score}</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-xl">{broker.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">Agreement Rate: {broker.rate}%</p>
                </div>
                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Deals Closed</p>
                    <p className="text-lg font-black">{broker.deals}</p>
                 </div>
                 <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Commission</p>
                    <p className="text-lg font-black text-primary">${broker.earnings}</p>
                 </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                 <button className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                    <Phone size={18} />
                 </button>
                 <button className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600">
                    <Mail size={18} />
                 </button>
                 <button className="ml-auto text-sm font-bold text-primary hover:underline">View Properties</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brokers;

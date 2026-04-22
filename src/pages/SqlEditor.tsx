import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  Save, 
  History, 
  Terminal, 
  Trash2, 
  Copy,
  ChevronRight,
  Search,
  Table as TableIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useToast } from '@/components/Toasts';

const SAMPLE_SQL = `-- GuriFlow Pro SQL Editor
-- Run queries against the production registry

SELECT 
  p.name as property_name, 
  p.district, 
  t.name as tenant_name, 
  tr.amount, 
  tr.status as payment_status
FROM properties p
JOIN tenants t ON p.id = t.property_id
JOIN transactions tr ON t.id = tr.tenant_id
WHERE tr.status = 'completed'
ORDER BY tr.amount DESC;`;

const SqlEditor: React.FC = () => {
  const [query, setQuery] = useState(SAMPLE_SQL);
  const [results, setResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'history'>('editor');
  const { addToast } = useToast();

  const handleExecute = () => {
    setIsExecuting(true);
    // Simulate query execution
    setTimeout(() => {
      setResults([
        { id: 1, property: 'Villa Hodan', district: 'Hodan', tenant: 'Ali Omar', amount: 500, status: 'Completed' },
        { id: 2, property: 'Blue Sky Apt', district: 'Wadajir', tenant: 'Hafsa Ahmed', amount: 350, status: 'Completed' },
      ]);
      setIsExecuting(false);
      addToast('Query executed successfully. 2 rows returned.', 'success');
    }, 800);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12 h-[calc(100vh-180px)] flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/10 text-indigo-600 rounded-xl ring-4 ring-indigo-500/5">
              <Database size={20} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white uppercase italic">SQL <span className="text-indigo-600">Commander</span></h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">Execute complex data extraction and schema migrations.</p>
        </div>

        <div className="flex items-center gap-4">
           <button 
             onClick={handleExecute}
             disabled={isExecuting}
             className={cn(
               "flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] glow-primary",
               isExecuting && "opacity-50 cursor-not-allowed"
             )}
           >
             {isExecuting ? <Terminal className="animate-spin" size={18} /> : <Play size={18} />}
             <span>Execute Script</span>
           </button>
           <button 
             onClick={handleClear}
             className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-rose-500 transition-all shadow-sm"
           >
             <Trash2 size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="lg:col-span-1 glass-card rounded-4xl border border-white/20 dark:border-slate-800/50 flex flex-col overflow-hidden">
           <div className="p-6 border-b border-white/10 dark:border-slate-800/50">
              <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl mb-6">
                 {['editor', 'history'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={cn(
                       "flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                       activeTab === tab ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600"
                     )}
                   >
                     {tab}
                   </button>
                 ))}
              </div>

              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={14} />
                 <input 
                   type="text" 
                   placeholder="Search schema..." 
                   className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-600 dark:text-slate-300"
                 />
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-2">
              {[
                { name: 'properties', type: 'table', columns: 12 },
                { name: 'tenants', type: 'table', columns: 10 },
                { name: 'transactions', type: 'table', columns: 8 },
                { name: 'maintenance_logs', type: 'view', columns: 6 },
              ].map((item, i) => (
                <div key={i} className="group p-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-500/5 cursor-pointer transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/10">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={cn(
                           "p-2 rounded-lg",
                           item.type === 'table' ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600" : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600"
                         )}>
                            <TableIcon size={14} />
                         </div>
                         <span className="text-xs font-black dark:text-slate-200 uppercase tracking-tight">{item.name}</span>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-all group-hover:translate-x-1" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 flex flex-col gap-8 min-h-0">
           {/* Editor Pane */}
           <div className="flex-1 glass-card rounded-4xl border border-white/20 dark:border-slate-800/50 p-8 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600 shadow-[2px_0_10px_rgba(79,70,229,0.3)]" />
              <div className="flex items-center justify-between mb-6 shrink-0">
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/20" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20" />
                 </div>
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-all tracking-widest"><Copy size={14} /> Copy</button>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-all tracking-widest"><Save size={14} /> Save Snippet</button>
                 </div>
              </div>
              
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-sm leading-relaxed text-indigo-600 dark:text-indigo-400 font-bold resize-none scrollbar-hide"
              />
           </div>

           {/* Results Pane */}
           <div className="h-64 glass-card rounded-4xl border border-white/20 dark:border-slate-800/50 overflow-hidden flex flex-col shrink-0">
              <div className="px-6 py-4 border-b border-white/10 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Execution Output</h4>
                 <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PostgreSQL 15.3</span>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Ready</span>
                 </div>
              </div>

              <div className="flex-1 overflow-auto p-4 scrollbar-hide">
                 <AnimatePresence mode="wait">
                   {results.length > 0 ? (
                     <motion.table 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="w-full text-left border-collapse"
                     >
                       <thead>
                         <tr>
                           {Object.keys(results[0]).map((key) => (
                             <th key={key} className="p-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800/50">{key}</th>
                           ))}
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                          {results.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                               {Object.values(row).map((val: any, j) => (
                                 <td key={j} className="p-3 text-xs font-bold text-slate-600 dark:text-slate-300">{val}</td>
                               ))}
                            </tr>
                          ))}
                       </tbody>
                     </motion.table>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-400/50 gap-4">
                        <History size={32} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-widest">Execute query to view results</p>
                     </div>
                   )}
                 </AnimatePresence>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SqlEditor;

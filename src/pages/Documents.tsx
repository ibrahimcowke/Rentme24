import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  UploadCloud, 
  Search, 
  Filter, 
  Download, 
  Trash2,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useToast } from '@/components/Toasts';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const MOCK_FOLDERS = [
  { id: '1', name: 'Lease Agreements', count: 45, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: '2', name: 'Tenant IDs', count: 128, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: '3', name: 'Property Deeds', count: 12, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: '4', name: 'Invoices & Receipts', count: 340, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const MOCK_DOCUMENTS = [
  { id: '1', name: 'Lease_Agreement_Unit_4B.pdf', type: 'pdf', size: '2.4 MB', date: '2023-10-15', folder: 'Lease Agreements' },
  { id: '2', name: 'Tenant_Passport_Ali.jpg', type: 'image', size: '1.1 MB', date: '2023-10-16', folder: 'Tenant IDs' },
  { id: '3', name: 'Ocean_View_Deed_Signed.pdf', type: 'pdf', size: '5.7 MB', date: '2023-09-01', folder: 'Property Deeds' },
  { id: '4', name: 'Plumbing_Invoice_Oct.pdf', type: 'pdf', size: '0.8 MB', date: '2023-10-20', folder: 'Invoices & Receipts' },
  { id: '5', name: 'Q3_Financial_Report.xlsx', type: 'excel', size: '4.2 MB', date: '2023-10-01', folder: 'Invoices & Receipts' },
  { id: '6', name: 'Maintenance_Log_2023.docx', type: 'word', size: '1.5 MB', date: '2023-10-22', folder: 'Invoices & Receipts' },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText size={24} className="text-rose-500" />;
    case 'image': return <ImageIcon size={24} className="text-emerald-500" />;
    case 'excel': return <FileCode size={24} className="text-green-500" />;
    case 'word': return <FileText size={24} className="text-blue-500" />;
    default: return <FileArchive size={24} className="text-slate-500" />;
  }
};

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const { addToast } = useToast();

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = activeFolder ? doc.folder === activeFolder : true;
    return matchesSearch && matchesFolder;
  });

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
            <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl ring-4 ring-indigo-500/5">
              <Folder size={22} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter dark:text-white uppercase italic leading-tight">Document <span className="text-indigo-500 NOT-italic">Vault</span></h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Secure storage for leases, IDs, and property records.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 w-64 glass border border-white/10 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-xl dark:text-white text-sm font-bold"
            />
          </div>
          <button 
            onClick={() => addToast("Upload portal opened.", "info")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-500 text-white rounded-2xl hover:scale-105 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 active:scale-95"
          >
            <UploadCloud size={18} strokeWidth={3} />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_FOLDERS.map((folder) => (
          <motion.div
            key={folder.id}
            variants={itemVariants}
            onClick={() => setActiveFolder(activeFolder === folder.name ? null : folder.name)}
            className={cn(
              "p-6 glass-card rounded-3xl cursor-pointer transition-all border",
              activeFolder === folder.name 
                ? "border-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.02]" 
                : "border-white/10 hover:border-white/30 hover:scale-[1.02]"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-2xl", folder.bg, folder.color)}>
                <Folder size={24} fill="currentColor" fillOpacity={0.2} />
              </div>
              <span className="text-2xl font-black text-slate-300 dark:text-slate-700">{folder.count}</span>
            </div>
            <h3 className="text-lg font-black dark:text-white tracking-tight">{folder.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Directory</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
           <div className="flex items-center gap-3">
              <FileText className="text-slate-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest dark:text-white">
                {activeFolder ? `${activeFolder} Files` : 'All Documents'}
              </h3>
           </div>
           <button className="p-2 glass rounded-xl text-slate-400 hover:text-indigo-500 transition-colors">
              <Filter size={18} />
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">File Name</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Directory</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Size</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Date Added</th>
                <th className="px-8 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <AnimatePresence>
                {filteredDocs.map((doc) => (
                  <motion.tr 
                    key={doc.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-white/5 transition-all group"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 glass rounded-xl">
                          {getFileIcon(doc.type)}
                        </div>
                        <div>
                          <p className="font-bold text-sm dark:text-slate-200 group-hover:text-indigo-500 transition-colors">{doc.name}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{doc.type.toUpperCase()} DOCUMENT</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700">
                        {doc.folder}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{doc.size}</td>
                    <td className="px-8 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{doc.date}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => addToast(`Downloading ${doc.name}...`, 'success')}
                          className="p-2 glass text-slate-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                        >
                          <Download size={16} />
                        </button>
                        <button 
                          onClick={() => addToast(`${doc.name} deleted.`, 'info')}
                          className="p-2 glass text-slate-400 rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 glass text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center">
                       <div className="flex flex-col items-center justify-center text-slate-500">
                          <Folder size={48} className="mb-4 opacity-20" />
                          <p className="font-bold">No documents found.</p>
                          <p className="text-xs mt-1 opacity-70">Try adjusting your search or filter.</p>
                       </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Documents;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  CheckCheck,
  Building2
} from 'lucide-react';
import { cn } from '@/utils/cn';

const contacts = [
  { id: '1', name: 'Ahmed Farah', property: 'Ocean View A1', lastMsg: 'I have paid the rent for May.', time: '10:45 AM', unread: 2, online: true },
  { id: '2', name: 'Muna Hassan', property: 'Blue Sky B4', lastMsg: 'When will the plumber arrive?', time: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Jama Duale', property: 'Central Plaza Suite 2', lastMsg: 'The contract renewal is ready.', time: 'Monday', unread: 0, online: true },
  { id: '4', name: 'Sahra Abdi', property: 'Garden Heights', lastMsg: 'Thank you for the update!', time: 'Monday', unread: 0, online: false },
];

const messages = [
  { id: '1', senderId: 'user', text: 'Hello Ahmed, did you receive the invoice for this month?', time: '10:30 AM' },
  { id: '2', senderId: '1', text: 'Yes, I received it. I have paid the rent for May just now.', time: '10:45 AM', read: true },
  { id: '3', senderId: 'user', text: 'Perfect! I will confirm once it reflects in our system.', time: '10:47 AM' },
];

const Communication: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [msgInput, setMsgInput] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-160px)] flex gap-6"
    >
      {/* Contacts Sidebar */}
      <div className="w-80 flex flex-col gap-6">
        <div className="glass-card p-6 rounded-3xl border border-white/20 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black italic dark:text-white">Messages</h2>
            <div className="p-2 glass rounded-xl text-primary cursor-pointer hover:scale-110 transition-all">
              <MessageSquare size={18} />
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2.5 glass border border-white/10 rounded-2xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  "p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-3 border border-transparent",
                  selectedContact.id === contact.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-white/5"
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 overflow-hidden shadow-md">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-xs font-black truncate">{contact.name}</h4>
                    <span className={cn("text-[8px] font-bold", selectedContact.id === contact.id ? "text-white/70" : "text-slate-500")}>{contact.time}</span>
                  </div>
                  <p className={cn("text-[10px] truncate font-medium", selectedContact.id === contact.id ? "text-white/80" : "text-slate-400")}>{contact.lastMsg}</p>
                </div>
                {contact.unread > 0 && selectedContact.id !== contact.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[8px] font-black text-white border border-white dark:border-slate-900 shadow-md">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 glass-card rounded-[2.5rem] border border-white/20 flex flex-col overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <MessageSquare size={300} />
        </div>

        {/* Chat Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between backdrop-blur-md bg-white/5 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 overflow-hidden shadow-xl">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.name}`} alt={selectedContact.name} />
            </div>
            <div>
              <h3 className="text-sm font-black dark:text-white uppercase tracking-tight">{selectedContact.name}</h3>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", selectedContact.online ? "bg-emerald-500" : "bg-slate-400")} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedContact.online ? 'Active Now' : 'Offline'}</span>
                <span className="text-slate-700 mx-1">•</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
                  <Building2 size={10} />
                  {selectedContact.property}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-3 glass rounded-2xl text-slate-400 hover:text-primary transition-all"><Phone size={18} /></button>
            <button className="p-3 glass rounded-2xl text-slate-400 hover:text-primary transition-all"><Video size={18} /></button>
            <button className="p-3 glass rounded-2xl text-slate-400 hover:text-primary transition-all"><Info size={18} /></button>
            <button className="p-3 glass rounded-2xl text-slate-400 hover:text-primary transition-all"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide z-10">
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 glass rounded-full text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">Today, May 22</span>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.senderId === 'user' ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] p-4 rounded-4xl shadow-xl",
                msg.senderId === 'user' 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "glass dark:bg-white/5 dark:text-white rounded-tl-none border border-white/10"
              )}>
                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                <div className={cn("flex items-center gap-2 mt-2", msg.senderId === 'user' ? "justify-end" : "justify-start")}>
                  <span className="text-[8px] font-black uppercase opacity-60 tracking-widest">{msg.time}</span>
                  {msg.senderId === 'user' && <CheckCheck size={12} className="opacity-60" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 bg-white/5 backdrop-blur-md border-t border-white/10 z-10">
          <div className="flex items-center gap-4">
            <button className="p-3.5 glass rounded-2xl text-slate-400 hover:text-primary transition-all shrink-0">
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Type your message here..."
                className="w-full px-6 py-3.5 glass border border-white/10 rounded-4xl text-sm font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all pr-12"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="text-primary hover:scale-110 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
            <button className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all glow-primary">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Info Sidebar (Optional) */}
      <div className="w-72 flex-col gap-6 hidden xl:flex">
        <div className="glass-card p-6 rounded-3xl border border-white/20 flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/20 overflow-hidden shadow-2xl mb-4 p-1">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.name}`} alt={selectedContact.name} className="rounded-2xl" />
           </div>
           <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter">{selectedContact.name}</h3>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">Verified Resident</p>

           <div className="w-full space-y-4">
              <div className="p-4 glass rounded-2xl text-left border border-white/5">
                <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-1">Associated Property</p>
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-primary" />
                  <span className="text-[10px] font-black dark:text-white truncate">{selectedContact.property}</span>
                </div>
              </div>
              <div className="p-4 glass rounded-2xl text-left border border-white/5">
                <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest mb-1">Contract Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">Active Until Dec 2026</span>
                </div>
              </div>
           </div>

           <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all">
              View Profile
           </button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/20 flex-1">
           <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Shared Documents</h4>
           <div className="space-y-3">
              {['Lease_Agreement.pdf', 'Rent_Receipt_May.pdf', 'Repair_Photos.zip'].map((doc, i) => (
                <div key={i} className="p-3 glass rounded-xl flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-all">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Paperclip size={14} />
                  </div>
                  <span className="text-[10px] font-bold dark:text-slate-300 truncate">{doc}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Communication;

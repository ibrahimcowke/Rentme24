import React from 'react';
import { 
  DollarSign, 
  Smartphone, 
  Building2, 
  ArrowUpRight,
  Plus,
  Search,
  FileDown
} from 'lucide-react';
import { cn } from '../utils/cn';

const paymentMethods = [
  { id: 'evc_plus', name: 'Hormuud EVC Plus', icon: Smartphone, color: 'bg-green-500' },
  { id: 'zaad', name: 'Telesom Zaad', icon: Smartphone, color: 'bg-green-600' },
  { id: 'premier', name: 'Premier Bank', icon: Building2, color: 'bg-blue-600' },
  { id: 'salaam', name: 'Salaam Bank', icon: Building2, color: 'bg-blue-500' },
  { id: 'cash', name: 'Cash Payment', icon: DollarSign, color: 'bg-slate-600' },
];

const mockPayments = [
  { id: 1, tenant: "Ali Omar Gure", amount: 500, date: "2026-04-15", method: "evc_plus", status: "completed" },
  { id: 2, tenant: "Hafsa Ahmed", amount: 350, date: "2026-04-12", method: "zaad", status: "pending" },
  { id: 3, tenant: "Mohamed Farah", amount: 1200, date: "2026-04-10", method: "premier", status: "completed" },
];

const Payments: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Payments & Invoices</h2>
          <p className="text-slate-500">Track all incoming rent and maintenance payments.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-all font-medium">
            <FileDown size={18} />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-500/20">
            <Plus size={18} />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods Quick Info */}
        <div className="space-y-6">
          <h3 className="font-bold text-lg">Payment Gateways</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="glass-card p-4 rounded-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform cursor-pointer">
                <div className={cn("p-3 rounded-xl text-white", method.color)}>
                  <method.icon size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">{method.name}</p>
                  <p className="text-xs text-slate-500">Active • Integrated</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Recent Transactions</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Tenant / Ref</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Method</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm">{pay.tenant}</p>
                        <p className="text-[10px] text-slate-500 font-mono">#{Math.random().toString(36).substring(7).toUpperCase()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-green-600 dark:text-green-400">${pay.amount}</td>
                    <td className="px-6 py-4">
                       <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase">
                         {pay.method.replace('_', ' ')}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        pay.status === 'completed' ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                      )}>
                        {pay.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium">
                      {new Date(pay.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;

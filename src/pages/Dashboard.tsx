import React from 'react';
import { 
  Building2, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const occupancyData = [
  { name: 'Occupied', value: 97, color: '#2563EB' },
  { name: 'Vacant', value: 28, color: '#14B8A6' },
];

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            {trend > 0 ? (
              <span className="text-green-500 text-xs font-semibold flex items-center">
                <ArrowUpRight size={14} className="mr-1" />
                +{trend}%
              </span>
            ) : (
              <span className="text-red-500 text-xs font-semibold flex items-center">
                <ArrowDownRight size={14} className="mr-1" />
                {trend}%
              </span>
            )}
            <span className="text-slate-400 text-xs ml-2">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-opacity-10 ${color}`}>
          <Icon className={color.replace('bg-', 'text-')} size={24} />
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t('dashboard.kpi.total_properties')} 
          value="125" 
          trend={12} 
          icon={Building2} 
          color="bg-blue-500" 
        />
        <StatCard 
          title={t('dashboard.kpi.occupied_units')} 
          value="97" 
          trend={5} 
          icon={CheckCircle2} 
          color="bg-green-500" 
        />
        <StatCard 
          title={t('dashboard.kpi.monthly_income')} 
          value="$12,500" 
          trend={8} 
          icon={DollarSign} 
          color="bg-emerald-500" 
        />
        <StatCard 
          title={t('dashboard.kpi.pending_payments')} 
          value="$2,300" 
          trend={-2} 
          icon={Clock} 
          color="bg-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">{t('dashboard.charts.revenue')}</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Pie Chart */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">{t('dashboard.charts.occupancy')}</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">78%</span>
              <span className="text-xs text-slate-500">Average</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {occupancyData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ background: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value} Units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Recent Maintenance</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 mr-4">
                  <AlertCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Leaking Pipe - Apt 402</p>
                  <p className="text-xs text-slate-500">Submitted 2 hours ago by Ali Omar</p>
                </div>
                <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Urgent</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-primary font-semibold hover:underline">View All Tickets</button>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-4">Expiring Contracts</h3>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mr-4">
                  <Users size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Ahmed Ibrahim - Office B12</p>
                  <p className="text-xs text-slate-500">Expires in {i * 3} days</p>
                </div>
                <button className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1 rounded-lg">Renew</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-primary font-semibold hover:underline">View All Contracts</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Brokers from './pages/Brokers';
import Settings from './pages/Settings';
import './translations/i18n';

// Placeholder pages for other modules
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-8 glass-card rounded-2xl">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-slate-500">This module is currently being implemented. Check back soon for full functionality.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/maintenance" element={<Placeholder title="Maintenance Tickets" />} />
          <Route path="/brokers" element={<Brokers />} />
          <Route path="/reports" element={<Placeholder title="Finance Reports" />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Brokers from './pages/Brokers';
import Settings from './pages/Settings';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import './translations/i18n';

import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './components/Toasts';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DataProvider>
          <Router>
          <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/brokers" element={<Brokers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </DashboardLayout>
        </Router>
      </DataProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;

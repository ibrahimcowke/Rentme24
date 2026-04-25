import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Property {
  id: string;
  name: string;
  code: string;
  type: 'house' | 'apartment' | 'office';
  district: string;
  rent: number;
  status: 'occupied' | 'available';
  image: string;
  rooms?: number;
  kitchens?: number;
  toilets?: number;
}

export interface Tenant {
  id: string;
  name: string;
  propertyId: string;
  propertyName: string;
  unit: string;
  status: 'active' | 'inactive';
  phone: string;
  email: string;
  joinDate: string;
  paymentStatus: 'paid' | 'pending';
  avatar: string;
}

export interface Transaction {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  type: 'rent' | 'deposit' | 'maintenance';
  method: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Asset {
  id: string;
  propertyId: string;
  propertyName: string;
  name: string;
  category: 'Furniture' | 'Appliances' | 'Electronics' | 'Other';
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  value: number;
  purchaseDate: string;
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  propertyName: string;
  issue: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  technician: string;
  cost: number;
  date: string;
}

interface DataContextType {
  properties: Property[];
  tenants: Tenant[];
  transactions: Transaction[];
  maintenanceTickets: MaintenanceTicket[];
  assets: Asset[];
  addProperty: (property: Omit<Property, 'id' | 'status' | 'image'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  addTenant: (tenant: Omit<Tenant, 'id' | 'status' | 'avatar' | 'joinDate' | 'paymentStatus'>) => void;
  updateTenant: (id: string, updates: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  addMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'date' | 'status'>) => void;
  updateMaintenanceTicket: (id: string, updates: Partial<MaintenanceTicket>) => void;
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  deleteAsset: (id: string) => void;
  stats: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    activeUnits: number;
    occupancyRate: number;
    pendingPayments: number;
    activeMaintenance: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('rentme-properties');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: "Villa Hodan", code: "HOD-001", type: "house", district: "Hodan", rent: 500, status: "occupied", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600", rooms: 4, kitchens: 1, toilets: 3 },
      { id: '2', name: "Blue Sky Apartment", code: "WAD-042", type: "apartment", district: "Wadajir", rent: 350, status: "available", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600", rooms: 2, kitchen: 1, toilets: 1 },
      { id: '3', name: "Commercial Hub", code: "XW-105", type: "office", district: "Hamar-Weyne", rent: 1200, status: "occupied", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" },
      { id: '4', name: "Sunset Residence", code: "DAR-009", type: "house", district: "Darussalam", rent: 600, status: "available", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600", rooms: 3, kitchens: 1, toilets: 2 },
    ];
  });

  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const saved = localStorage.getItem('rentme-tenants');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: "Ali Omar", propertyId: '1', propertyName: "Villa Hodan", unit: "B-402", status: "active", phone: "+252 61 555 0123", email: "ali.omar@email.so", joinDate: "Jan 2024", paymentStatus: "paid", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali" },
      { id: '2', name: "Hafsa Ahmed", propertyId: '2', propertyName: "Blue Sky Apt", unit: "302", status: "active", phone: "+252 61 555 0456", email: "hafsa.a@email.so", joinDate: "Mar 2024", paymentStatus: "pending", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hafsa" },
    ];
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('rentme-transactions');
    return saved ? JSON.parse(saved) : [
      { id: 'PAY-771', tenantId: '1', tenantName: 'Ali Omar', propertyId: '1', propertyName: 'Villa Hodan', amount: 500, type: 'rent', method: 'Mobile Money', date: '2024-03-20', status: 'completed' },
      { id: 'PAY-772', tenantId: '2', tenantName: 'Hafsa Ahmed', propertyId: '2', propertyName: 'Blue Sky Apt', amount: 350, type: 'rent', method: 'e-Dahab', date: '2024-03-19', status: 'pending' },
    ];
  });

  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(() => {
    const saved = localStorage.getItem('rentme-maintenance');
    return saved ? JSON.parse(saved) : [
      { id: 'TKT-101', propertyId: '1', propertyName: 'Villa Hodan', issue: 'Leaking pipe in kitchen', priority: 'high', status: 'pending', technician: 'Ahmed', cost: 45, date: '2024-03-24' },
      { id: 'TKT-102', propertyId: '2', propertyName: 'Blue Sky Apt', issue: 'AC unit not functional', priority: 'medium', status: 'in-progress', technician: 'Mohamed', cost: 120, date: '2024-03-23' },
    ];
  });

  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('rentme-assets');
    return saved ? JSON.parse(saved) : [
      { id: 'AST-001', propertyId: '1', propertyName: 'Villa Hodan', name: 'LG Smart Fridge', category: 'Appliances', condition: 'Excellent', value: 850, purchaseDate: '2023-12-15' },
      { id: 'AST-002', propertyId: '1', propertyName: 'Villa Hodan', name: 'Samsung 55" TV', category: 'Electronics', condition: 'Good', value: 600, purchaseDate: '2024-01-10' },
      { id: 'AST-003', propertyId: '2', propertyName: 'Blue Sky Apt', name: 'Daikin AC Unit', category: 'Appliances', condition: 'Fair', value: 450, purchaseDate: '2022-06-20' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('rentme-properties', JSON.stringify(properties));
    localStorage.setItem('rentme-tenants', JSON.stringify(tenants));
    localStorage.setItem('rentme-transactions', JSON.stringify(transactions));
    localStorage.setItem('rentme-maintenance', JSON.stringify(maintenanceTickets));
    localStorage.setItem('rentme-assets', JSON.stringify(assets));
  }, [properties, tenants, transactions, maintenanceTickets, assets]);

  const addProperty = (prop: Omit<Property, 'id' | 'status' | 'image'>) => {
    const newProp: Property = {
      ...prop,
      id: Math.random().toString(36).substr(2, 9),
      status: 'available',
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600"
    };
    setProperties(prev => [...prev, newProp]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const addTenant = (tenant: Omit<Tenant, 'id' | 'status' | 'avatar' | 'joinDate' | 'paymentStatus'>) => {
    const newTenant: Tenant = {
      ...tenant,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      paymentStatus: 'pending',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${tenant.name}`
    };
    setTenants(prev => [...prev, newTenant]);
    updateProperty(tenant.propertyId, { status: 'occupied' });
  };

  const updateTenant = (id: string, updates: Partial<Tenant>) => {
    setTenants(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTenant = (id: string) => {
    const tenant = tenants.find(t => t.id === id);
    if (tenant) {
      updateProperty(tenant.propertyId, { status: 'available' });
    }
    setTenants(prev => prev.filter(t => t.id !== id));
  };

  const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `PAY-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTx, ...prev]);
    if (tx.status === 'completed') {
      updateTenant(tx.tenantId, { paymentStatus: 'paid' });
    }
  };

  const addMaintenanceTicket = (ticket: Omit<MaintenanceTicket, 'id' | 'date' | 'status'>) => {
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: `TKT-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setMaintenanceTickets(prev => [newTicket, ...prev]);
  };

  const updateMaintenanceTicket = (id: string, updates: Partial<MaintenanceTicket>) => {
    setMaintenanceTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addAsset = (asset: Omit<Asset, 'id'>) => {
    const newAsset: Asset = {
      ...asset,
      id: `AST-${Math.floor(Math.random() * 1000)}`
    };
    setAssets(prev => [...prev, newAsset]);
  };

  const deleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const totalRevenue = transactions.reduce((acc, tx) => tx.status === 'completed' ? acc + tx.amount : acc, 0);
  const totalMaintenanceExpenses = maintenanceTickets
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => acc + t.cost, 0);

  const stats = {
    totalRevenue,
    totalExpenses: totalMaintenanceExpenses,
    netProfit: totalRevenue - totalMaintenanceExpenses,
    activeUnits: properties.length,
    occupancyRate: Math.round((properties.filter(p => p.status === 'occupied').length / properties.length) * 100) || 0,
    pendingPayments: transactions.filter(tx => tx.status === 'pending').reduce((acc, tx) => acc + tx.amount, 0),
    activeMaintenance: maintenanceTickets.filter(t => t.status !== 'completed').length
  };

  return (
    <DataContext.Provider value={{ 
      properties, 
      tenants, 
      transactions, 
      maintenanceTickets,
      assets,
      addProperty, 
      updateProperty, 
      deleteProperty,
      addTenant,
      updateTenant,
      deleteTenant,
      addTransaction,
      addMaintenanceTicket,
      updateMaintenanceTicket,
      addAsset,
      deleteAsset,
      stats
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


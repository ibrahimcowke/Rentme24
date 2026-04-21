-- RentFlow Pro - Database Schema

-- Custom Types
CREATE TYPE property_status AS ENUM ('available', 'occupied', 'maintenance', 'reserved');
CREATE TYPE user_role AS ENUM ('super_admin', 'manager', 'broker', 'accountant', 'tenant');
CREATE TYPE property_type AS ENUM ('house', 'apartment', 'office', 'land', 'warehouse', 'shop');
CREATE TYPE payment_method AS ENUM ('cash', 'evc_plus', 'zaad', 'bank_transfer', 'card');
CREATE TYPE maintenance_status AS ENUM ('pending', 'assigned', 'in_progress', 'completed');
CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'urgent');

-- Profiles Table (Linked to Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'tenant',
  phone TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Brokers Table
CREATE TABLE brokers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  commission_rate NUMERIC(5,2) DEFAULT 5.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Properties Table
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type property_type NOT NULL,
  status property_status DEFAULT 'available',
  rent_amount NUMERIC(10,2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  district TEXT NOT NULL, -- Mogadishu Districts: Hodan, Wadajir, etc.
  address TEXT,
  gps_location TEXT,
  image_urls TEXT[],
  broker_id UUID REFERENCES brokers(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tenants Table
CREATE TABLE tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  national_id TEXT,
  guarantor_info JSONB,
  occupation TEXT,
  move_in_date DATE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Leases / Contracts
CREATE TABLE leases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  rent_amount NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'active',
  contract_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Payments
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lease_id UUID REFERENCES leases(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  payment_date DATE DEFAULT current_date,
  method payment_method DEFAULT 'cash',
  status TEXT DEFAULT 'paid', -- paid, pending, partial, overdue
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Maintenance Requests
CREATE TABLE maintenance_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- plumbing, electric, etc.
  priority maintenance_priority DEFAULT 'medium',
  status maintenance_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Expenses
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  date DATE DEFAULT current_date,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Districts Reference for UI
-- Hodan, Wadajir, Dayniile, Heliwaa, Yaqshiid, Karaan, Shangaani, Abdulaziz, Bondhere, Xamar Weyne, Xamar Jajab

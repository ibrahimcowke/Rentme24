-- GuriFlow Pro (Rentme24) - Centralized Database Schema
-- Version: 1.0.0
-- Target: PostgreSQL / Supabase

-- 1. ENUM TYPES
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'property_type') THEN
        CREATE TYPE property_type AS ENUM ('house', 'apartment', 'office');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'unit_status') THEN
        CREATE TYPE unit_status AS ENUM ('occupied', 'available');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tenant_status') THEN
        CREATE TYPE tenant_status AS ENUM ('active', 'inactive');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE payment_status AS ENUM ('paid', 'pending', 'overdue');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tx_type') THEN
        CREATE TYPE tx_type AS ENUM ('rent', 'deposit', 'maintenance');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tx_status') THEN
        CREATE TYPE tx_status AS ENUM ('completed', 'pending', 'cancelled');
    END IF;
END $$;

-- 2. TABLES

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    type property_type NOT NULL DEFAULT 'house',
    district TEXT NOT NULL,
    rent NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status unit_status NOT NULL DEFAULT 'available',
    image TEXT,
    rooms INTEGER DEFAULT 0,
    kitchens INTEGER DEFAULT 0,
    toilets INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tenants Table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    unit TEXT NOT NULL,
    status tenant_status NOT NULL DEFAULT 'active',
    phone TEXT NOT NULL,
    email TEXT,
    join_date DATE DEFAULT CURRENT_DATE,
    payment_status payment_status NOT NULL DEFAULT 'pending',
    avatar TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions Table (Financial Ledger)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    type tx_type NOT NULL DEFAULT 'rent',
    method TEXT NOT NULL, -- Mobile Money, e-Dahab, Cash, etc.
    date DATE DEFAULT CURRENT_DATE,
    status tx_status NOT NULL DEFAULT 'pending',
    reference_id TEXT UNIQUE, -- Extracted from mobile money SMS
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_properties_district ON properties(district);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_tenants_property ON tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_tenant ON transactions(tenant_id);

-- 4. TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_properties_modtime') THEN
        CREATE TRIGGER update_properties_modtime
            BEFORE UPDATE ON properties
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_tenants_modtime') THEN
        CREATE TRIGGER update_tenants_modtime
            BEFORE UPDATE ON tenants
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 5. INITIAL SEED DATA (Mogadishu Context)

INSERT INTO properties (name, code, type, district, rent, status, image, rooms, kitchens, toilets)
VALUES 
('Villa Hodan', 'HOD-001', 'house', 'Hodan', 500, 'occupied', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914', 4, 1, 3),
('Blue Sky Apartment', 'WAD-042', 'apartment', 'Wadajir', 350, 'available', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00', 2, 1, 1),
('Commercial Hub', 'XW-105', 'office', 'Hamar-Weyne', 1200, 'occupied', 'https://images.unsplash.com/photo-1497366216548-37526070297c', 0, 0, 2),
('Sunset Residence', 'DAR-009', 'house', 'Darussalam', 600, 'available', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 3, 1, 2)
ON CONFLICT (code) DO NOTHING;

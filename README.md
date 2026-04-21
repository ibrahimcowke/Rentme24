# RentFlow Pro – Smart Rental Management System

Welcome to the ultimate rental management solution designed for real estate professionals in Somalia and beyond.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🛠 Tech Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **i18n**: i18next (English & Somali)
- **Database**: Supabase (PostgreSQL)

## 📁 Key Modules Implemented

- **Dashboard**: KPI widgets, revenue trends, and occupancy analytics.
- **Property Management**: Full CRUD support with Mogadishu district localization.
- **Tenant Hub**: Contact management, WhatsApp integration, and lease tracking.
- **Payments**: Localized gateway tracking (EVC Plus, Zaad, Premier Bank).
- **Broker System**: Performance leaderboard and AI efficiency scoring.
- **Settings**: Comprehensive system configuration and multi-language toggles.

## 🛢 Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.com).
2. Copy the contents of `schema.sql` into the **SQL Editor** in your Supabase dashboard and run it.
3. Update your `.env.local` with your Supabase URL and Anon Key.

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🗺 Mogadishu District Support
The system is pre-configured with support for major districts:
- Hodan
- Wadajir
- Dayniile
- Xamar Weyne
- ... and many more.

Designed with ❤️ for premium management experiences.

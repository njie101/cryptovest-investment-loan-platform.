import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { UserDashboard } from './pages/Dashboard/UserDashboard';
import { AdminDashboard } from './pages/Admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1">
        {activePage === 'home' && <Home />}
        {activePage === 'services' && <Services />}
        {activePage === 'about' && <AboutUs />}
        {activePage === 'contact' && <ContactUs />}
        {activePage === 'dashboard' && <UserDashboard />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      <Footer />
      <AuthModal />
      <ScrollToTop />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

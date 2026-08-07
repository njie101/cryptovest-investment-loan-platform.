import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  User,
  LogOut,
  ChevronDown,
  Lock,
  Wallet,
  Coins,
  BadgeDollarSign,
  Menu,
  X,
  LayoutDashboard,
  Building2,
  Phone,
  Info,
  Sliders
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activePage,
    setActivePage,
    openAuthModal,
    logout,
    switchDemoRole,
    transactions,
    users
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Stats for quick admin indicator badge
  const pendingDepositsCount = transactions.filter(t => t.type === 'deposit' && t.status === 'pending').length;
  const pendingWithdrawalsCount = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;
  const pendingKycCount = users.filter(u => u.kycStatus === 'pending').length;
  const totalAdminAttention = pendingDepositsCount + pendingWithdrawalsCount + pendingKycCount;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top Bar / Market Ticker */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-1.5 px-4 sm:px-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            BTC $87,450.00 (+3.42%)
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">ETH $3,420.50 (+1.85%)</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300">SOL $192.40 (+5.12%)</span>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <span className="hidden sm:inline">256-bit SSL Encrypted</span>
          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono text-[10px]">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setActivePage('home');
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Crypto<span className="text-emerald-400">Vest</span>
              <span className="text-[10px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold border border-emerald-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide font-mono -mt-1">
              INVESTMENTS & LOANS
            </p>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActivePage('home')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePage === 'home' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage('services')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePage === 'services' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Services & Loans
          </button>
          <button
            onClick={() => setActivePage('about')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePage === 'about' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => setActivePage('contact')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePage === 'contact' ? 'bg-slate-800 text-emerald-400' : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            Contact Us
          </button>

          {currentUser && currentUser.role === 'user' && (
            <button
              onClick={() => setActivePage('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                activePage === 'dashboard' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              User Dashboard
            </button>
          )}

          {currentUser && currentUser.role === 'admin' && (
            <button
              onClick={() => setActivePage('admin')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition ${
                activePage === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-amber-400 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Portal
              {totalAdminAttention > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                  {totalAdminAttention}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 px-3.5 py-1.5 rounded-xl border border-slate-700/60 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white truncate max-w-[120px]">{currentUser.name}</p>
                  <p className="text-[11px] text-emerald-400 font-mono font-medium">
                    ${currentUser.balanceUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-sm"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="font-semibold text-white">{currentUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">KYC Status:</span>
                      <span
                        className={`capitalize font-semibold px-2 py-0.5 rounded text-[10px] ${
                          currentUser.kycStatus === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : currentUser.kycStatus === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : currentUser.kycStatus === 'rejected'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {currentUser.kycStatus}
                      </span>
                    </div>
                  </div>

                  {currentUser.role === 'user' ? (
                    <button
                      onClick={() => setActivePage('dashboard')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Dashboard & Assets
                    </button>
                  ) : (
                    <button
                      onClick={() => setActivePage('admin')}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-slate-200 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" /> Admin Control Panel
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-900/20 text-red-400 flex items-center gap-2 border-t border-slate-800 mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-950/50 transition transform hover:-translate-y-0.5"
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setActivePage('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              setActivePage('services');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-200 hover:bg-slate-800"
          >
            Services & Loans
          </button>
          <button
            onClick={() => {
              setActivePage('about');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-200 hover:bg-slate-800"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setActivePage('contact');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact Us
          </button>

          {currentUser && (
            <div className="pt-2 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-2">Signed in as {currentUser.name}</p>
              {currentUser.role === 'user' ? (
                <button
                  onClick={() => {
                    setActivePage('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-center mb-2"
                >
                  Go to User Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActivePage('admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-center mb-2"
                >
                  Go to Admin Panel
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-slate-800 text-red-400 font-medium rounded-xl text-center"
              >
                Sign Out
              </button>
            </div>
          )}

          {!currentUser && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 text-center rounded-xl bg-slate-800 text-white font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2 text-center rounded-xl bg-emerald-500 text-slate-950 font-bold"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

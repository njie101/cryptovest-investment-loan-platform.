import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminOverview } from './AdminOverview';
import { AdminDeposits } from './AdminDeposits';
import { AdminWithdrawals } from './AdminWithdrawals';
import { AdminKyc } from './AdminKyc';
import { AdminLoans } from './AdminLoans';
import { AdminUsers } from './AdminUsers';
import { AdminPlans } from './AdminPlans';
import { AdminTickets } from './AdminTickets';
import {
  ShieldCheck,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  Users,
  LayoutDashboard,
  LogOut,
  Sliders,
  Coins,
  Headphones,
  Lock,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, adminTab, setAdminTab, logout, login, transactions, users, tickets, investments } = useApp();

  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const ok = login(adminUsername, adminPassword);
    if (!ok) {
      setLoginError('Invalid admin credentials. Username: admin, Password: 10Million$@12345');
    }
  };

  const handleQuickFillAdmin = () => {
    setAdminUsername('admin');
    setAdminPassword('10Million$@12345');
    login('admin', '10Million$@12345');
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-950">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-950/40">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal Access</h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted System Administration & Management Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Username / Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={e => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-950/50 transition"
            >
              Authenticate Admin Session
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleQuickFillAdmin}
              className="w-full py-2.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Auto-Fill Admin Credentials (10Million$@12345)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pendingBalanceDepositsCount = transactions.filter(t => t.type === 'deposit' && t.status === 'pending').length;
  const pendingStakingCount = investments.filter(i => i.status === 'pending').length;
  const totalPendingDepositsCount = pendingBalanceDepositsCount + pendingStakingCount;

  const pendingWithdrawalsCount = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending').length;
  const pendingKycCount = users.filter(u => u.kycStatus === 'pending').length;
  const openTicketsCount = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'plans', label: 'Investment Plans', icon: Coins },
    { id: 'deposits', label: 'Pending Deposits & Stakes', icon: ArrowDownLeft, badge: totalPendingDepositsCount },
    { id: 'withdrawals', label: 'Pending Withdrawals', icon: ArrowUpRight, badge: pendingWithdrawalsCount },
    { id: 'kyc', label: 'KYC Reviews', icon: ShieldCheck, badge: pendingKycCount },
    { id: 'tickets', label: 'Support Tickets', icon: Headphones, badge: openTicketsCount },
    { id: 'loans', label: 'Crypto Loans', icon: Landmark },
    { id: 'users', label: 'Clients & Profit Injector', icon: Users }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 font-extrabold text-2xl flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">System Administrator Panel</h1>
                <span className="text-[10px] uppercase font-extrabold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">CryptoVest Global Operational Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => switchDemoRole('user')}
              className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-2xl border border-slate-700 transition flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4 text-emerald-400" />
              Switch to Client Dashboard
            </button>
            <button
              onClick={logout}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-2xl transition border border-slate-700"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = adminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAdminTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition relative ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab View */}
        <div>
          {adminTab === 'overview' && <AdminOverview />}
          {adminTab === 'plans' && <AdminPlans />}
          {adminTab === 'deposits' && <AdminDeposits />}
          {adminTab === 'withdrawals' && <AdminWithdrawals />}
          {adminTab === 'kyc' && <AdminKyc />}
          {adminTab === 'tickets' && <AdminTickets />}
          {adminTab === 'loans' && <AdminLoans />}
          {adminTab === 'users' && <AdminUsers />}
        </div>
      </div>
    </div>
  );
};

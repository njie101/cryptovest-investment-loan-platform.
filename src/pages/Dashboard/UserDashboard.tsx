import React from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewTab } from './OverviewTab';
import { InvestmentsTab } from './InvestmentsTab';
import { LoansTab } from './LoansTab';
import { DepositTab } from './DepositTab';
import { WithdrawTab } from './WithdrawTab';
import { KycTab } from './KycTab';
import { HistoryTab } from './HistoryTab';
import { TicketsTab } from './TicketsTab';
import {
  LayoutDashboard,
  Coins,
  Landmark,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  User,
  LogOut,
  Headphones
} from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { currentUser, dashboardTab, setDashboardTab, logout, tickets } = useApp();

  if (!currentUser) return null;

  const userRepliedTicketsCount = tickets.filter(
    t => t.userId === currentUser.id && t.status === 'replied'
  ).length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'investments', label: 'Invest & Stake', icon: Coins },
    { id: 'loans', label: 'Crypto Loans', icon: Landmark },
    { id: 'deposit', label: 'Deposit', icon: ArrowDownLeft },
    { id: 'withdraw', label: 'Withdraw', icon: ArrowUpRight },
    { id: 'kyc', label: 'KYC Verification', icon: ShieldCheck },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'tickets', label: 'Support Tickets', icon: Headphones, badge: userRepliedTicketsCount }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold text-2xl flex items-center justify-center border border-emerald-500/30">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
                <span
                  className={`capitalize text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    currentUser.kycStatus === 'verified'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  KYC {currentUser.kycStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400">{currentUser.email} • Client ID: {currentUser.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right">
              <p className="text-[11px] text-slate-400 uppercase font-semibold">USDT Balance</p>
              <p className="text-xl font-extrabold font-mono text-emerald-400">
                ${currentUser.balanceUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-red-400 rounded-2xl transition border border-slate-700"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80 no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = dashboardTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shrink-0 transition relative ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && tab.badge > 0 ? (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-slate-900 animate-bounce">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Active Tab View */}
        <div>
          {dashboardTab === 'overview' && <OverviewTab />}
          {dashboardTab === 'investments' && <InvestmentsTab />}
          {dashboardTab === 'loans' && <LoansTab />}
          {dashboardTab === 'deposit' && <DepositTab />}
          {dashboardTab === 'withdraw' && <WithdrawTab />}
          {dashboardTab === 'kyc' && <KycTab />}
          {dashboardTab === 'history' && <HistoryTab />}
          {dashboardTab === 'tickets' && <TicketsTab />}
        </div>
      </div>
    </div>
  );
};

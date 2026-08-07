import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  Landmark,
  Coins,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const { users, transactions, loans, setAdminTab } = useApp();

  const pendingDeposits = transactions.filter(t => t.type === 'deposit' && t.status === 'pending');
  const pendingWithdrawals = transactions.filter(t => t.type === 'withdrawal' && t.status === 'pending');
  const pendingKycUsers = users.filter(u => u.kycStatus === 'pending');
  const pendingLoans = loans.filter(l => l.status === 'pending');

  const totalClients = users.filter(u => u.role === 'user').length;
  const totalAssetsManaged = users.reduce((acc, u) => acc + u.balanceUsdt, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Pending Deposits</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{pendingDeposits.length}</p>
          <button
            onClick={() => setAdminTab('deposits')}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            Review & Approve Deposits →
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Pending Withdrawals</span>
            <div className="p-2 bg-red-500/20 text-red-400 rounded-xl">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{pendingWithdrawals.length}</p>
          <button
            onClick={() => setAdminTab('withdrawals')}
            className="text-xs text-red-400 hover:underline font-semibold"
          >
            Clear Withdrawal Queue →
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Pending KYC Reviews</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{pendingKycUsers.length}</p>
          <button
            onClick={() => setAdminTab('kyc')}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Verify ID Documents →
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase">Registered Clients</span>
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white font-mono">{totalClients}</p>
          <button
            onClick={() => setAdminTab('users')}
            className="text-xs text-teal-400 hover:underline font-semibold"
          >
            Manage Balances & Add Profit →
          </button>
        </div>
      </div>

      {/* Quick Action Queue Overview */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Platform Administrative Overview</h3>
            <p className="text-xs text-slate-400">Quick status metrics and shortcut management actions</p>
          </div>
          <button
            onClick={() => setAdminTab('plans')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto"
          >
            <Coins className="w-4 h-4" />
            Edit Investment Plans
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Total Client Deposits Managed:</span>
            <span className="font-mono font-bold text-emerald-400">${totalAssetsManaged.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Pending Crypto Loan Applications:</span>
            <span className="font-mono font-bold text-amber-400">{pendingLoans.length} Loans</span>
          </div>
        </div>
      </div>
    </div>
  );
};

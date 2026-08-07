import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  TrendingUp,
  Landmark,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Coins,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { currentUser, investments, loans, transactions, setDashboardTab } = useApp();

  if (!currentUser) return null;

  const userInvestments = investments.filter(i => i.userId === currentUser.id && i.status === 'active');
  const userLoans = loans.filter(l => l.userId === currentUser.id && (l.status === 'active' || l.status === 'pending'));
  const recentTxs = transactions.filter(t => t.userId === currentUser.id).slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / KYC Alert if unverified */}
      {currentUser.kycStatus === 'unverified' && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-amber-300">Identity Verification Required</p>
              <p className="text-slate-300">Submit your KYC documents to unlock unlimited withdrawal privileges.</p>
            </div>
          </div>
          <button
            onClick={() => setDashboardTab('kyc')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shrink-0"
          >
            Submit KYC Now
          </button>
        </div>
      )}

      {currentUser.kycStatus === 'pending' && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400 shrink-0 animate-spin" />
            <div>
              <p className="font-bold text-blue-300">KYC Verification Under Review</p>
              <p className="text-slate-300">Your documents are being reviewed by Admin Compliance.</p>
            </div>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Balance</span>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold font-mono text-white">
              ${currentUser.balanceUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-emerald-400 mt-1 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ready to Invest or Withdraw
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Profits Earned</span>
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold font-mono text-emerald-400">
              +${currentUser.totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Accumulated daily ROI yields</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Staked Capital</span>
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold font-mono text-white">
              ${currentUser.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">{userInvestments.length} Active Plan(s)</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-lg">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Crypto Loans</span>
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold font-mono text-amber-300">
              ${currentUser.activeLoanBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">{userLoans.length} Active Loan(s)</p>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setDashboardTab('deposit')}
          className="p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
        >
          <ArrowDownLeft className="w-5 h-5" />
          Deposit Crypto
        </button>
        <button
          onClick={() => setDashboardTab('withdraw')}
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700"
        >
          <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          Withdraw Funds
        </button>
        <button
          onClick={() => setDashboardTab('investments')}
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700"
        >
          <Coins className="w-5 h-5 text-teal-400" />
          Stake Investment
        </button>
        <button
          onClick={() => setDashboardTab('loans')}
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 border border-slate-700"
        >
          <Landmark className="w-5 h-5 text-amber-400" />
          Apply for Loan
        </button>
      </div>

      {/* Active Investments Summary & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Investments Left */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Active Staked Portfolios</h3>
            <button
              onClick={() => setDashboardTab('investments')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              View All Plans <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {userInvestments.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              You have no active investment stakes. Choose a plan to start earning daily returns.
            </div>
          ) : (
            <div className="space-y-3">
              {userInvestments.map(inv => (
                <div key={inv.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-sm">{inv.planName}</p>
                      <p className="text-xs text-slate-400 font-mono">Staked: ${inv.amountInvested.toLocaleString()} USDT</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-400">+{inv.roiPercentage}% Total Target</p>
                      <p className="text-[11px] text-teal-300 font-mono">+${inv.totalProfitEarned.toFixed(2)} Earned</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-2/3 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Transactions Right */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Recent Ledger Logs</h3>
            <button
              onClick={() => setDashboardTab('history')}
              className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
            >
              Full History <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {recentTxs.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">No transaction records found yet.</div>
          ) : (
            <div className="space-y-3">
              {recentTxs.map(tx => (
                <div key={tx.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold font-mono text-slate-100">
                      {tx.type === 'deposit' || tx.type === 'profit' || tx.type === 'loan_disbursal' ? '+' : '-'}
                      ${tx.amount.toLocaleString()} {tx.cryptoAsset}
                    </p>
                    <span
                      className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded ${
                        tx.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : tx.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

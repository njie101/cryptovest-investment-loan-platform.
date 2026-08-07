import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDownLeft, Check, X, Coins, Wallet, Sparkles, Clock } from 'lucide-react';

export const AdminDeposits: React.FC = () => {
  const {
    transactions,
    approveDeposit,
    rejectDeposit,
    investments,
    approveInvestmentStake,
    rejectInvestmentStake
  } = useApp();

  const [activeTab, setActiveTab] = useState<'balance' | 'staking'>('staking');

  // Balance Deposits
  const depositTxs = transactions.filter(t => t.type === 'deposit');
  const pendingBalanceDeposits = depositTxs.filter(t => t.status === 'pending');
  const historyBalanceDeposits = depositTxs.filter(t => t.status !== 'pending');

  // Investment Staking Deposits
  const pendingStakingInvestments = investments.filter(i => i.status === 'pending');
  const historyStakingInvestments = investments.filter(i => i.status !== 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ArrowDownLeft className="w-6 h-6 text-emerald-400" /> Deposit & Staking Approvals
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Verify crypto deposit wallet transfers and transaction hashes submitted by clients for balance credits and high-yield plan stakes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 shrink-0 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('staking')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'staking'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" /> Staking Deposits ({pendingStakingInvestments.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('balance')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
                activeTab === 'balance'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" /> Main Balance Deposits ({pendingBalanceDeposits.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'staking' && (
        <div className="space-y-6">
          {/* Pending Staking Investments */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-400" /> Pending Investment Staking Deposits ({pendingStakingInvestments.length})
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Requires Admin Verification
              </span>
            </div>

            {pendingStakingInvestments.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No pending investment staking deposits waiting for approval.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingStakingInvestments.map(inv => (
                  <div
                    key={inv.id}
                    className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{inv.planName}</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          +{inv.roiPercentage}% ROI Rate
                        </span>
                      </div>

                      <p className="text-slate-300 font-mono text-xs">
                        Amount: <strong className="text-emerald-400">${inv.amountInvested.toLocaleString()} USDT</strong> ({inv.cryptoAsset || 'USDT'})
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Client ID: <span className="text-slate-200">{inv.userId}</span> • Wallet Sent To: <span className="font-mono text-emerald-300">{inv.depositAddress || 'Platform Cold Vault'}</span>
                      </p>

                      {inv.txHash && (
                        <p className="text-[11px] font-mono text-amber-300 break-all">
                          TxHash: {inv.txHash}
                        </p>
                      )}

                      <p className="text-[10px] text-slate-500">{new Date(inv.startDate).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                      <button
                        type="button"
                        onClick={() => approveInvestmentStake(inv.id)}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/50 transition"
                      >
                        <Check className="w-4 h-4" /> Approve & Activate Stake
                      </button>
                      <button
                        type="button"
                        onClick={() => rejectInvestmentStake(inv.id, 'Unverified Deposit Transaction')}
                        className="px-3.5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs flex items-center gap-1 border border-red-500/30 transition"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Staking History */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Processed Investment Stakes History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {historyStakingInvestments.map(inv => (
                <div key={inv.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-white">{inv.planName} (${inv.amountInvested.toLocaleString()} USDT)</p>
                    <p className="text-[10px] text-slate-400 font-mono">User ID: {inv.userId} • {inv.txHash || 'Balance Stake'}</p>
                  </div>
                  <span
                    className={`capitalize text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      inv.status === 'active' || inv.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'balance' && (
        <div className="space-y-6">
          {/* Action Required Balance Deposits */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Action Required Balance Deposits ({pendingBalanceDeposits.length})</h3>

            {pendingBalanceDeposits.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No pending balance deposit requests at this moment.</div>
            ) : (
              <div className="space-y-3">
                {pendingBalanceDeposits.map(d => (
                  <div
                    key={d.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">
                        Client: <span className="text-emerald-400">{d.userName}</span> ({d.userEmail})
                      </p>
                      <p className="font-mono text-xs text-slate-200">
                        Amount: <span className="text-emerald-400 font-bold">${d.amount.toLocaleString()} {d.cryptoAsset}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">TX Hash: {d.txHash}</p>
                      <p className="text-[10px] text-slate-500">{new Date(d.date).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => approveDeposit(d.id)}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-md shadow-emerald-950/40"
                      >
                        <Check className="w-4 h-4" /> Approve & Credit
                      </button>
                      <button
                        onClick={() => rejectDeposit(d.id, 'Unverified Transaction Hash')}
                        className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs flex items-center gap-1 border border-red-500/30"
                      >
                        <X className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Processed Deposits History */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Processed Deposits History</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {historyBalanceDeposits.map(d => (
                <div key={d.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-white">{d.userName} (${d.amount.toLocaleString()} {d.cryptoAsset})</p>
                    <p className="text-[10px] text-slate-500 font-mono">{d.txHash}</p>
                  </div>
                  <span
                    className={`capitalize text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                      d.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

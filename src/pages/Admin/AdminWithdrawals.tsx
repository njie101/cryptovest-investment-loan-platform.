import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Check, X } from 'lucide-react';

export const AdminWithdrawals: React.FC = () => {
  const { transactions, approveWithdrawal, rejectWithdrawal } = useApp();

  const withdrawalTxs = transactions.filter(t => t.type === 'withdrawal');
  const pendingWithdrawals = withdrawalTxs.filter(t => t.status === 'pending');
  const historyWithdrawals = withdrawalTxs.filter(t => t.status !== 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ArrowUpRight className="w-6 h-6 text-red-400" /> Pending Withdrawal Requests
        </h2>
        <p className="text-xs text-slate-300">
          Review destination wallet addresses submitted by clients. Approving broadcasts the payout, while rejecting refunds the client's balance.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Pending Queue ({pendingWithdrawals.length})</h3>

        {pendingWithdrawals.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No pending withdrawal requests.</div>
        ) : (
          <div className="space-y-3">
            {pendingWithdrawals.map(w => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm">
                    Client: <span className="text-white">{w.userName}</span> ({w.userEmail})
                  </p>
                  <p className="font-mono text-xs text-slate-200">
                    Amount: <span className="text-red-400 font-bold">${w.amount.toLocaleString()} {w.cryptoAsset}</span>
                  </p>
                  <p className="text-[11px] text-emerald-400 font-mono truncate max-w-md">
                    Destination: {w.destinationAddress || 'Standard Wallet'}
                  </p>
                  <p className="text-[10px] text-slate-500">{new Date(w.date).toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveWithdrawal(w.id)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-md shadow-emerald-950/40"
                  >
                    <Check className="w-4 h-4" /> Approve & Release
                  </button>
                  <button
                    onClick={() => rejectWithdrawal(w.id, 'Address Verification Failed')}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs flex items-center gap-1 border border-red-500/30"
                  >
                    <X className="w-4 h-4" /> Reject & Refund
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Processed Withdrawal History</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {historyWithdrawals.map(w => (
            <div key={w.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-white">{w.userName} (${w.amount.toLocaleString()} {w.cryptoAsset})</p>
                <p className="text-[10px] text-slate-500 font-mono">{w.destinationAddress}</p>
              </div>
              <span
                className={`capitalize text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                  w.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {w.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

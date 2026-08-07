import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Filter, ArrowDownLeft, ArrowUpRight, TrendingUp, Landmark, Coins } from 'lucide-react';

export const HistoryTab: React.FC = () => {
  const { currentUser, transactions } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  if (!currentUser) return null;

  const userTxs = transactions.filter(t => t.userId === currentUser.id);
  const filteredTxs = filterType === 'all' ? userTxs : userTxs.filter(t => t.type === filterType);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Clock className="w-6 h-6 text-emerald-400" /> Complete Transaction History
        </h2>
        <p className="text-xs text-slate-300">
          Full blockchain transaction ledger including deposits, withdrawals, profit additions, and loan disbursals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <span className="text-xs text-slate-400 px-2 flex items-center gap-1 font-semibold">
          <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter:
        </span>
        {['all', 'deposit', 'withdrawal', 'profit', 'investment_stake', 'loan_disbursal'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
              filterType === type
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {type.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {filteredTxs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No transactions match your current filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Notes / TX Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredTxs.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-mono text-slate-400">{tx.id}</td>
                    <td className="px-6 py-4 font-semibold capitalize text-white flex items-center gap-2">
                      {tx.type === 'deposit' && <ArrowDownLeft className="w-4 h-4 text-emerald-400" />}
                      {tx.type === 'withdrawal' && <ArrowUpRight className="w-4 h-4 text-red-400" />}
                      {tx.type === 'profit' && <TrendingUp className="w-4 h-4 text-teal-400" />}
                      {tx.type === 'loan_disbursal' && <Landmark className="w-4 h-4 text-amber-400" />}
                      {tx.type === 'investment_stake' && <Coins className="w-4 h-4 text-cyan-400" />}
                      {tx.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-white">
                      ${tx.amount.toLocaleString()} {tx.cryptoAsset}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`capitalize font-semibold text-[10px] px-2.5 py-0.5 rounded-full ${
                          tx.status === 'completed' || tx.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : tx.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      {new Date(tx.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs truncate font-mono text-[11px]">
                      {tx.txHash || tx.notes || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

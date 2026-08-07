import React from 'react';
import { useApp } from '../../context/AppContext';
import { Landmark, Check, X } from 'lucide-react';

export const AdminLoans: React.FC = () => {
  const { loans, approveLoan, rejectLoan } = useApp();

  const pendingLoans = loans.filter(l => l.status === 'pending');
  const activeAndHistoryLoans = loans.filter(l => l.status !== 'pending');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Landmark className="w-6 h-6 text-amber-400" /> Pending Crypto Loans
        </h2>
        <p className="text-xs text-slate-300">
          Review collateralized loan requests. Approving a loan disburses USDT funds directly into the user's main balance.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Pending Applications ({pendingLoans.length})</h3>

        {pendingLoans.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No pending loan applications.</div>
        ) : (
          <div className="space-y-3">
            {pendingLoans.map(l => (
              <div
                key={l.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm">
                    Borrower: <span className="text-amber-400">{l.userName}</span>
                  </p>
                  <p className="font-mono text-xs text-slate-200">
                    Requested Loan: <span className="text-white font-bold">${l.requestedAmount.toLocaleString()} USDT</span>
                  </p>
                  <p className="text-slate-400 font-mono">
                    Pledged Collateral: <span className="text-amber-300 font-bold">{l.collateralAmount} {l.collateralAsset}</span>
                  </p>
                  <p className="text-[10px] text-slate-500">Term: {l.durationMonths} Months @ {l.interestRateAnnual}% p.a.</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveLoan(l.id)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1 shadow-md"
                  >
                    <Check className="w-4 h-4" /> Approve & Disburse
                  </button>
                  <button
                    onClick={() => rejectLoan(l.id)}
                    className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs flex items-center gap-1 border border-red-500/30"
                  >
                    <X className="w-4 h-4" /> Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Active & Historical Loans</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {activeAndHistoryLoans.map(l => (
            <div key={l.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-white">{l.userName} (${l.requestedAmount.toLocaleString()} USDT)</p>
                <p className="text-[10px] text-slate-500 font-mono">Collateral: {l.collateralAmount} {l.collateralAsset}</p>
              </div>
              <span
                className={`capitalize text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                  l.status === 'active' || l.status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {l.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

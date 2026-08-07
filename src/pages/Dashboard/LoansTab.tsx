import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Landmark, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const LoansTab: React.FC = () => {
  const { currentUser, loans, requestLoan, cryptoPrices } = useApp();

  const [requestedAmount, setRequestedAmount] = useState<number>(3000);
  const [collateralAsset, setCollateralAsset] = useState<string>('BTC');
  const [durationMonths, setDurationMonths] = useState<number>(6);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  if (!currentUser) return null;

  const userLoans = loans.filter(l => l.userId === currentUser.id);

  const selectedCoin = cryptoPrices.find(c => c.symbol === collateralAsset) || cryptoPrices[0];
  const requiredUsdCollateral = requestedAmount / 0.65;
  const requiredCryptoAmount = requiredUsdCollateral / selectedCoin.priceUsd;

  const handleSubmitLoan = (e: React.FormEvent) => {
    e.preventDefault();
    requestLoan(requestedAmount, collateralAsset, Number(requiredCryptoAmount.toFixed(4)), durationMonths);
    setSubmittedMessage(`Crypto Loan request for $${requestedAmount.toLocaleString()} USDT submitted! Awaiting Admin clearance.`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Landmark className="w-6 h-6 text-amber-400" /> Crypto Collateral Loans
        </h2>
        <p className="text-xs text-slate-300">
          Borrow USDT cash liquidity using your digital assets (BTC, ETH, SOL) as collateral. Once approved by Admin, funds are disbursed instantly to your main balance.
        </p>
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{submittedMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Request Form Left */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Apply for a New Loan</h3>

          <form onSubmit={handleSubmitLoan} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Loan Amount Requested (USDT)</label>
              <input
                type="number"
                min={500}
                max={100000}
                step={250}
                required
                value={requestedAmount}
                onChange={e => setRequestedAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Collateral Crypto Asset</label>
                <select
                  value={collateralAsset}
                  onChange={e => setCollateralAsset(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {cryptoPrices.map(c => (
                    <option key={c.symbol} value={c.symbol}>
                      {c.name} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Duration (Months)</label>
                <select
                  value={durationMonths}
                  onChange={e => setDurationMonths(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Calculated Required Collateral:</span>
                <span className="font-bold text-amber-400 font-mono">
                  {requiredCryptoAmount.toFixed(4)} {collateralAsset}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Interest Rate:</span>
                <span className="font-bold text-white font-mono">5.5% p.a.</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg"
            >
              Submit Loan Application for Admin Clearance
            </button>
          </form>
        </div>

        {/* Loan History Right */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Your Loan Applications</h3>

          {userLoans.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No loan records found.</p>
          ) : (
            <div className="space-y-3">
              {userLoans.map(loan => (
                <div key={loan.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">${loan.requestedAmount.toLocaleString()} USDT</p>
                    <span
                      className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded ${
                        loan.status === 'active' || loan.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : loan.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </div>
                  <p className="text-slate-400 font-mono">
                    Collateral: {loan.collateralAmount} {loan.collateralAsset}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

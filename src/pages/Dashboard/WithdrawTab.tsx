import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, AlertCircle, CheckCircle2, ShieldCheck, Wallet } from 'lucide-react';

export const WithdrawTab: React.FC = () => {
  const { currentUser, requestWithdrawal, transactions } = useApp();

  const [withdrawAmount, setWithdrawAmount] = useState<number>(500);
  const [asset, setAsset] = useState<string>('USDT');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!currentUser) return null;

  const withdrawalHistory = transactions.filter(t => t.userId === currentUser.id && t.type === 'withdrawal');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!destinationAddress.trim()) {
      setFeedback({ success: false, message: 'Please provide a valid destination wallet address.' });
      return;
    }

    const res = requestWithdrawal(withdrawAmount, asset, destinationAddress);
    setFeedback(res);
    if (res.success) {
      setDestinationAddress('');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ArrowUpRight className="w-6 h-6 text-emerald-400" /> Withdraw Earnings & Capital
        </h2>
        <p className="text-xs text-slate-300">
          Request manual admin withdrawal to your personal wallet. All withdrawals are signed via offline multi-signature security within 30 minutes.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
            feedback.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Withdrawal Form Left */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Available Balance:</span>
            <span className="font-mono text-base font-bold text-emerald-400">
              ${currentUser.balanceUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
            </span>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Select Asset</label>
                <select
                  value={asset}
                  onChange={e => setAsset(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="USDT">Tether (USDT TRC20)</option>
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="SOL">Solana (SOL)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Amount to Withdraw</label>
                <input
                  type="number"
                  min={50}
                  max={currentUser.balanceUsdt}
                  required
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Destination Wallet Address</label>
              <input
                type="text"
                required
                placeholder="e.g. TYDzsY22A3YqS3K87C2e9W9jM1Vq3xL4pZ"
                value={destinationAddress}
                onChange={e => setDestinationAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={currentUser.balanceUsdt < 50}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/50"
            >
              Submit Withdrawal Request
            </button>
          </form>
        </div>

        {/* Withdrawal Queue History Right */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Withdrawal Logs</h3>

          {withdrawalHistory.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No withdrawal records found.</p>
          ) : (
            <div className="space-y-3">
              {withdrawalHistory.map(w => (
                <div key={w.id} className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">${w.amount.toLocaleString()} {w.cryptoAsset}</p>
                    <span
                      className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded ${
                        w.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : w.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono truncate">{w.destinationAddress || 'Standard Payout'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

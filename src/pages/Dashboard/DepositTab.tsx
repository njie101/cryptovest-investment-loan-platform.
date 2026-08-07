import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDownLeft, Copy, Check, QrCode, AlertCircle, ShieldCheck } from 'lucide-react';

export const DepositTab: React.FC = () => {
  const { currentUser, cryptoPrices, requestDeposit, transactions } = useApp();

  const [selectedSymbol, setSelectedSymbol] = useState<string>('USDT');
  const [amount, setAmount] = useState<number>(1000);
  const [txHash, setTxHash] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!currentUser) return null;

  const selectedCoin = cryptoPrices.find(c => c.symbol === selectedSymbol) || cryptoPrices[2];
  const pendingDeposits = transactions.filter(t => t.userId === currentUser.id && t.type === 'deposit');

  const symbolKey = selectedSymbol.toLowerCase() as 'btc' | 'eth' | 'usdt' | 'sol';
  const assignedAddress = currentUser.walletAddresses?.[symbolKey];
  const activeDepositAddress = assignedAddress && assignedAddress.trim() !== '' ? assignedAddress : selectedCoin.depositAddress;
  const isAssignedPersonal = Boolean(assignedAddress && assignedAddress.trim() !== '');

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDepositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    requestDeposit(amount, selectedSymbol, txHash);
    setSubmitted(true);
    setAmount(1000);
    setTxHash('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ArrowDownLeft className="w-6 h-6 text-emerald-400" /> Deposit Crypto Assets
        </h2>
        <p className="text-xs text-slate-300">
          Transfer BTC, ETH, USDT, or SOL to the verified platform cold wallet. After sending, paste your transaction hash (TX Hash) for manual admin clearance.
        </p>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Deposit submission logged successfully! Our Admin team will verify the TX hash and credit your balance within 15 minutes.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Deposit Address Box Left */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">1. Select Deposit Currency</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {cryptoPrices.map(coin => (
              <button
                key={coin.symbol}
                type="button"
                onClick={() => setSelectedSymbol(coin.symbol)}
                className={`p-3 rounded-2xl border text-center transition ${
                  selectedSymbol === coin.symbol
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-lg block mb-0.5">{coin.icon}</span>
                <span className="text-xs">{coin.symbol}</span>
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">
                {isAssignedPersonal ? `Your Assigned ${selectedCoin.name} Wallet:` : `Official ${selectedCoin.name} Deposit Address:`}
              </span>
              <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded ${
                isAssignedPersonal 
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' 
                  : 'text-emerald-400 bg-emerald-500/10'
              }`}>
                {isAssignedPersonal ? 'Personal Assigned Wallet' : 'Cold Vault'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 break-all flex items-center justify-between gap-2">
              <span>{activeDepositAddress}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white shrink-0"
                title="Copy Address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {isAssignedPersonal && (
              <p className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                ⚡ This deposit wallet address was specifically assigned to your account by the Admin team.
              </p>
            )}

            {/* Simulated QR Code Box */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center shadow-md">
                <QrCode className="w-24 h-24 text-slate-950" />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Scan QR code using your wallet app</p>
            </div>
          </div>
        </div>

        {/* Submit Proof Form Right */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">2. Submit Transfer Proof</h3>

          <form onSubmit={handleSubmitDeposit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Deposit Amount ({selectedSymbol})</label>
              <input
                type="number"
                min={50}
                required
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Blockchain Transaction Hash (TX Hash / ID)</label>
              <input
                type="text"
                placeholder="e.g. 0x8f2a4c11b23908fde732a00e..."
                value={txHash}
                onChange={e => setTxHash(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">If blank, an estimated verification hash will be auto-generated.</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/50"
            >
              Submit Deposit for Admin Clearance
            </button>
          </form>

          {/* Pending Deposits List */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Deposit Submissions History</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {pendingDeposits.map(d => (
                <div key={d.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-white">${d.amount.toLocaleString()} {d.cryptoAsset}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{d.txHash ? d.txHash.substring(0, 16) + '...' : 'No Hash'}</p>
                  </div>
                  <span
                    className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded ${
                      d.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : d.status === 'pending'
                        ? 'bg-amber-500/20 text-amber-400'
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
      </div>
    </div>
  );
};

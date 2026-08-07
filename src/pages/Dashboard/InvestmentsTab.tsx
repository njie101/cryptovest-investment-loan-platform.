import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Coins, CheckCircle2, AlertCircle, Sparkles, Copy, Check, Wallet, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const InvestmentsTab: React.FC = () => {
  const { currentUser, investmentPlans, stakeInvestment, investments, cryptoPrices } = useApp();

  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_growth');
  const [stakeAmount, setStakeAmount] = useState<number>(2500);
  const [paymentMethod, setPaymentMethod] = useState<'balance' | 'crypto_deposit'>('crypto_deposit');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('USDT');
  const [txHash, setTxHash] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!currentUser) return null;

  const selectedPlan = investmentPlans.find(p => p.id === selectedPlanId) || investmentPlans[0];

  // Determine deposit wallet address for selected crypto asset
  const getDepositAddress = (symbol: string): string => {
    const symLower = symbol.toLowerCase() as 'btc' | 'eth' | 'usdt' | 'sol';
    const userAssigned = currentUser.walletAddresses?.[symLower];
    if (userAssigned && userAssigned.trim().length > 0) {
      return userAssigned.trim();
    }
    const defaultCrypto = cryptoPrices.find(c => c.symbol.toUpperCase() === symbol.toUpperCase());
    return defaultCrypto?.depositAddress || 'Contact Support For Vault Address';
  };

  const depositAddress = getDepositAddress(selectedCrypto);

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const res = stakeInvestment(
      selectedPlanId,
      stakeAmount,
      paymentMethod,
      selectedCrypto,
      txHash,
      depositAddress
    );

    setFeedback(res);
    if (res.success) {
      setTxHash('');
    }
  };

  const userInvestments = investments.filter(i => i.userId === currentUser.id);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Coins className="w-6 h-6 text-emerald-400" /> Staking & High-Yield Investment Portfolios
        </h2>
        <p className="text-xs text-slate-300">
          Deposit crypto directly or stake your balance into audited algorithmic liquidity vaults. Deposits require instant admin verification upon submission.
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

      {/* Stake Form & Plan Select */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Choose Plan */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold border border-emerald-500/30">1</span> Choose Staking Plan
          </h3>
          <div className="space-y-3">
            {investmentPlans.map(plan => {
              const isSelected = selectedPlanId === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlanId(plan.id);
                    if (stakeAmount < plan.minDeposit) setStakeAmount(plan.minDeposit);
                  }}
                  className={`p-5 rounded-3xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 text-white shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      {plan.name}
                      {plan.popular && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 uppercase font-bold">Popular</span>
                      )}
                    </h4>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                      +{plan.roiPercentage}% ROI
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Duration: <span className="text-white font-medium">{plan.durationDays} Days</span> ({plan.payoutFrequency} Payouts)
                  </p>
                  <div className="text-xs text-emerald-400/90 font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span>Min: ${plan.minDeposit.toLocaleString()} USDT</span>
                    <span>Max: ${plan.maxDeposit.toLocaleString()} USDT</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Payment Method & Wallet Deposit Details */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold border border-emerald-500/30">2</span> Fund & Confirm Stake
          </h3>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setPaymentMethod('crypto_deposit')}
              className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                paymentMethod === 'crypto_deposit'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" /> Direct Crypto Deposit
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('balance')}
              className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                paymentMethod === 'balance'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" /> Account Balance (${currentUser.balanceUsdt.toLocaleString()})
            </button>
          </div>

          <form onSubmit={handleStake} className="space-y-4 text-xs">
            {/* Amount Input */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="font-semibold text-slate-300">Investment Amount (USDT Value)</label>
                <span className="text-emerald-400 font-mono">
                  Range: ${selectedPlan.minDeposit.toLocaleString()} - ${selectedPlan.maxDeposit.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                min={selectedPlan.minDeposit}
                max={selectedPlan.maxDeposit}
                required
                value={stakeAmount}
                onChange={e => setStakeAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {paymentMethod === 'crypto_deposit' && (
              <div className="space-y-4 bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Select Deposit Cryptocurrency</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['USDT', 'BTC', 'ETH', 'SOL'].map(coin => (
                      <button
                        type="button"
                        key={coin}
                        onClick={() => setSelectedCrypto(coin)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                          selectedCrypto === coin
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {coin}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deposit Wallet Address Display */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-semibold text-slate-300">
                      Your Staking Wallet Address ({selectedCrypto})
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                      Verified Vault
                    </span>
                  </div>

                  <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-emerald-300 text-[11px] break-all select-all">
                      {depositAddress}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg shrink-0 transition"
                      title="Copy Address"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  {copied && <p className="text-[10px] text-emerald-400 font-bold">Address copied to clipboard!</p>}
                </div>

                {/* Optional/Required TxHash */}
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Blockchain Transaction Hash / TxID <span className="text-slate-500 font-normal">(Optional for faster verification)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 0x8a9b2c3d4e5f..."
                    value={txHash}
                    onChange={e => setTxHash(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" /> Deposit Approval Notice
                  </div>
                  <p>
                    Send exactly <strong className="text-white">${stakeAmount.toLocaleString()}</strong> worth of {selectedCrypto} to the address above. Your plan will be approved and set active by the Admin once confirmed on the blockchain.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {paymentMethod === 'crypto_deposit'
                ? `Submit Staking Deposit of $${stakeAmount.toLocaleString()} USDT`
                : `Confirm Balance Stake of $${stakeAmount.toLocaleString()} USDT`}
            </button>
          </form>
        </div>
      </div>

      {/* User Investments List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center justify-between">
          <span>Your Staking Portfolios & Deposits</span>
          <span className="text-xs font-normal text-slate-400 font-mono">
            Total Stakes: {userInvestments.length}
          </span>
        </h3>

        {userInvestments.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No active or pending investment stakes logged yet.</p>
        ) : (
          <div className="space-y-3">
            {userInvestments.map(inv => {
              const isPending = inv.status === 'pending';
              const isRejected = inv.status === 'rejected';

              return (
                <div
                  key={inv.id}
                  className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs transition ${
                    isPending
                      ? 'bg-amber-500/5 border-amber-500/30 text-amber-200'
                      : isRejected
                      ? 'bg-red-500/5 border-red-500/30 text-red-200'
                      : 'bg-slate-950 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{inv.planName}</span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                          isPending
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : isRejected
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {isPending ? 'Pending Admin Approval' : inv.status}
                      </span>
                    </div>

                    <p className="text-slate-400 font-mono text-[11px]">
                      Submitted: {new Date(inv.startDate).toLocaleString()} • Method: {inv.paymentMethod === 'crypto_deposit' ? `Crypto (${inv.cryptoAsset || 'USDT'})` : 'Account Balance'}
                    </p>

                    {inv.txHash && (
                      <p className="text-[11px] font-mono text-emerald-400/90 break-all">
                        TxHash: {inv.txHash}
                      </p>
                    )}

                    {isPending && (
                      <p className="text-[11px] text-amber-400/90 flex items-center gap-1 font-medium pt-1">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        Admin is reviewing your deposit address transaction. Earnings start as soon as approved!
                      </p>
                    )}

                    {isRejected && inv.rejectionReason && (
                      <p className="text-[11px] text-red-400 font-medium pt-1">
                        Reason: {inv.rejectionReason}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <p className="font-bold font-mono text-sm text-emerald-400">
                      ${inv.amountInvested.toLocaleString()} USDT
                    </p>
                    <p className="text-teal-300 font-mono text-xs">
                      +{inv.roiPercentage}% ROI Rate
                    </p>
                    {!isPending && !isRejected && (
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Profit Earned: ${inv.totalProfitEarned.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

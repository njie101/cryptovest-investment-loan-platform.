import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Landmark,
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Lock,
  BadgeDollarSign,
  HelpCircle
} from 'lucide-react';

export const Services: React.FC = () => {
  const { openAuthModal, investmentPlans, cryptoPrices } = useApp();

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(5000);
  const [selectedCollateral, setSelectedCollateral] = useState<string>('BTC');
  const [durationMonths, setDurationMonths] = useState<number>(6);

  const selectedCoin = cryptoPrices.find(c => c.symbol === selectedCollateral) || cryptoPrices[0];
  // 65% LTV requirement
  const requiredUsdCollateral = loanAmount / 0.65;
  const requiredCryptoAmount = requiredUsdCollateral / selectedCoin.priceUsd;
  const monthlyInterestRate = 0.055 / 12; // 5.5% annual
  const monthlyInterestUsd = loanAmount * monthlyInterestRate;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Coins className="w-4 h-4" /> Institutional Crypto Products
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Yield & Loan Infrastructure
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Maximize capital efficiency with automated high-yield arbitrage investments or obtain non-taxable cash loans backed by your digital assets.
          </p>
        </div>

        {/* SECTION 1: INVESTMENT SERVICES */}
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Managed Crypto Investment Plans</h2>
              <p className="text-xs text-slate-400">Fixed ROI interest rates backed by multi-exchange arbitrage execution</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentPlans.map(plan => (
              <div
                key={plan.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white">{plan.name}</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {plan.roiPercentage}% ROI
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-4">
                    Lock period: <span className="text-white font-medium">{plan.durationDays} Days</span> ({plan.payoutFrequency} payouts)
                  </p>

                  <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1.5 border border-slate-800/80 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Min Stake:</span>
                      <span className="text-white font-mono font-bold">${plan.minDeposit.toLocaleString()} USDT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Stake:</span>
                      <span className="text-white font-mono font-bold">${plan.maxDeposit.toLocaleString()} USDT</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => openAuthModal('register')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition"
                >
                  Stake in {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CRYPTO LOAN SERVICE & CALCULATOR */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Crypto Collateral Loan Engine</h2>
              <p className="text-xs text-slate-400">Borrow USDT or USD instantly against your BTC, ETH, or SOL holding</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Desired Loan Amount (USDT)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    min={500}
                    max={100000}
                    step={250}
                    value={loanAmount}
                    onChange={e => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Collateral Crypto Asset</label>
                  <select
                    value={selectedCollateral}
                    onChange={e => setSelectedCollateral(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {cryptoPrices.map(c => (
                      <option key={c.symbol} value={c.symbol}>
                        {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Loan Duration</label>
                  <select
                    value={durationMonths}
                    onChange={e => setDurationMonths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months</option>
                    <option value={24}>24 Months</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Required LTV Ratio:</span>
                  <span className="text-white font-semibold">65% LTV</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Estimated Annual Interest:</span>
                  <span className="text-amber-400 font-semibold font-mono">5.5% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Liquidation Margin Threshold:</span>
                  <span className="text-emerald-400 font-semibold">85% Protection Level</span>
                </div>
              </div>
            </div>

            {/* Loan Estimate Card */}
            <div className="lg:col-span-6 bg-slate-950 border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider text-amber-400 pb-3 border-b border-slate-800">
                Loan Terms Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Loan Disbursal Amount</span>
                  <span className="font-mono text-base font-bold text-white">${loanAmount.toLocaleString()} USDT</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Required Collateral Deposit</span>
                  <span className="font-mono text-base font-bold text-amber-400">
                    {requiredCryptoAmount.toFixed(4)} {selectedCollateral}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Collateral USD Value</span>
                  <span className="font-mono text-slate-300">${requiredUsdCollateral.toLocaleString('en-US', { maximumFractionDigits: 2 })} USD</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Interest Payment</span>
                  <span className="font-mono text-slate-300">${monthlyInterestUsd.toFixed(2)} USDT / month</span>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg"
              >
                Submit Crypto Loan Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

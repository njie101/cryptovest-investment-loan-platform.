import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Coins,
  BadgeDollarSign,
  ArrowRight,
  CheckCircle2,
  Lock,
  Percent,
  Calculator,
  UserCheck,
  CircleDollarSign,
  Landmark
} from 'lucide-react';

export const Home: React.FC = () => {
  const { openAuthModal, setActivePage, investmentPlans, cryptoPrices } = useApp();

  // Profit Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(3000);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan_growth');

  const selectedPlan = investmentPlans.find(p => p.id === selectedPlanId) || investmentPlans[1];
  const totalReturn = calcAmount * (1 + selectedPlan.roiPercentage / 100);
  const netProfit = calcAmount * (selectedPlan.roiPercentage / 100);
  const dailyProfit = netProfit / selectedPlan.durationDays;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-slate-800/80">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Licensed & Insured Crypto Asset Management
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Grow Your Wealth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Institutional Crypto Yields</span> & Loans
              </h1>

              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Deposit crypto or stablecoins to earn up to <span className="text-emerald-400 font-bold">42% ROI</span> in 30 days, or unlock instant cash liquidity through crypto-backed loans with zero credit checks.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => openAuthModal('register')}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-base shadow-xl shadow-emerald-950/60 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Start Investing Today
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivePage('services')}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold rounded-xl text-base transition flex items-center justify-center gap-2"
                >
                  Explore Crypto Loans
                </button>
              </div>

              {/* Key Highlights row */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-bold text-white">$142M+</p>
                  <p className="text-xs text-slate-400">Assets Managed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">100%</p>
                  <p className="text-xs text-slate-400">Principal Backed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">&lt; 15 Mins</p>
                  <p className="text-xs text-slate-400">Admin Clearance</p>
                </div>
              </div>
            </div>

            {/* Right Card Widget */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-bold text-white">Live Asset Markets</h3>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Real-Time Feed
                  </span>
                </div>

                <div className="space-y-3">
                  {cryptoPrices.map(coin => (
                    <div key={coin.symbol} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-lg text-emerald-400">
                          {coin.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">{coin.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold font-mono text-sm text-white">
                          ${coin.priceUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                        <p className={`text-xs font-semibold ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-300">Need Instant Fiat or USDT Liquidity?</p>
                    <p className="text-sm font-bold text-emerald-400">Borrow against your Crypto with 0% Liquidation risk</p>
                  </div>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shrink-0"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFIT CALCULATOR SECTION */}
      <section className="py-16 md:py-24 bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" /> Interactive Yield Estimator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Calculate Your Investment Returns</h2>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">
              Select an investment tier and drag the slider to estimate your potential profits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {/* Controls Left */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Select Investment Tier</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {investmentPlans.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        if (calcAmount < plan.minDeposit) setCalcAmount(plan.minDeposit);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition ${
                        selectedPlanId === plan.id
                          ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-950/40'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{plan.name}</p>
                      <p className="text-lg font-bold text-white mt-1">{plan.roiPercentage}% ROI</p>
                      <p className="text-[11px] text-slate-400">{plan.durationDays} Days Duration</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-slate-300">Deposit Amount (USDT)</label>
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    ${calcAmount.toLocaleString()} USDT
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedPlan.minDeposit}
                  max={selectedPlan.maxDeposit}
                  step={250}
                  value={calcAmount}
                  onChange={e => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 font-mono">
                  <span>Min: ${selectedPlan.minDeposit.toLocaleString()}</span>
                  <span>Max: ${selectedPlan.maxDeposit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Results Right */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
                Estimated Returns Breakdown
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Initial Stake</span>
                  <span className="font-mono font-semibold text-white">${calcAmount.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Target ROI Rate</span>
                  <span className="font-mono font-semibold text-emerald-400">+{selectedPlan.roiPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Estimated Daily Credit</span>
                  <span className="font-mono font-semibold text-teal-300">${dailyProfit.toFixed(2)} USDT / day</span>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Total Payout</span>
                  <span className="text-2xl font-mono font-extrabold text-emerald-400">
                    ${totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-950/50"
              >
                Deposit & Stake ${calcAmount.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT PLANS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <CircleDollarSign className="w-3.5 h-3.5" /> High-Yield Tiers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Tailored Investment Portfolios</h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Guaranteed daily yields managed by quantitative trading algorithms with manual admin verification for 100% security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investmentPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 border relative flex flex-col justify-between transition transform hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-slate-900 border-emerald-500/80 shadow-2xl shadow-emerald-950/50 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-extrabold uppercase px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 my-4">
                  <span className="text-4xl font-extrabold text-emerald-400">{plan.roiPercentage}%</span>
                  <span className="text-sm font-semibold text-slate-400">Total ROI</span>
                </div>
                <p className="text-xs text-slate-400 mb-6 pb-6 border-b border-slate-800">
                  Duration: <span className="text-white font-semibold">{plan.durationDays} Days</span> ({plan.payoutFrequency} Payouts)
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-center mb-4 text-xs text-slate-400 font-mono">
                  Min ${plan.minDeposit.toLocaleString()} – Max ${plan.maxDeposit.toLocaleString()}
                </div>
                <button
                  onClick={() => openAuthModal('register')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition shadow-lg ${
                    plan.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950/50'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CRYPTO LOANS HIGHLIGHT */}
      <section className="py-16 bg-slate-900/80 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                <Landmark className="w-3.5 h-3.5" /> Crypto Collateral Loans
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Unlock Liquidity Without Selling Your Crypto
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Need cash for real estate, personal expenses, or business investments? Stake BTC, ETH, or SOL as collateral and receive instant USDT or USD loan disbursals directly to your wallet or balance with flexible 6-24 month terms.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">No Credit Checks Required</p>
                    <p className="text-xs text-slate-400">Approval based solely on submitted crypto collateral ratio</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">100% Segregated Cold Storage</p>
                    <p className="text-xs text-slate-400">Your collateral assets are safely locked in insured cold vaults</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openAuthModal('register')}
                className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition"
              >
                Apply for Crypto Loan
              </button>
            </div>

            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-white text-lg border-b border-slate-800 pb-3">Loan Approval Simulator</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Loan Amount Requested</span>
                  <span className="font-mono text-white font-bold">$10,000 USDT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Required Collateral (BTC)</span>
                  <span className="font-mono text-emerald-400 font-bold">0.15 BTC ($13,117 USD)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Annual Interest Rate</span>
                  <span className="font-mono text-white font-bold">5.5% p.a.</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Term Duration</span>
                  <span className="font-mono text-white font-bold">12 Months</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Estimated Admin Disbursal</span>
                  <span className="font-mono text-emerald-400 font-bold">Instant upon Approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
            <UserCheck className="w-3.5 h-3.5" /> Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How CryptoVest Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">1</span>
            <h4 className="font-bold text-white">Create Account</h4>
            <p className="text-xs text-slate-400">Sign up in seconds with basic credentials and set up secure access.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">2</span>
            <h4 className="font-bold text-white">Submit KYC ID</h4>
            <p className="text-xs text-slate-400">Upload official photo ID for admin compliance review and instant clearance.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">3</span>
            <h4 className="font-bold text-white">Deposit & Stake</h4>
            <p className="text-xs text-slate-400">Send BTC, ETH, USDT or SOL to designated system wallet and choose plan.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center">4</span>
            <h4 className="font-bold text-white">Earn & Withdraw</h4>
            <p className="text-xs text-slate-400">Watch daily yield accumulate and request manual admin withdrawal anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

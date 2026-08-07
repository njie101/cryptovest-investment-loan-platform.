import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Award, Users, Building2, Globe, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { openAuthModal } = useApp();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Building2 className="w-4 h-4" /> About CryptoVest
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Building the Standard in Institutional Yield & Liquidity
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Founded in 2021 by veterans of algorithmic trading and quantitative finance, CryptoVest provides a transparent bridge between traditional capital security and high-efficiency crypto yields.
          </p>
        </div>

        {/* Vision & Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Cold Storage Security</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              98% of platform assets are secured in multi-signature cold storage vaults distributed geographically across Tier-4 data centers with $250M insurance coverage.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Quantitative Execution</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our automated yield engine captures risk-free cross-exchange spreads and staking rewards, delivering consistent daily returns to client portfolios.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Manual Admin Oversight</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              To eliminate automated smart contract exploits, every deposit, withdrawal, and loan approval is manually reviewed and signed off by compliance administrators.
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">CryptoVest by the Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">$140M+</p>
              <p className="text-xs text-slate-400 mt-1">Total Payouts Completed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">48,000+</p>
              <p className="text-xs text-slate-400 mt-1">Active Investors Worldwide</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">99.9%</p>
              <p className="text-xs text-slate-400 mt-1">KYC Approval Rate</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">24/7</p>
              <p className="text-xs text-slate-400 mt-1">Live Human Support</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-white">Ready to start earning daily crypto yields?</h2>
          <button
            onClick={() => openAuthModal('register')}
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-xl"
          >
            Create Your Free Account
          </button>
        </div>
      </div>
    </div>
  );
};

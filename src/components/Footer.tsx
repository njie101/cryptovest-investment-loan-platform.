import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, ShieldCheck, Lock, Mail, Phone, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, openAuthModal } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-md shadow-emerald-900/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Crypto<span className="text-emerald-400">Vest</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Next-generation institutional crypto yield & collateralized loan infrastructure. Capitalize on high-yield crypto arbitrage while maintaining 100% principal backing and instant liquid loans.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Audited Smart Contracts
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Lock className="w-4 h-4 text-emerald-400" />
                $250M Insurance Fund
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-emerald-400 transition flex items-center gap-1">
                  Home Platform <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100" />
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-emerald-400 transition">
                  Investment Yield Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-emerald-400 transition">
                  Crypto Collateral Loans
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-emerald-400 transition">
                  Security & Cold Storage
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-emerald-400 transition">
                  Help Center & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Services</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => openAuthModal('register')} className="hover:text-emerald-400 transition">
                  Account Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-emerald-400 transition">
                  Starter Plan (8.5% ROI)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-emerald-400 transition">
                  Growth Plan (18% ROI)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-emerald-400 transition">
                  VIP Plan (42% ROI)
                </button>
              </li>
              <li>
                <button onClick={() => openAuthModal('login')} className="hover:text-emerald-400 transition">
                  Instant Deposit / Withdraw
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Financial District Tower, Suite 4200, New York, NY 10005</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@cryptovest.io</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 582-9420</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CryptoVest Inc. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Disclaimer: Cryptocurrency trading and investments involve substantial risk of loss. Yield estimates are calculated based on algorithmic arbitrage strategies.
          </p>
        </div>
      </div>
    </footer>
  );
};

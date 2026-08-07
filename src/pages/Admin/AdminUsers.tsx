import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, TrendingUp, Wallet, Landmark, ShieldCheck, CheckCircle2, Sparkles, Edit3, Coins, Globe, Copy, Check } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const {
    users,
    addProfitToUser,
    updateUserBalance,
    updateUserLoanBalance,
    approveKyc,
    updateUserWalletAddresses,
    cryptoPrices,
    updateCryptoDepositAddress
  } = useApp();

  const clientUsers = users.filter(u => u.role === 'user');

  const [selectedUserId, setSelectedUserId] = useState<string>(clientUsers[0]?.id || '');
  const [profitAmount, setProfitAmount] = useState<number>(250);
  const [profitNotes, setProfitNotes] = useState<string>('Weekly Performance Bonus');
  const [newBalance, setNewBalance] = useState<number>(10000);
  const [newLoanBalance, setNewLoanBalance] = useState<number>(0);
  const [profitMsg, setProfitMsg] = useState<string | null>(null);

  // Client deposit wallet address states
  const [clientBtcAddress, setClientBtcAddress] = useState<string>('');
  const [clientEthAddress, setClientEthAddress] = useState<string>('');
  const [clientUsdtAddress, setClientUsdtAddress] = useState<string>('');
  const [clientSolAddress, setClientSolAddress] = useState<string>('');

  // Global default wallet states
  const [globalBtc, setGlobalBtc] = useState<string>('');
  const [globalEth, setGlobalEth] = useState<string>('');
  const [globalUsdt, setGlobalUsdt] = useState<string>('');
  const [globalSol, setGlobalSol] = useState<string>('');
  const [showGlobalModal, setShowGlobalModal] = useState<boolean>(false);

  const activeUser = users.find(u => u.id === selectedUserId) || clientUsers[0];

  useEffect(() => {
    if (activeUser) {
      setClientBtcAddress(activeUser.walletAddresses?.btc || '');
      setClientEthAddress(activeUser.walletAddresses?.eth || '');
      setClientUsdtAddress(activeUser.walletAddresses?.usdt || '');
      setClientSolAddress(activeUser.walletAddresses?.sol || '');
    }
  }, [selectedUserId, activeUser]);

  useEffect(() => {
    const btc = cryptoPrices.find(c => c.symbol === 'BTC')?.depositAddress || '';
    const eth = cryptoPrices.find(c => c.symbol === 'ETH')?.depositAddress || '';
    const usdt = cryptoPrices.find(c => c.symbol === 'USDT')?.depositAddress || '';
    const sol = cryptoPrices.find(c => c.symbol === 'SOL')?.depositAddress || '';
    setGlobalBtc(btc);
    setGlobalEth(eth);
    setGlobalUsdt(usdt);
    setGlobalSol(sol);
  }, [cryptoPrices]);

  const handleInjectProfit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;
    addProfitToUser(activeUser.id, profitAmount, profitNotes);
    setProfitMsg(`Successfully credited +$${profitAmount.toLocaleString()} USDT profit to ${activeUser.name}!`);
  };

  const handleUpdateBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;
    updateUserBalance(activeUser.id, newBalance);
    setProfitMsg(`Updated ${activeUser.name}'s main balance to $${newBalance.toLocaleString()} USDT.`);
  };

  const handleUpdateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;
    updateUserLoanBalance(activeUser.id, newLoanBalance);
    setProfitMsg(`Updated ${activeUser.name}'s loan debt level to $${newLoanBalance.toLocaleString()} USDT.`);
  };

  const handleSaveClientWallets = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) return;
    updateUserWalletAddresses(activeUser.id, {
      btc: clientBtcAddress.trim(),
      eth: clientEthAddress.trim(),
      usdt: clientUsdtAddress.trim(),
      sol: clientSolAddress.trim()
    });
    setProfitMsg(`Assigned deposit wallet addresses updated for client "${activeUser.name}"!`);
  };

  const handleSaveGlobalWallets = (e: React.FormEvent) => {
    e.preventDefault();
    updateCryptoDepositAddress('BTC', globalBtc.trim());
    updateCryptoDepositAddress('ETH', globalEth.trim());
    updateCryptoDepositAddress('USDT', globalUsdt.trim());
    updateCryptoDepositAddress('SOL', globalSol.trim());
    setProfitMsg('Updated global default platform cold vault deposit addresses!');
    setShowGlobalModal(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" /> Client Management & Wallet Assignment
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Assign custom deposit wallet addresses to specific clients, add ROI profit credits, or adjust account balance levels.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowGlobalModal(true)}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold rounded-2xl text-xs flex items-center gap-2 shrink-0 transition"
        >
          <Globe className="w-4 h-4 text-emerald-400" /> Default Platform Cold Wallets
        </button>
      </div>

      {profitMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{profitMsg}</span>
        </div>
      )}

      {/* GLOBAL DEFAULT WALLETS MODAL */}
      {showGlobalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" /> Platform Default Cold Vault Addresses
              </h3>
              <button
                type="button"
                onClick={() => setShowGlobalModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-300">
              These are the system-wide platform cold vault deposit addresses. They are displayed to clients who do not have an individually assigned custom wallet address.
            </p>

            <form onSubmit={handleSaveGlobalWallets} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">USDT (TRC20) Default Address</label>
                <input
                  type="text"
                  required
                  value={globalUsdt}
                  onChange={e => setGlobalUsdt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Bitcoin (BTC) Default Address</label>
                <input
                  type="text"
                  required
                  value={globalBtc}
                  onChange={e => setGlobalBtc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Ethereum (ETH) Default Address</label>
                <input
                  type="text"
                  required
                  value={globalEth}
                  onChange={e => setGlobalEth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Solana (SOL) Default Address</label>
                <input
                  type="text"
                  required
                  value={globalSol}
                  onChange={e => setGlobalSol(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
                >
                  Save Global Default Wallets
                </button>
                <button
                  type="button"
                  onClick={() => setShowGlobalModal(false)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Select Left */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Select Client Account</h3>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {clientUsers.map(u => (
              <div
                key={u.id}
                onClick={() => {
                  setSelectedUserId(u.id);
                  setNewBalance(u.balanceUsdt);
                  setNewLoanBalance(u.activeLoanBalance);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  selectedUserId === u.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-bold text-sm text-white">{u.name}</p>
                  <span
                    className={`capitalize text-[10px] font-semibold px-2 py-0.5 rounded ${
                      u.kycStatus === 'verified'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    KYC {u.kycStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{u.email}</p>
                <div className="mt-2 pt-2 border-t border-slate-800/80 grid grid-cols-2 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block text-[9px]">MAIN BALANCE</span>
                    <span className="text-emerald-400 font-bold">${u.balanceUsdt.toLocaleString()} USDT</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block text-[9px]">TOTAL PROFIT</span>
                    <span className="text-teal-300 font-bold">+${u.totalProfit.toLocaleString()} USDT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls Right */}
        {activeUser && (
          <div className="lg:col-span-7 space-y-6">
            {/* Account Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-lg">{activeUser.name}</h3>
                  <p className="text-xs text-slate-400">{activeUser.email} • ID: {activeUser.id}</p>
                </div>
                {activeUser.kycStatus !== 'verified' && (
                  <button
                    onClick={() => approveKyc(activeUser.id)}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30"
                  >
                    Set KYC Verified
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Current Balance</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">
                    ${activeUser.balanceUsdt.toLocaleString()} USDT
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Total Profit</span>
                  <span className="font-bold text-teal-300 font-mono text-sm">
                    +${activeUser.totalProfit.toLocaleString()} USDT
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Active Loan Debt</span>
                  <span className="font-bold text-amber-300 font-mono text-sm">
                    ${activeUser.activeLoanBalance.toLocaleString()} USDT
                  </span>
                </div>
              </div>
            </div>

            {/* FORM 1: Assign Client Deposit Wallet Addresses */}
            <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-400" /> Assign Client Deposit Wallet Addresses
                </h4>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Client: {activeUser.name}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                Set custom deposit wallet addresses for <strong className="text-white">{activeUser.name}</strong>. When this client attempts a deposit, they will be given these exact wallet addresses.
              </p>

              <form onSubmit={handleSaveClientWallets} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">USDT (TRC20) Address</label>
                    <input
                      type="text"
                      placeholder="e.g. TYDzsY22A3YqS3K87C2e9W9jM1Vq3xL4pZ"
                      value={clientUsdtAddress}
                      onChange={e => setClientUsdtAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Bitcoin (BTC) Address</label>
                    <input
                      type="text"
                      placeholder="e.g. bc1q9v83f4k2lx7z9p0m1n2b3c4v5x6z7a8b9c0d1e"
                      value={clientBtcAddress}
                      onChange={e => setClientBtcAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Ethereum (ETH) Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
                      value={clientEthAddress}
                      onChange={e => setClientEthAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Solana (SOL) Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 7Xw9k1n2m3b4v5c6x7z8a9b0c1d2e3f4g5h6j7k8"
                      value={clientSolAddress}
                      onChange={e => setClientSolAddress(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Save Assigned Deposit Wallets for {activeUser.name}
                </button>
              </form>
            </div>

            {/* FORM 2: Manually Inject Profit */}
            <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
              <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-4 h-4" /> Manually Add Profit / ROI Yield
              </h4>

              <form onSubmit={handleInjectProfit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Profit Amount (USDT)</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={profitAmount}
                      onChange={e => setProfitAmount(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Profit Notes / Source</label>
                    <input
                      type="text"
                      required
                      value={profitNotes}
                      onChange={e => setProfitNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-950/40"
                >
                  Credit +${profitAmount.toLocaleString()} USDT Profit Now
                </button>
              </form>
            </div>

            {/* FORM 2: Direct Balance Override */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
                <Edit3 className="w-4 h-4 text-amber-400" /> Direct Balance Levels Adjustment
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form onSubmit={handleUpdateBalance} className="space-y-2 text-xs">
                  <label className="block font-semibold text-slate-300">Set Main Balance (USDT)</label>
                  <input
                    type="number"
                    min={0}
                    value={newBalance}
                    onChange={e => setNewBalance(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                  <button type="submit" className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs">
                    Update Balance
                  </button>
                </form>

                <form onSubmit={handleUpdateLoan} className="space-y-2 text-xs">
                  <label className="block font-semibold text-slate-300">Set Active Loan Debt (USDT)</label>
                  <input
                    type="number"
                    min={0}
                    value={newLoanBalance}
                    onChange={e => setNewLoanBalance(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                  <button type="submit" className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs">
                    Update Loan Balance
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

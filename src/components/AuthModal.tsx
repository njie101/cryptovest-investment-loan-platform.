import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User as UserIcon, Sparkles, AlertCircle } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, login, register, openAuthModal } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      const ok = login(email, password);
      if (!ok) {
        setError('Invalid credentials. Try using one of the quick fill demo buttons below.');
      }
    } else {
      if (!name.trim() || !email.trim()) {
        setError('Please fill in all required fields');
        return;
      }
      const ok = register(name, email, password);
      if (!ok) {
        setError('An account with this email address already exists.');
      }
    }
  };

  const handleFillDemoUser = () => {
    setEmail('user@cryptovest.io');
    setPassword('user123');
    login('user@cryptovest.io', 'user123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto mb-3 shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {authMode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login'
              ? 'Access your crypto portfolio & investment dashboard'
              : 'Join thousands of investors securing daily crypto returns'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-emerald-950/50 transition"
          >
            {authMode === 'login' ? 'Sign In to Dashboard' : 'Complete Registration'}
          </button>
        </form>

        {/* Quick Demo Credentials Autofill */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Quick Client One-Click Demo Login
          </p>
          <button
            type="button"
            onClick={handleFillDemoUser}
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
          >
            Log In as Demo Client
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-slate-400">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => openAuthModal('register')} className="text-emerald-400 font-semibold hover:underline">
                Register now
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button onClick={() => openAuthModal('login')} className="text-emerald-400 font-semibold hover:underline">
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

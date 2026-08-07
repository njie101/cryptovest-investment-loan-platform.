import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InvestmentPlan } from '../../types';
import {
  Coins,
  Check,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Edit3,
  Flame,
  RotateCcw
} from 'lucide-react';

export const AdminPlans: React.FC = () => {
  const {
    investmentPlans,
    updateInvestmentPlan,
    addInvestmentPlan,
    deleteInvestmentPlan
  } = useApp();

  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // New feature text for editing plan
  const [newFeatureText, setNewFeatureText] = useState<string>('');

  // New Plan Modal / Form state
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newPlan, setNewPlan] = useState<Omit<InvestmentPlan, 'id'>>({
    name: 'Pro Arbitrage Tier',
    roiPercentage: 25.0,
    durationDays: 21,
    payoutFrequency: 'Daily',
    minDeposit: 5000,
    maxDeposit: 50000,
    popular: false,
    features: [
      '25% Total ROI in 21 Days',
      'Daily Profit Crediting',
      'Dedicated Portfolio Manager',
      'Instant Withdrawal Clearance'
    ]
  });
  const [newPlanFeatureInput, setNewPlanFeatureInput] = useState<string>('');

  const handleStartEdit = (plan: InvestmentPlan) => {
    setEditingPlan({ ...plan, features: [...plan.features] });
    setNewFeatureText('');
    setIsCreatingNew(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    updateInvestmentPlan(editingPlan);
    setSuccessMsg(`Successfully updated "${editingPlan.name}" investment plan!`);
    setEditingPlan(null);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleAddFeatureToEditing = () => {
    if (!newFeatureText.trim() || !editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, newFeatureText.trim()]
    });
    setNewFeatureText('');
  };

  const handleRemoveFeatureFromEditing = (index: number) => {
    if (!editingPlan) return;
    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, idx) => idx !== index)
    });
  };

  const handleUpdateFeatureText = (index: number, text: string) => {
    if (!editingPlan) return;
    const updated = [...editingPlan.features];
    updated[index] = text;
    setEditingPlan({
      ...editingPlan,
      features: updated
    });
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    addInvestmentPlan(newPlan);
    setSuccessMsg(`Created new plan "${newPlan.name}"!`);
    setIsCreatingNew(false);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleAddFeatureToNewPlan = () => {
    if (!newPlanFeatureInput.trim()) return;
    setNewPlan({
      ...newPlan,
      features: [...newPlan.features, newPlanFeatureInput.trim()]
    });
    setNewPlanFeatureInput('');
  };

  const handleRemoveFeatureFromNewPlan = (index: number) => {
    setNewPlan({
      ...newPlan,
      features: newPlan.features.filter((_, idx) => idx !== index)
    });
  };

  const handleDelete = (planId: string, planName: string) => {
    if (window.confirm(`Are you sure you want to delete the "${planName}" plan?`)) {
      deleteInvestmentPlan(planId);
      if (editingPlan?.id === planId) setEditingPlan(null);
      setSuccessMsg(`Deleted plan "${planName}".`);
      setTimeout(() => setSuccessMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-emerald-400" /> Managed Crypto Investment Plans
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Edit plan titles, ROI rates, duration periods, min/max deposit limits, and feature bullet points. Changes update live across the app.
          </p>
        </div>

        <button
          onClick={() => {
            setIsCreatingNew(true);
            setEditingPlan(null);
          }}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shrink-0 transition shadow-lg shadow-emerald-950/40"
        >
          <Plus className="w-4 h-4" /> Add New Plan
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* CREATE NEW PLAN FORM */}
      {isCreatingNew && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" /> Create New Investment Plan
            </h3>
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreatePlan} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">ROI Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newPlan.roiPercentage}
                  onChange={e => setNewPlan({ ...newPlan, roiPercentage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Lock Duration (Days)</label>
                <input
                  type="number"
                  required
                  value={newPlan.durationDays}
                  onChange={e => setNewPlan({ ...newPlan, durationDays: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Min Stake (USDT)</label>
                <input
                  type="number"
                  required
                  value={newPlan.minDeposit}
                  onChange={e => setNewPlan({ ...newPlan, minDeposit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Max Stake (USDT)</label>
                <input
                  type="number"
                  required
                  value={newPlan.maxDeposit}
                  onChange={e => setNewPlan({ ...newPlan, maxDeposit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payout Frequency</label>
                <select
                  value={newPlan.payoutFrequency}
                  onChange={e => setNewPlan({ ...newPlan, payoutFrequency: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPlan.popular || false}
                  onChange={e => setNewPlan({ ...newPlan, popular: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                Mark as "Most Popular" Tier
              </label>
            </div>

            {/* Features List for New Plan */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block font-semibold text-slate-300">Plan Features Bullet Points</label>
              <div className="space-y-2">
                {newPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="flex-1 text-slate-200">{feat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeatureFromNewPlan(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="e.g. 24/7 VIP Portfolio Manager"
                  value={newPlanFeatureInput}
                  onChange={e => setNewPlanFeatureInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeatureToNewPlan}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Bullet
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
              >
                Save & Add Plan
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDITING PLAN MODAL / CARD */}
      {editingPlan && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fade-in">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-amber-400 text-lg flex items-center gap-2">
              <Edit3 className="w-5 h-5" /> Editing Plan: <span className="text-white">{editingPlan.name}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingPlan(null)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel Edit
            </button>
          </div>

          <form onSubmit={handleSaveEdit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Plan Name</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">ROI Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editingPlan.roiPercentage}
                  onChange={e => setEditingPlan({ ...editingPlan, roiPercentage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Lock Duration (Days)</label>
                <input
                  type="number"
                  required
                  value={editingPlan.durationDays}
                  onChange={e => setEditingPlan({ ...editingPlan, durationDays: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Min Stake (USDT)</label>
                <input
                  type="number"
                  required
                  value={editingPlan.minDeposit}
                  onChange={e => setEditingPlan({ ...editingPlan, minDeposit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Max Stake (USDT)</label>
                <input
                  type="number"
                  required
                  value={editingPlan.maxDeposit}
                  onChange={e => setEditingPlan({ ...editingPlan, maxDeposit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Payout Frequency</label>
                <select
                  value={editingPlan.payoutFrequency}
                  onChange={e => setEditingPlan({ ...editingPlan, payoutFrequency: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingPlan.popular || false}
                  onChange={e => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                Mark as "Most Popular" Tier
              </label>
            </div>

            {/* Editable Features List */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block font-semibold text-slate-300">Edit Bullet Points & Features</label>
              <div className="space-y-2">
                {editingPlan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={feat}
                      onChange={e => handleUpdateFeatureText(idx, e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeatureFromEditing(idx)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove feature"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add new feature line..."
                  value={newFeatureText}
                  onChange={e => setNewFeatureText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeatureToEditing}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Feature
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Save Changes to {editingPlan.name}
              </button>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PLAN CARDS GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investmentPlans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 border relative flex flex-col justify-between transition ${
              plan.popular
                ? 'bg-slate-900 border-emerald-500/80 shadow-xl ring-1 ring-emerald-500/30'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Flame className="w-3 h-3" /> Most Popular
              </div>
            )}

            <div>
              <div className="flex justify-between items-start my-2">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {plan.roiPercentage}% ROI
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                Lock period: <span className="text-white font-semibold">{plan.durationDays} Days</span> ({plan.payoutFrequency} payouts)
              </p>

              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 font-mono border border-slate-800 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Min Stake:</span>
                  <span className="text-white font-bold">${plan.minDeposit.toLocaleString()} USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Max Stake:</span>
                  <span className="text-white font-bold">${plan.maxDeposit.toLocaleString()} USDT</span>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 mb-6">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Admin Actions for this card */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => handleStartEdit(plan)}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit This Area
              </button>
              <button
                onClick={() => handleDelete(plan.id, plan.name)}
                className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl border border-red-500/30 transition"
                title="Delete Plan"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

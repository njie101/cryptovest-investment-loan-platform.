import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Upload, AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react';

export const KycTab: React.FC = () => {
  const { currentUser, submitKyc } = useApp();

  const [fullName, setFullName] = useState(currentUser?.kycData?.fullName || currentUser?.name || '');
  const [idType, setIdType] = useState<'passport' | 'driver_license' | 'national_id'>(currentUser?.kycData?.idType || 'passport');
  const [idNumber, setIdNumber] = useState(currentUser?.kycData?.idNumber || '');
  const [country, setCountry] = useState(currentUser?.kycData?.country || 'United States');
  const [previewFront, setPreviewFront] = useState<string>(currentUser?.kycData?.documentFrontUrl || '');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!currentUser) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFront(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKyc({
      fullName,
      idType,
      idNumber,
      country,
      documentFrontUrl: previewFront || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
    });
    setSubmittedMessage(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Identity Verification (KYC)
          </h2>
          <span
            className={`capitalize font-bold text-xs px-3 py-1 rounded-full border ${
              currentUser.kycStatus === 'verified'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : currentUser.kycStatus === 'pending'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : currentUser.kycStatus === 'rejected'
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {currentUser.kycStatus}
          </span>
        </div>
        <p className="text-xs text-slate-300">
          International anti-money laundering (AML) regulatory compliance requires account verification before processing high-volume withdrawals.
        </p>
      </div>

      {currentUser.kycStatus === 'verified' && (
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Your KYC Document is Fully Verified!</h3>
          </div>
          <p className="text-slate-300">
            Account verified for unlimited deposits, high-yield staking, and instant withdrawal processing.
          </p>
        </div>
      )}

      {currentUser.kycStatus === 'rejected' && currentUser.kycData?.rejectionReason && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-red-400">
            <AlertCircle className="w-5 h-5" /> KYC Submission Declined by Admin
          </div>
          <p className="text-slate-300">Reason: {currentUser.kycData.rejectionReason}</p>
          <p className="text-slate-400 text-[11px] pt-1">Please re-upload clearer document photos below.</p>
        </div>
      )}

      {(currentUser.kycStatus === 'unverified' || currentUser.kycStatus === 'rejected' || currentUser.kycStatus === 'pending') && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">Submit ID Verification Documents</h3>

          {submittedMessage && (
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Document submitted! Your status is now "Pending Admin Review".</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Country of Residence</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Document Type</label>
                <select
                  value={idType}
                  onChange={e => setIdType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="passport">International Passport</option>
                  <option value="driver_license">Driver's License</option>
                  <option value="national_id">National ID Card</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">ID Number</label>
                <input
                  type="text"
                  required
                  value={idNumber}
                  onChange={e => setIdNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Document Photo Upload Simulation */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Government ID Photo (Front)</label>
              <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/80 rounded-2xl p-6 text-center bg-slate-950 transition cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">Click or drag photo to upload</p>
                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG or WEBP up to 10MB</p>
              </div>

              {previewFront && (
                <div className="mt-3 p-2 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                  <img src={previewFront} alt="ID Preview" className="w-16 h-12 object-cover rounded-lg border" />
                  <span className="text-xs text-emerald-400 font-semibold">Photo Attached Ready</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg"
            >
              Submit Verification Documents
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

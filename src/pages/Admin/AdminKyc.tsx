import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Check, X, FileText, Eye } from 'lucide-react';

export const AdminKyc: React.FC = () => {
  const { users, approveKyc, rejectKyc } = useApp();
  const [rejectReason, setRejectReason] = useState<{ [key: string]: string }>({});

  const pendingKycUsers = users.filter(u => u.kycStatus === 'pending');
  const verifiedUsers = users.filter(u => u.kycStatus === 'verified');

  const handleReject = (userId: string) => {
    const reason = rejectReason[userId] || 'Document illegible or expired';
    rejectKyc(userId, reason);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-400" /> Pending KYC Verification Reviews
        </h2>
        <p className="text-xs text-slate-300">
          Inspect client identity documents for AML compliance. Approving grants full account status.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Pending Verification Requests ({pendingKycUsers.length})</h3>

        {pendingKycUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No pending KYC submissions.</div>
        ) : (
          <div className="space-y-4">
            {pendingKycUsers.map(u => (
              <div
                key={u.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white text-base">{u.kycData?.fullName || u.name}</p>
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 uppercase font-mono">
                      {u.kycData?.idType}
                    </span>
                  </div>
                  <p className="text-slate-400">Email: <span className="text-white">{u.email}</span></p>
                  <p className="text-slate-400">ID Number: <span className="text-white font-mono">{u.kycData?.idNumber}</span></p>
                  <p className="text-slate-400">Country: <span className="text-white">{u.kycData?.country}</span></p>

                  {u.kycData?.documentFrontUrl && (
                    <div className="pt-2 flex items-center gap-2">
                      <img
                        src={u.kycData.documentFrontUrl}
                        alt="Submitted ID"
                        className="w-24 h-16 object-cover rounded-lg border border-slate-700"
                      />
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Photo Document Attached
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 md:w-64">
                  <input
                    type="text"
                    placeholder="Rejection reason if declining..."
                    value={rejectReason[u.id] || ''}
                    onChange={e => setRejectReason({ ...rejectReason, [u.id]: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveKyc(u.id)}
                      className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-950/40"
                    >
                      <Check className="w-4 h-4" /> Approve KYC
                    </button>
                    <button
                      onClick={() => handleReject(u.id)}
                      className="py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-red-500/30"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base">Verified Accounts ({verifiedUsers.length})</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {verifiedUsers.map(u => (
            <div key={u.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
              <div>
                <p className="font-semibold text-white">{u.name} ({u.email})</p>
                <p className="text-[10px] text-slate-500">Verified ID: {u.kycData?.idNumber || 'Verified'}</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

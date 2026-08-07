import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Deposit / Withdrawal Inquiry');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does manual admin deposit approval take?',
      a: 'Deposits are verified against the provided transaction hash (TX Hash) by our admin compliance team within 10 to 30 minutes during standard operations.'
    },
    {
      q: 'How do I submit my KYC document for account clearance?',
      a: 'Go to your User Dashboard -> KYC Verification tab, select your ID type (Passport, Driver License, or National ID), enter your ID details, and upload front/back photo previews.'
    },
    {
      q: 'How are daily investment profits credited?',
      a: 'Once you stake in an investment plan (Starter, Growth, or VIP), yields accumulate daily into your total profit and available balance automatically.'
    },
    {
      q: 'Can I withdraw my profit and principal anytime?',
      a: 'Yes! Simply request a withdrawal from your User Dashboard. Once submitted, our Admin team verifies the destination address and releases the funds.'
    },
    {
      q: 'How does the Crypto Collateral Loan work?',
      a: 'You can request a loan by providing BTC, ETH, or SOL as collateral. Upon admin review, loan funds are disbursed directly into your main balance.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <MessageSquare className="w-4 h-4" /> 24/7 Client Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            We Are Here to Assist You
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Have questions about deposits, withdrawals, loan terms, or KYC verification? Reach out to our dedicated support specialists anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white">Send Us a Direct Message</h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">Message Received!</h3>
                <p className="text-xs text-slate-300">
                  Thank you for reaching out. A senior CryptoVest support manager will review your inquiry and respond within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Deposit / Withdrawal Inquiry">Deposit / Withdrawal Inquiry</option>
                    <option value="KYC Verification Assistance">KYC Verification Assistance</option>
                    <option value="Crypto Collateral Loan Request">Crypto Collateral Loan Request</option>
                    <option value="VIP Institutional Investment">VIP Institutional Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide relevant details regarding your request..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Support Ticket
                </button>
              </form>
            )}
          </div>

          {/* Right Info & Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-white text-lg border-b border-slate-800 pb-3">Global Headquarters</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">New York Office</p>
                    <p className="text-slate-400">Financial District Tower, Suite 4200, New York, NY 10005</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Email Clearance</p>
                    <p className="text-slate-400">support@cryptovest.io | admin@cryptovest.io</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Institutional Hotline</p>
                    <p className="text-slate-400">+1 (800) 582-9420 (Toll Free)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 font-semibold text-sm text-white flex justify-between items-center hover:bg-slate-900/50"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

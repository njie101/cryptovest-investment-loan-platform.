import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Plus, Send, Clock, CheckCircle2, AlertCircle, Headphones, User, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { SupportTicket } from '../../types';

export const TicketsTab: React.FC = () => {
  const { currentUser, tickets, createSupportTicket, replyToTicket } = useApp();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Form states
  const [subject, setSubject] = useState<string>('');
  const [category, setCategory] = useState<SupportTicket['category']>('General');
  const [priority, setPriority] = useState<SupportTicket['priority']>('Medium');
  const [message, setMessage] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!currentUser) return null;

  const userTickets = tickets.filter(t => t.userId === currentUser.id);
  const activeTicket = userTickets.find(t => t.id === selectedTicketId) || null;

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const res = createSupportTicket(subject.trim(), category, priority, message.trim());
    setFeedback(res);

    if (res.success) {
      setSubject('');
      setMessage('');
      setShowCreateModal(false);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    replyToTicket(activeTicket.id, replyText.trim(), 'user');
    setReplyText('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Headphones className="w-6 h-6 text-emerald-400" /> Client Support & Ticket Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Need help with a deposit, wallet verification, or withdrawal? Create a ticket to communicate directly with platform admins.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFeedback(null);
            setShowCreateModal(true);
          }}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shrink-0 transition shadow-lg shadow-emerald-950/50"
        >
          <Plus className="w-4 h-4" /> Create Support Ticket
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
            feedback.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {feedback.success ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Ticket Creation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" /> Submit New Ticket
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Subject / Issue Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deposit txHash approval check"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Deposit">Deposit</option>
                    <option value="Withdrawal">Withdrawal</option>
                    <option value="Investment">Investment</option>
                    <option value="Account/KYC">Account/KYC</option>
                    <option value="Technical">Technical</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Detailed Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain your inquiry in detail..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
                >
                  Send Ticket to Admin
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Ticket List & Thread Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: User Ticket List */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="font-bold text-white text-base">Your Tickets ({userTickets.length})</h3>

          {userTickets.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs space-y-2">
              <Headphones className="w-8 h-8 mx-auto text-slate-600" />
              <p>No support tickets created yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {userTickets.map(ticket => {
                const isSelected = ticket.id === selectedTicketId;
                const isReplied = ticket.status === 'replied';

                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-bold text-xs text-white line-clamp-1">{ticket.subject}</h4>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                          ticket.status === 'open'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : ticket.status === 'replied'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                            : ticket.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {ticket.status === 'replied' ? 'Admin Replied' : ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Category: {ticket.category}</span>
                      <span>{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Selected Ticket Discussion Thread */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col min-h-[500px]">
          {!activeTicket ? (
            <div className="m-auto text-center text-slate-500 text-xs space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-700" />
              <p>Select a ticket from the list to view discussion thread and replies.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-4">
              {/* Ticket Top Info */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{activeTicket.subject}</h3>
                    <p className="text-xs text-slate-400">
                      Category: <span className="text-emerald-400 font-semibold">{activeTicket.category}</span> • Priority: <span className="text-amber-400 font-semibold">{activeTicket.priority}</span>
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                      activeTicket.status === 'replied'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : activeTicket.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {activeTicket.status === 'replied' ? 'Admin Replied' : activeTicket.status}
                  </span>
                </div>
              </div>

              {/* Message Thread */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[350px] pr-1 py-2">
                {activeTicket.messages.map(msg => {
                  const isAdmin = msg.senderRole === 'admin';
                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 max-w-[85%] ${
                        isAdmin
                          ? 'ml-auto bg-emerald-500/10 border-emerald-500/30 text-emerald-100'
                          : 'mr-auto bg-slate-950 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px]">
                        <span className={`font-bold flex items-center gap-1 ${isAdmin ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <User className="w-3.5 h-3.5 text-slate-400" />}
                          {msg.senderName} ({isAdmin ? 'Admin Support' : 'You'})
                        </span>
                        <span className="text-slate-500 font-mono">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap leading-relaxed text-slate-200">{msg.message}</p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a follow-up reply..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shrink-0"
                >
                  <Send className="w-4 h-4" /> Reply
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

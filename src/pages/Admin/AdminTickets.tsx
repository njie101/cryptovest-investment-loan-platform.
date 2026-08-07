import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Headphones, MessageSquare, Send, CheckCircle2, AlertCircle, ShieldCheck, User, Search, Filter, Clock } from 'lucide-react';
import { SupportTicket } from '../../types';

export const AdminTickets: React.FC = () => {
  const { tickets, replyToTicket, updateTicketStatus } = useApp();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [msgNotice, setMsgNotice] = useState<string | null>(null);

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch =
      t.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeTicket = tickets.find(t => t.id === selectedTicketId) || filteredTickets[0] || null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !replyText.trim()) return;

    replyToTicket(activeTicket.id, replyText.trim(), 'admin');
    setReplyText('');
    setMsgNotice(`Reply sent to client ${activeTicket.userName}!`);
    setTimeout(() => setMsgNotice(null), 3000);
  };

  const handleStatusChange = (status: SupportTicket['status']) => {
    if (!activeTicket) return;
    updateTicketStatus(activeTicket.id, status);
    setMsgNotice(`Ticket status updated to "${status}"`);
    setTimeout(() => setMsgNotice(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Headphones className="w-6 h-6 text-emerald-400" /> Client Support Tickets Center
        </h2>
        <p className="text-xs text-slate-300">
          Manage client support requests, reply directly to inquiries regarding deposits, withdrawals, or account verification, and resolve issues.
        </p>
      </div>

      {msgNotice && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{msgNotice}</span>
        </div>
      )}

      {/* Main Admin Tickets View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Ticket Search & List */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white text-base">Tickets ({filteredTickets.length})</h3>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Total: {tickets.length}
              </span>
            </div>

            {/* Filter controls */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search user, email or subject..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                {['all', 'open', 'replied', 'in_progress', 'resolved', 'closed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition shrink-0 ${
                      statusFilter === st
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st === 'all' ? 'All Status' : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">No matching client support tickets found.</p>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredTickets.map(ticket => {
                const isSelected = activeTicket?.id === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                      isSelected
                        ? 'bg-slate-950 border-emerald-500 text-white shadow-lg ring-1 ring-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-bold text-xs text-white line-clamp-1">{ticket.subject}</h4>
                        <p className="text-[11px] text-slate-400">{ticket.userName} • {ticket.userEmail}</p>
                      </div>

                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border shrink-0 ${
                          ticket.status === 'open'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : ticket.status === 'replied'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : ticket.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                      <span>Category: {ticket.category}</span>
                      <span>Priority: {ticket.priority}</span>
                      <span>{new Date(ticket.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Conversation & Reply Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col min-h-[550px]">
          {!activeTicket ? (
            <div className="m-auto text-center text-slate-500 text-xs space-y-2">
              <Headphones className="w-10 h-10 mx-auto text-slate-700" />
              <p>Select a ticket to open conversation thread and respond to client.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-4">
              {/* Header Info */}
              <div className="border-b border-slate-800 pb-4 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{activeTicket.subject}</h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Client: <strong className="text-emerald-400">{activeTicket.userName}</strong> ({activeTicket.userEmail})
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 font-mono">
                      Category: {activeTicket.category} • Priority: {activeTicket.priority}
                    </span>
                  </div>
                </div>

                {/* Status Update Buttons */}
                <div className="flex items-center gap-2 text-xs pt-1">
                  <span className="text-slate-400 font-medium text-[11px]">Set Status:</span>
                  {(['open', 'in_progress', 'replied', 'resolved', 'closed'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition ${
                        activeTicket.status === st
                          ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1 py-2">
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
                          {msg.senderName} ({isAdmin ? 'Admin Response' : 'Client Inquiry'})
                        </span>
                        <span className="text-slate-500 font-mono">
                          {new Date(msg.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </div>

                      <p className="whitespace-pre-wrap leading-relaxed text-slate-200">{msg.message}</p>
                    </div>
                  );
                })}
              </div>

              {/* Admin Reply Input */}
              <form onSubmit={handleSendReply} className="pt-3 border-t border-slate-800 space-y-2">
                <textarea
                  rows={2}
                  placeholder={`Reply to ${activeTicket.userName}...`}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500">Replying as Admin Support</span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-950/50"
                  >
                    <Send className="w-4 h-4" /> Send Reply to Client
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

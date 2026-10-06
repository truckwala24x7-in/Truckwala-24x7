import React, { useState, useEffect } from 'react';
import {
  X,
  FileText,
  Clock,
  Phone,
  MessageSquare,
  Trash2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { SavedBreakdownTicket } from './EmergencyBreakdownModal';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSOSModal: () => void;
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  isOpen,
  onClose,
  onOpenSOSModal,
}) => {
  const [tickets, setTickets] = useState<SavedBreakdownTicket[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('truckwala_breakdown_tickets');
        if (stored) {
          setTickets(JSON.parse(stored));
        } else {
          setTickets([]);
        }
      } catch (e) {
        console.warn('Could not read tickets', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    localStorage.removeItem('truckwala_breakdown_tickets');
    setTickets([]);
  };

  const handleCopy = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tickets-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#0E131F] border border-slate-700/80 rounded-2xl text-slate-100 shadow-2xl my-6 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="bg-[#2563EB] px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="tickets-title" className="font-extrabold text-base tracking-wide font-display uppercase leading-tight">
                My Highway Breakdown Tickets
              </h2>
              <p className="text-[11px] text-white/90">
                Archived local requests & dispatch confirmation status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-black/20 rounded-lg cursor-pointer transition-colors text-white/90 hover:text-white"
            aria-label="Close tickets modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {tickets.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Active Tickets Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                You haven&apos;t logged any roadside breakdown assistance tickets from this device yet.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSOSModal();
                  }}
                  className="px-4 py-2.5 bg-[#F04438] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Log New Emergency Breakdown Ticket
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="text-slate-400">
                  {tickets.length} record{tickets.length === 1 ? '' : 's'} stored on this device
                </span>
                <button
                  onClick={handleClearHistory}
                  className="text-slate-500 hover:text-[#F04438] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </div>

              <div className="space-y-3">
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="bg-[#121624] border border-slate-800 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-white">{t.id}</span>
                          <button
                            onClick={() => handleCopy(t.id)}
                            className="text-xs text-[#2563EB] hover:text-blue-400 font-sans cursor-pointer"
                            title="Copy ticket ID"
                          >
                            <Copy className="w-3.5 h-3.5 inline" />
                            <span className="ml-0.5">{copiedId === t.id ? 'Copied' : ''}</span>
                          </button>
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          Logged: {new Date(t.createdAt).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                        {t.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/60 p-2.5 rounded-lg">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Vehicle</span>
                        <span className="font-mono text-slate-200 font-semibold">{t.vehicleNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Contact</span>
                        <span className="font-mono text-slate-200 font-semibold">{t.driverPhone}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                        <span className="text-slate-200 truncate block">{t.location}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block text-[10px] uppercase">Symptom</span>
                        <span className="text-[#F04438]">{t.problem}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`https://wa.me/919450002407?text=${encodeURIComponent(
                          `Following up on Breakdown Ticket ${t.id} for ${t.vehicleNo} at ${t.location}. What is current technician status?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Follow Up via WhatsApp</span>
                      </a>
                      <a
                        href="tel:+919450002407"
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Hotline</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

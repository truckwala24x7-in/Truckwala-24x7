import React from 'react';
import { MapPin, ShieldCheck, Clock, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface LocationMapProps { onTrackAction: (type: 'MAP_CLICK' | 'CALL_CLICK' | 'WHATSAPP_CLICK', label: string) => void; }

/** A safe placeholder: never publishes an unverified pin or third-party map embed. */
export const LocationMap: React.FC<LocationMapProps> = ({ onTrackAction }) => (
  <section id="location" className="py-16 sm:py-24 bg-[#0b0f17] border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-stretch">
      <div>
        <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E88E5] mb-2">07 · Service coverage</div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">Location details are being verified.</h2>
        <p className="text-base text-slate-300 max-w-xl">To keep drivers from being sent to an incorrect place, the Google Maps pin and workshop address will be published only after the owner confirms them.</p>
      </div>
      <div className="bg-[#0e1420] border border-slate-800 rounded-sm p-6 space-y-5">
        <div className="flex gap-3"><MapPin className="w-5 h-5 text-[#D32F2F] shrink-0" /><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Workshop address</p><p className="text-white font-semibold mt-1">{BUSINESS_CONFIG.address}</p></div></div>
        <div className="flex gap-3"><Clock className="w-5 h-5 text-[#43A047] shrink-0" /><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Availability</p><p className="text-white font-semibold mt-1">{BUSINESS_CONFIG.hours}</p></div></div>
        <div className="flex gap-3"><ShieldCheck className="w-5 h-5 text-[#1E88E5] shrink-0" /><p className="text-sm text-slate-300">No unverified map pin, phone number, WhatsApp number, or social profile is exposed on this page.</p></div>
        <button onClick={() => onTrackAction('MAP_CLICK', 'Location details pending verification')} className="w-full py-3 px-4 bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-default"><Navigation className="w-4 h-4" />Map link coming soon</button>
      </div>
    </div>
  </section>
);

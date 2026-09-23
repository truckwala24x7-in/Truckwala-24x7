import React from 'react';
import { Phone, MessageSquare, Navigation, ShieldCheck, Clock, Wrench } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppLink } from '../data/content';

interface HeroProps {
  onOpenSOS: () => void;
  onTrackAction: (type: 'CALL_CLICK' | 'WHATSAPP_CLICK' | 'MAP_CLICK', label: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSOS, onTrackAction }) => {
  const handleCall = () => {
    onTrackAction('CALL_CLICK', 'Hero Primary Call 24x7');
    window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
  };

  const handleWhatsApp = () => {
    onTrackAction('WHATSAPP_CLICK', 'Hero WhatsApp');
    const url = buildWhatsAppLink({
      problem: 'Emergency breakdown on highway',
      location: 'Kanpur–Unnao NH-27 Corridor',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDirections = () => {
    onTrackAction('MAP_CLICK', 'Hero Get Directions');
    window.open(BUSINESS_CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative bg-[#080c13] border-b border-slate-800 overflow-hidden">
      {/* Background Hero Imagery with Industrial Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_breakdown_truck_1790186272391.jpg"
          alt="TruckWala 24x7 commercial truck emergency roadside assistance on highway corridor"
          className="w-full h-full object-cover object-center opacity-30 sm:opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080c13] via-[#080c13]/90 to-[#080c13]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c13] via-transparent to-transparent" />
        {/* Subtle industrial grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow - Clean unboxed text metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-400 mb-4">
            <span className="text-[#D32F2F] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse" />
              24×7 Roadside Assistance
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Kanpur–Unnao Transport Corridor</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">NH-27</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none text-balance mb-6">
            Truck Breakdown? <br />
            <span className="text-[#1E88E5]">We’re Ready </span>
            <span className="text-[#D32F2F]">24×7.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Commercial vehicle mechanical repair, roadside breakdown assistance, ECM computer diagnostics, and genuine spare parts support at <strong className="text-white font-semibold">Gadan Khera Bypass, Unnao</strong>.
          </p>

          {/* Primary Action Button Cluster */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={handleCall}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 sm:px-8 py-4 bg-[#D32F2F] hover:bg-[#b71c1c] active:scale-95 text-white font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-sm shadow-lg shadow-red-950/50 transition-all cursor-pointer whitespace-nowrap"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>Call 24×7 Now</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 sm:px-7 py-4 bg-[#43A047] hover:bg-[#2e7d32] active:scale-95 text-white font-bold text-base sm:text-lg uppercase tracking-wider rounded-sm shadow-lg shadow-green-950/40 transition-all cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleDirections}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700 rounded-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <Navigation className="w-4 h-4 text-[#1E88E5]" />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Quick SOS Breakdown Trigger Banner */}
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-950/80 border border-red-800/80 rounded text-[#D32F2F]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white uppercase tracking-wide">
                  Emergency Roadside Mobile Response Unit
                </div>
                <div className="text-xs text-slate-400">
                  On-board generator, diagnostic scanner & pneumatic jacks ready for dispatch
                </div>
              </div>
            </div>

            <button
              onClick={onOpenSOS}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#1E88E5] hover:bg-blue-600 text-white rounded-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              One-Tap SOS Request →
            </button>
          </div>

          {/* Editorial Trust Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#43A047]" />
              <span>Average response: 25–45 min on NH-27</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E88E5]" />
              <span>BS-III / BS-IV / BS-VI Commercial Vehicle Specialist</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Zero account required</span>
          </div>
        </div>
      </div>
    </section>
  );
};

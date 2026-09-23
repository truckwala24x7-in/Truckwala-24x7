import React from 'react';
import { Phone, MessageSquare, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface MobileStickyBarProps {
  onTrackAction: (type: 'CALL_CLICK' | 'WHATSAPP_CLICK' | 'MAP_CLICK', label: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onTrackAction }) => {
  const handleCall = () => {
    onTrackAction('CALL_CLICK', 'Mobile Sticky Bar Call');
    window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
  };

  const handleWhatsApp = () => {
    onTrackAction('WHATSAPP_CLICK', 'Mobile Sticky Bar WhatsApp');
    window.open(
      `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=EMERGENCY%20BREAKDOWN%20SUPPORT%20NEEDED%20ON%20NH-27`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleDirections = () => {
    onTrackAction('MAP_CLICK', 'Mobile Sticky Bar Directions');
    window.open(BUSINESS_CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      aria-label="Emergency actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e1420]/98 backdrop-blur-md border-t border-slate-800 p-2 shadow-2xl safe-area-bottom"
    >
      <div className="grid grid-cols-3 gap-2 h-12">
        {/* CALL 24x7 Button (Prominent Emergency Wala Red) */}
        <button
          onClick={handleCall}
          className="bg-[#D32F2F] hover:bg-[#b71c1c] active:scale-95 text-white font-black text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-md shadow-red-950/40"
        >
          <Phone className="w-4 h-4 fill-current shrink-0" />
          <span>Call 24×7</span>
        </button>

        {/* WhatsApp Button (24x7 Green) */}
        <button
          onClick={handleWhatsApp}
          className="bg-[#43A047] hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span>WhatsApp</span>
        </button>

        {/* Directions Button (Truck Blue) */}
        <button
          onClick={handleDirections}
          className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xs border border-slate-700 flex items-center justify-center gap-1 transition-all cursor-pointer whitespace-nowrap"
        >
          <Navigation className="w-3.5 h-3.5 text-[#1E88E5] shrink-0" />
          <span>Directions</span>
        </button>
      </div>
    </aside>
  );
};

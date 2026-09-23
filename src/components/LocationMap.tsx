import React from 'react';
import { MapPin, Navigation, Phone, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface LocationMapProps {
  onTrackAction: (type: 'MAP_CLICK' | 'CALL_CLICK' | 'WHATSAPP_CLICK', label: string) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({ onTrackAction }) => {
  const handleOpenMaps = () => {
    onTrackAction('MAP_CLICK', 'Location Section Open Google Maps');
    window.open(BUSINESS_CONFIG.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    onTrackAction('CALL_CLICK', 'Location Section Phone Call');
    window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
  };

  const handleWhatsApp = () => {
    onTrackAction('WHATSAPP_CLICK', 'Location Section WhatsApp');
    window.open(`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hello%20TruckWala,%20I%20need%20directions%20to%20your%20workshop%20at%20Gadan%20Khera%20Bypass,%20Unnao.`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#0b0f17] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Business Details & Navigation Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E88E5] mb-2">
                07 · Workshop & Response Hub
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
                Find TruckWala 24×7
              </h2>
              <p className="text-base text-slate-300">
                Centrally stationed at Gadan Khera Bypass on the high-density Kanpur–Unnao NH-27 transport lifeline. Rapid access for both Eastbound (Lucknow/Gorakhpur) and Westbound (Kanpur/Delhi) trucks.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-[#0e1420] border border-slate-800 rounded-sm p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D32F2F] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Workshop Address
                  </div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {BUSINESS_CONFIG.address}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Near Gadan Khera Flyover, NH-27 Highway Link, Unnao
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-800">
                <Clock className="w-5 h-5 text-[#43A047] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Operating Hours
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    Open 24 Hours · 7 Days a Week · 365 Days a Year
                  </div>
                  <div className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse" />
                    <span>Night Shift Technicians On Duty Right Now</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleOpenMaps}
                  className="flex-1 py-3 px-4 bg-[#1E88E5] hover:bg-blue-600 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#43A047]" />
                  <span>WhatsApp Location</span>
                </button>
              </div>
            </div>

            {/* Highway Landmarks */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="font-bold uppercase tracking-wider text-slate-400">
                Highway Access Landmarks:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5]" />
                  <span>18 km from Jajmau / Kanpur Transport Nagar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5]" />
                  <span>Direct entry for heavy 18-wheelers & multi-axle trailers without city restriction</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E88E5]" />
                  <span>Ample turning radius and heavy parking bay for disabled commercial rigs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed Card */}
          <div className="lg:col-span-7 bg-[#0e1420] border border-slate-800 rounded-sm overflow-hidden flex flex-col h-[400px] sm:h-[480px]">
            {/* Top Bar of Map Card */}
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D32F2F]" />
                TruckWala 24×7 · Gadan Khera Bypass, Unnao
              </span>
              <button
                onClick={handleOpenMaps}
                className="text-[#1E88E5] hover:text-blue-400 font-bold uppercase tracking-wider cursor-pointer"
              >
                Full Screen Maps ↗
              </button>
            </div>

            {/* Actual Google Maps Embed Container */}
            <div className="flex-1 relative bg-slate-950">
              <iframe
                title="TruckWala 24x7 Location at Gadan Khera Bypass Unnao"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.505436329068!2d80.480000!3d26.540000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c381c8b36e1c9%3A0x6b9d6e4c76b92a2a!2sGadan%20Khera%20Bypass%2C%20Unnao%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert-[0.88] hue-rotate-180 contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Badge for Fast Action */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#0b0f17]/95 border border-slate-700 p-3.5 rounded-sm shadow-xl backdrop-blur-md">
                <div className="text-xs font-bold text-white uppercase">
                  Stationed at Gadan Khera Bypass
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Mobile Van dispatched immediately to your milepost.
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={handleCall}
                    className="flex-1 py-1.5 px-2 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-wider rounded-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Hotline</span>
                  </button>
                  <button
                    onClick={handleOpenMaps}
                    className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold uppercase tracking-wider rounded-xs border border-slate-700 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#1E88E5]" />
                    <span>Navigate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface FooterProps {
  onOpenSOS: () => void;
  onTrackAction: (type: 'CALL_CLICK' | 'WHATSAPP_CLICK' | 'MAP_CLICK', label: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSOS, onTrackAction }) => {
  return (
    <footer className="bg-[#070a10] border-t border-slate-800 text-slate-400 text-xs py-12 sm:py-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <a href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span className="text-[#1E88E5]">Truck</span>
              <span>Wala</span>
              <span className="text-[#43A047]">24×7</span>
            </a>
            <p className="text-slate-300 font-semibold text-sm">
              {BUSINESS_CONFIG.servicePromise}
            </p>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Dedicated commercial vehicle breakdown assistance, heavy mechanical repairs, computer ECM diagnostics, and genuine spare parts across the Kanpur–Unnao NH-27 transport corridor.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenSOS}
                className="px-3.5 py-1.5 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
              >
                Emergency SOS Dispatch
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Services
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#breakdown" className="hover:text-white transition-colors">
                  24×7 Breakdown Assistance
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Vehicle Repair
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-white transition-colors">
                  Computer & ECM Diagnostics
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Commercial Spare Parts
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-white transition-colors">
                  Transport Fleet Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Coverage */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Coverage Area
            </div>
            <ul className="space-y-2">
              <li>Gadan Khera Bypass, Unnao</li>
              <li>Kanpur–Unnao NH-27 Corridor</li>
              <li>Jajmau Transport Belt</li>
              <li>Unnao Industrial Bypass</li>
              <li>Lucknow-Kanpur Highway Link</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Direct Contact
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                  onClick={() => onTrackAction('CALL_CLICK', 'Footer Phone Call')}
                  className="flex items-center gap-2 text-white font-mono hover:text-[#43A047] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#43A047]" />
                  <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                  onClick={() => onTrackAction('WHATSAPP_CLICK', 'Footer WhatsApp')}
                  className="flex items-center gap-2 hover:text-[#43A047] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#43A047]" />
                  <span>WhatsApp 24×7 Hotline</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  onClick={() => onTrackAction('MAP_CLICK', 'Footer Maps')}
                  className="flex items-start gap-2 hover:text-[#1E88E5] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D32F2F] shrink-0 mt-0.5" />
                  <span>{BUSINESS_CONFIG.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{BUSINESS_CONFIG.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} TruckWala 24×7. All rights reserved. Registered Commercial Vehicle Service Provider.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Gadan Khera Bypass, Unnao, UP 209801</span>
            <span aria-hidden="true">·</span>
            <span>Operating 24/7/365</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Phone, MessageSquare, MapPin, Mail, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface FooterProps {
  onOpenSOS: () => void;
  onOpenMyTickets?: () => void;
  onTrackAction: (type: 'CALL_CLICK' | 'WHATSAPP_CLICK' | 'MAP_CLICK' | 'JOB_REQUESTED' | 'FORM_SUBMITTED' | 'LOCATION_SHARED', label: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSOS, onTrackAction }) => {
  return (
    <footer className="bg-[#070a10] border-t border-slate-800 text-slate-400 text-xs py-12 sm:py-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-3">
            <a href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5 font-display">
              <span className="text-[#1E88E5]">TRUCK</span>
              <span className="text-[#F04438]">WALA</span>
              <span className="text-[#43A047]">24×7</span>
            </a>
            <p className="text-slate-300 font-bold text-sm">
              ट्रकवाला 24×7 · {BUSINESS_CONFIG.servicePromise}
            </p>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              24×7 Commercial truck breakdown assistance, hydraulic tow trucks & recovery vans (क्रेन व टो ट्रक), computerized ECM diagnostics, and genuine spare parts across the Kanpur–Unnao NH-27 & NH-19 highway corridor.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onOpenSOS}
                className="px-3.5 py-2 bg-[#D32F2F] hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-lg cursor-pointer transition-colors shadow-md"
              >
                🚨 Emergency Roadside SOS
              </button>
              <a
                href="/vanilla/index.html"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors border border-slate-700 flex items-center gap-1"
              >
                <span>⚡ Fast Highway Portal</span>
              </a>
            </div>
          </div>

          {/* Core Highway Services */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Commercial Services (सेवाएं)
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#breakdown" className="hover:text-emerald-400 transition-colors">
                  24×7 Truck Breakdown Service
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Tow Truck Near Me (टो ट्रक)
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Recovery Van Service (क्रेन)
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-emerald-400 transition-colors">
                  Commercial ECM & Scanner
                </a>
              </li>
              <li>
                <a href="#driver-quick-connect" className="hover:text-emerald-400 transition-colors">
                  Driver Quick-Connect (WhatsApp)
                </a>
              </li>
              <li>
                <a href="#booking-calculator" className="hover:text-emerald-400 transition-colors">
                  Corridor Freight Calculator
                </a>
              </li>
            </ul>
          </div>

          {/* Vehicle Brand Coverage */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Vehicle Coverage (गाड़ी मॉडल्स)
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Mahindra Furio / Blazo X / Cruzio
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Volvo Eicher Pro Heavy Duty
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Tata Signa, Prima & 407/LPT
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Ashok Leyland AVTR & Boss
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  BharatBenz Heavy Haulage
                </a>
              </li>
              <li>
                <a href="#seo-knowledge-faq" className="hover:text-emerald-400 transition-colors">
                  Trailer Truck (टेलर ट्रक) 22-55T
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Locations */}
          <div className="space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-slate-200">
              Corridor Hubs & 24×7 Call
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
                  <span>WhatsApp SOS Helpline</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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

        {/* Quiet Bottom Legal & SEO Geo Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} TruckWala 24×7 (ट्रकवाला). All rights reserved. Registered Commercial Vehicle Highway Breakdown Service Provider.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/" className="hover:text-slate-300">3D Interactive App</a>
            <span>·</span>
            <a href="/vanilla/index.html" className="hover:text-slate-300">Vanilla Standalone</a>
            <span>·</span>
            <span className="text-slate-400">Gadan Khera Bypass, Unnao & Panki Kanpur, UP</span>
            <span>·</span>
            <span className="text-emerald-500 font-bold">24/7/365 Open</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

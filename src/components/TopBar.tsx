import React, { useState } from 'react';
import { Phone, AlertTriangle, Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface TopBarProps {
  onOpenSOS: () => void;
  onTrackAction: (type: 'CALL_CLICK', label: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenSOS, onTrackAction }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCall = () => {
    onTrackAction('CALL_CLICK', 'TopBar Phone Call');
    window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
  };

  const navLinks = [
    { label: 'Breakdown', href: '#breakdown' },
    { label: 'Services', href: '#services' },
    { label: 'Diagnostics', href: '#diagnostics' },
    { label: 'Location', href: '#location' },
    { label: 'Fleet Support', href: '#fleet' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E88E5]"
        >
          <span className="text-[#1E88E5]">Truck</span>
          <span>Wala</span>
          <span className="text-[#43A047]">24×7</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#1E88E5] decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={onOpenSOS}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#D32F2F] hover:bg-[#b71c1c] active:scale-95 transition-all shadow-md shadow-red-950/40 rounded-sm whitespace-nowrap cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-white animate-pulse" />
            <span>SOS Breakdown</span>
          </button>

          <button
            onClick={handleCall}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-[#43A047]" />
            <span className="font-mono tabular-nums">{BUSINESS_CONFIG.phoneDisplay}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1420] border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-800 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleCall();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 text-white font-bold rounded-sm border border-slate-700 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#43A047]" />
              <span>Call 24×7 Hotline: {BUSINESS_CONFIG.phoneDisplay}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

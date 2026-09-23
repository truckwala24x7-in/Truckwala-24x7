import React from 'react';
import { PhoneCall, MapPin, MessageSquareText, ShieldAlert, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface BreakdownExperienceProps {
  onOpenSOS: () => void;
  onTrackAction: (type: 'CALL_CLICK', label: string) => void;
}

export const BreakdownExperience: React.FC<BreakdownExperienceProps> = ({
  onOpenSOS,
  onTrackAction,
}) => {
  const steps = [
    {
      num: '01',
      title: 'CALL 24×7',
      hindi: 'सीधे कॉल करें',
      desc: 'Speak directly with our duty technician. No automated IVR robot, no long waiting queue.',
      icon: PhoneCall,
      actionText: 'Dial Hotline',
      color: 'text-[#D32F2F]',
      badgeBorder: 'border-[#D32F2F]/40',
      action: () => {
        onTrackAction('CALL_CLICK', 'Breakdown Step 1 Call');
        window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
      },
    },
    {
      num: '02',
      title: 'SHARE LOCATION',
      hindi: 'लोकेशन शेयर करें',
      desc: 'Send WhatsApp live location or highway kilometer milestone along the Kanpur–Unnao NH-27 stretch.',
      icon: MapPin,
      actionText: 'Send Location',
      color: 'text-[#1E88E5]',
      badgeBorder: 'border-[#1E88E5]/40',
      action: onOpenSOS,
    },
    {
      num: '03',
      title: 'TELL THE PROBLEM',
      hindi: 'समस्या बताएं',
      desc: 'Air leak, starter failure, clutch slippage, AdBlue derate or engine smoke. We prepare the right tools & parts.',
      icon: MessageSquareText,
      actionText: 'Quick Diagnostic',
      color: 'text-amber-400',
      badgeBorder: 'border-amber-500/40',
      action: onOpenSOS,
    },
    {
      num: '04',
      title: 'TRUCKWALA RESPONDS',
      hindi: 'मोबाइल वैन रवाना',
      desc: 'Service van dispatched with onboard power, diagnostic scan tools and mechanic directly to your stranded truck.',
      icon: ShieldAlert,
      actionText: 'Track Status',
      color: 'text-[#43A047]',
      badgeBorder: 'border-[#43A047]/40',
      action: onOpenSOS,
    },
  ];

  return (
    <section id="breakdown" className="py-16 sm:py-20 bg-[#0b0f17] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#D32F2F] mb-2">
              Breakdown Flow · No Account Required
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Truck Down on Highway? <br className="hidden sm:inline" />
              <span className="text-slate-400 font-semibold">4 Simple Steps to Get Rolling</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSOS}
              className="px-5 py-3 bg-[#D32F2F] hover:bg-[#b71c1c] active:scale-95 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shadow-md shadow-red-950/40"
            >
              <span>Instant Highway SOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#0e1420] border border-slate-800 hover:border-slate-700 rounded-sm p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-slate-500 group-hover:text-slate-300 transition-colors">
                      {step.num}
                    </span>
                    <div className={`p-2.5 rounded-sm bg-slate-900 border ${step.badgeBorder} ${step.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-400 mb-1">{step.hindi}</div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <button
                    onClick={step.action}
                    className="w-full py-2 px-3 text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-sm transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{step.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Banner */}
        <div className="mt-10 p-4 sm:p-5 bg-slate-900/60 border border-slate-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs sm:text-sm text-slate-300">
            <strong className="text-white">Emergency Operating Rule:</strong> When you call, a real commercial vehicle technician answers the phone. We ask 3 questions: Where are you? Which vehicle? What is the symptom?
          </div>
          <a
            href={`tel:${BUSINESS_CONFIG.phoneCall}`}
            className="shrink-0 text-xs sm:text-sm font-bold text-[#D32F2F] hover:text-red-400 uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Emergency Line: {BUSINESS_CONFIG.phoneDisplay}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

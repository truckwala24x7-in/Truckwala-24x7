import React from 'react';
import { ShieldCheck, HelpCircle, Phone } from 'lucide-react';
import { VEHICLE_BRANDS, BUSINESS_CONFIG } from '../data/content';

interface VehicleCoverageProps {
  onTrackAction: (type: 'CALL_CLICK', label: string) => void;
}

export const VehicleCoverage: React.FC<VehicleCoverageProps> = ({ onTrackAction }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#080c13] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#43A047] mb-2">
            Vehicle Compatibility & Engine Coverage
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            Heavy Commercial Vehicle Coverage
          </h2>
          <p className="text-base text-slate-300">
            Dedicated mechanical expertise and diagnostic interfaces across major Indian commercial haulage manufacturers and diesel powerplants.
          </p>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEHICLE_BRANDS.map((item) => (
            <div
              key={item.name}
              className="bg-[#0e1420] border border-slate-800 rounded-sm p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#1E88E5]" />
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                    {item.name}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Supported Models:
                    </span>
                    <span className="text-slate-200">{item.models}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      Engine Platforms:
                    </span>
                    <span className="text-slate-300 font-mono text-xs">{item.engines}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                <span>BS-III / BS-IV / BS-VI</span>
                <span className="text-emerald-400">Supported</span>
              </div>
            </div>
          ))}

          {/* Inquiry Card for Custom / Imported Chassis */}
          <div className="bg-[#121926] border border-dashed border-slate-700 rounded-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Other Models & Generators?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating heavy cranes, Volvo trailers, Scania haulage, or industrial Cummins DG gensets stranded on-site?
              </p>
              <div className="mt-4 p-3 bg-black/40 rounded text-xs text-amber-300/90 font-medium">
                Ask our head technician directly before requesting dispatch. We confirm tooling and parts compatibility immediately.
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                onClick={() => onTrackAction('CALL_CLICK', 'Vehicle Compatibility Check Call')}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#43A047]" />
                <span>Call Hotline for Model Check</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

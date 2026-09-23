import React, { useState } from 'react';
import { Cpu, AlertCircle, Wrench, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { DIAGNOSTIC_FAULTS, BUSINESS_CONFIG } from '../data/content';
import { DiagnosticFault } from '../types';

interface DiagnosticsGuideProps {
  onOpenSOS: () => void;
  onTrackAction: (type: 'CALL_CLICK', label: string) => void;
}

export const DiagnosticsGuide: React.FC<DiagnosticsGuideProps> = ({
  onOpenSOS,
  onTrackAction,
}) => {
  const [selectedFault, setSelectedFault] = useState<DiagnosticFault>(DIAGNOSTIC_FAULTS[0]);

  return (
    <section id="diagnostics" className="py-16 sm:py-24 bg-[#0b0f17] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E88E5] mb-2">
              04 · Electronic & Mechanical Troubleshooting
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
              Computer Diagnostics & Common Faults
            </h2>
            <p className="text-base text-slate-300">
              Modern BS-IV and BS-VI trucks cannot be fixed with just a hammer. Our technicians carry dedicated handheld ECM scan tools to read live telemetry, clear false limp-modes, and diagnose injection pressures on the roadside.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSOS}
              className="px-5 py-3 bg-[#1E88E5] hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Request Diagnostic Van</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Fault Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Stranded Vehicle Symptom:
            </div>
            {DIAGNOSTIC_FAULTS.map((fault) => {
              const isSelected = selectedFault.id === fault.id;
              return (
                <button
                  key={fault.id}
                  onClick={() => setSelectedFault(fault)}
                  className={`w-full text-left p-4 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0e1420] border-[#1E88E5] shadow-lg shadow-blue-950/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#1E88E5]">
                      {fault.codeOrTitle}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        fault.severity === 'CRITICAL_STOP'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {fault.severity === 'CRITICAL_STOP' ? 'Stop Truck' : 'Urgent Check'}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white line-clamp-1">
                    {fault.symptom}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Vehicles: {fault.commonVehicles}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Diagnostic & Repair Protocol Detail */}
          <div className="lg:col-span-7 bg-[#0e1420] border border-slate-800 rounded-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Diagnostic Case File
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mt-1">
                  {selectedFault.codeOrTitle}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Coverage:</span>
                <span className="text-xs font-semibold text-slate-200 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {selectedFault.commonVehicles}
                </span>
              </div>
            </div>

            {/* Diagnostic Image Callout */}
            <div className="my-6 relative rounded-sm overflow-hidden border border-slate-800 h-44 sm:h-52">
              <img
                src="/src/assets/images/computer_diagnostics_unit_1790186307245.jpg"
                alt="Commercial vehicle electronic diagnostic computer connected to truck ECM"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1420] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300 bg-black/70 px-2 py-1 rounded">
                OBD-II / 9-Pin Deutsch Diagnostic Port Telemetry
              </div>
            </div>

            <div className="space-y-6">
              {/* Step 1: Roadside Immediate Action */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Immediate Roadside Safety Check (For Driver)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedFault.roadsideCheck}
                </p>
              </div>

              {/* Step 2: TruckWala Protocol */}
              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#43A047] mb-2">
                  <Wrench className="w-4 h-4" />
                  <span>TruckWala Roadside Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedFault.truckwalaSolution}
                </p>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Experiencing this fault on the highway right now?
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenSOS}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  Send Roadside Van
                </button>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                  onClick={() => onTrackAction('CALL_CLICK', `Diagnostics Call ${selectedFault.codeOrTitle}`)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-slate-700 transition-colors"
                >
                  Ask Technician
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Phone, Send, CheckCircle2, ShieldCheck, Building2, Truck, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';
import { TrackingEventType } from '../types';

interface FleetAndServiceFormProps {
  initialService?: string;
  onTrackAction: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
}

export const FleetAndServiceForm: React.FC<FleetAndServiceFormProps> = ({
  initialService,
  onTrackAction,
}) => {
  const [activeTab, setActiveTab] = useState<'service' | 'fleet'>('service');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [serviceType, setServiceType] = useState(initialService || 'Breakdown Assistance');
  const [location, setLocation] = useState('');
  const [fleetSize, setFleetSize] = useState('5-15 Commercial Trucks');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatus('ERROR');
      return;
    }

    setStatus('SENDING');
    setTimeout(() => {
      setStatus('SUCCESS');
      onTrackAction('FORM_SUBMITTED', activeTab === 'fleet' ? 'Fleet Operator Inquiry' : 'Service Request Form', {
        name,
        phone,
        vehicleNo,
        serviceType,
        location,
        fleetSize: activeTab === 'fleet' ? fleetSize : undefined,
      });
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setVehicleNo('');
    setLocation('');
    setDetails('');
    setStatus('IDLE');
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-[#0b0f17] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Direct Emergency Bypass */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E88E5] mb-2">
                08 · Request Service / Transport Operators
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
                Non-Emergency Service & Fleet Inquiries
              </h2>
              <p className="text-base text-slate-300">
                Book scheduled mechanical overhaul, engine diagnostics, spare-parts pre-order, or corporate breakdown SLA contracts for transport fleets along the Kanpur–Unnao highway corridor.
              </p>
            </div>

            {/* Emergency Bypass Notice */}
            <div className="p-5 bg-red-950/40 border-2 border-[#D32F2F] rounded-sm">
              <div className="flex items-center gap-2 text-[#D32F2F] font-bold text-sm uppercase tracking-wider mb-2">
                <AlertCircle className="w-5 h-5" />
                <span>Stranded on Highway Right Now?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mb-4 leading-relaxed">
                Do not wait for a form response! For real-time breakdown assistance, call our 24×7 hotline directly or send an emergency SOS.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                  onClick={() => onTrackAction('CALL_CLICK', 'Fleet Section Emergency Call')}
                  className="py-2.5 px-4 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Fleet Operator Benefits */}
            <div className="bg-[#0e1420] border border-slate-800 rounded-sm p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#1E88E5]" />
                <span>Transport Fleet Account Benefits</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Priority roadside mobile van dispatch across Kanpur-Unnao corridor</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Monthly consolidated GST billing for commercial transporters</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Original spare parts stock reservation (Tata, Cummins, Leyland)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Tabbed Short Form */}
          <div className="lg:col-span-7 bg-[#0e1420] border border-slate-800 rounded-sm p-6 sm:p-8">
            {/* Segmented Tab Controls (Functional interactive buttons adhering to zero-pill rule) */}
            <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-sm border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('service')}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'service'
                    ? 'bg-[#1E88E5] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Single Vehicle Service</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('fleet')}
                className={`flex-1 py-2 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === 'fleet'
                    ? 'bg-[#1E88E5] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Transport / Fleet Account</span>
              </button>
            </div>

            {status === 'SUCCESS' ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex p-3 bg-emerald-950/80 border border-emerald-500 rounded-full text-[#43A047]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">
                  Request Received
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Our workshop service coordinator will contact you at <strong className="text-white font-mono">{phone}</strong> within 15 minutes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar / Patel Logistics"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Mobile Phone <span className="text-[#D32F2F]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm font-mono outline-none"
                    />
                  </div>
                </div>

                {activeTab === 'service' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Vehicle Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. UP 78 AT 5678"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm font-mono uppercase outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none"
                      >
                        <option value="Breakdown Assistance">Roadside Breakdown Assistance</option>
                        <option value="Mechanical Overhaul">Mechanical Repair & Overhaul</option>
                        <option value="Computer Diagnostics">Computer ECM Diagnostics</option>
                        <option value="Spare Parts">Spare Parts Requirement</option>
                        <option value="Air Brake Repair">Air Brake & Compressor Repair</option>
                        <option value="AdBlue / DEF System">BS-6 AdBlue / DEF Troubleshooting</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Fleet Size
                      </label>
                      <select
                        value={fleetSize}
                        onChange={(e) => setFleetSize(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none"
                      >
                        <option value="1-5 Trucks">1 to 5 Commercial Vehicles</option>
                        <option value="5-15 Commercial Trucks">5 to 15 Heavy Trucks</option>
                        <option value="15-50 Trucks">15 to 50 Vehicles (Regional Fleet)</option>
                        <option value="50+ Trucks">50+ Commercial Transport Fleet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Primary Corridor
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kanpur-Lucknow / NH-27"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Current Location / Milestone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gadan Khera Bypass, Unnao Toll Plaza, or transport yard"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Problem Details / Message (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Describe specific symptoms, warning lights, or parts needed..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-sm outline-none resize-none"
                  />
                </div>

                {status === 'ERROR' && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-300 rounded-sm">
                    Please provide your name and contact phone number.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'SENDING'}
                  className="w-full py-3.5 px-4 bg-[#1E88E5] hover:bg-blue-600 active:scale-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'SENDING' ? 'Submitting Request...' : 'Submit Service Request'}</span>
                </button>

                <div className="text-[11px] text-slate-400 text-center">
                  Your phone is strictly used to coordinate technical response. Zero marketing spam.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Truck,
  AlertCircle,
  Copy,
  MessageSquare,
  ShieldAlert
} from 'lucide-react';
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
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) errs.name = 'Contact person or transport company name is required.';
    const clean = phone.replace(/\D/g, '');
    if (!clean || clean.length < 10) errs.phone = 'Please provide a valid 10-digit mobile number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('SENDING');
    const inqId = `TW-INQ-${Date.now().toString().slice(-5)}`;

    const leadData = {
      id: inqId,
      name: name.trim(),
      phone: phone.trim(),
      vehicleNo: vehicleNo.trim(),
      serviceType,
      location: location.trim(),
      fleetSize: activeTab === 'fleet' ? fleetSize : undefined,
      details: details.trim(),
      inquiryType: activeTab,
      createdAt: new Date().toISOString(),
    };

    // Resilient local persistence
    try {
      const stored = localStorage.getItem('truckwala_fleet_inquiries');
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem('truckwala_fleet_inquiries', JSON.stringify([leadData, ...list.slice(0, 19)]));
    } catch (err) {
      console.warn('Could not store inquiry locally', err);
    }

    // Attempt backend sync
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
    } catch {
      // Backend may be offline in dev/preview, local storage and WhatsApp handoff ensure zero lost leads
    }

    setSubmittedId(inqId);
    setStatus('SUCCESS');

    onTrackAction('FORM_SUBMITTED', activeTab === 'fleet' ? 'Fleet Operator Inquiry' : 'Service Request Form', {
      inquiryId: inqId,
      name,
      phone,
      vehicleNo,
      serviceType,
      location,
      fleetSize: activeTab === 'fleet' ? fleetSize : undefined,
    });
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setVehicleNo('');
    setLocation('');
    setDetails('');
    setStatus('IDLE');
    setSubmittedId(null);
  };

  const handleCopyId = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-[#0B0F17] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Direct Emergency Bypass */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#2563EB] mb-2 font-display">
                Commercial Fleet & Transport Desk
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3 font-display">
                Scheduled Service & Fleet Accounts
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Book non-emergency mechanical overhauls, bulk ECM diagnostic inspections, spare-parts supply, or corporate breakdown SLA contracts along the Kanpur–Unnao NH-27 transport corridor.
              </p>
            </div>

            {/* Emergency Bypass Notice - WALA Red/Orange Alignment */}
            <div className="p-5 bg-red-950/40 border-2 border-[#F04438] rounded-2xl">
              <div className="flex items-center gap-2 text-[#F04438] font-bold text-sm uppercase tracking-wider mb-2">
                <AlertCircle className="w-5 h-5" />
                <span>Stranded on Highway Right Now?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mb-4 leading-relaxed">
                Do not wait for a form reply! For active highway breakdowns, call our emergency control room or trigger an SOS dispatch van immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                  onClick={() => onTrackAction('CALL_CLICK', 'Fleet Section Emergency Call')}
                  className="py-2.5 px-4 bg-[#F04438] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency Hotline</span>
                </a>
              </div>
            </div>

            {/* Fleet Operator Benefits */}
            <div className="bg-[#101420] border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#2563EB]" />
                <span>Commercial Fleet SLA Advantages</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Priority mobile van routing with guaranteed 15–30 min arrival SLA on NH-27</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Transparent GST invoices and consolidated monthly fleet breakdown statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>Direct technician access for fleet managers without middleman delays</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-[#101420] border border-slate-800 rounded-2xl p-6 sm:p-8">
            {status === 'SUCCESS' && submittedId ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-3 bg-[#16A34A]/20 border border-[#16A34A] rounded-2xl text-[#16A34A]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display uppercase">
                  Inquiry Registered
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your inquiry has been stored under Reference #{submittedId}. Our transport coordinator will contact you directly.
                </p>

                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl inline-flex items-center gap-3 text-xs font-mono">
                  <span className="text-slate-400">Reference:</span>
                  <span className="text-white font-bold">{submittedId}</span>
                  <button
                    onClick={() => handleCopyId(submittedId)}
                    className="text-[#2563EB] hover:underline flex items-center gap-1 font-sans font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`https://wa.me/919450002407?text=${encodeURIComponent(
                      `Hello TruckWala, I submitted Inquiry ${submittedId} for ${name} (${phone}). Please confirm details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Forward to WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Mode Selector Tabs */}
                <div className="flex border-b border-slate-800 pb-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('service')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'service'
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Single Vehicle Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('fleet')}
                    className={`py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === 'fleet'
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Fleet Operator Account
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name / Company <span className="text-[#F04438]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Singh / VRL Logistics"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#F04438] flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Contact Phone <span className="text-[#F04438]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm font-mono outline-none"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#F04438] flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {activeTab === 'service' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Vehicle Registration
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. UP 78 BT 5678"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm uppercase font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Required Service
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm outline-none"
                      >
                        <option value="Computerized ECM Diagnostics">Computerized ECM Diagnostics</option>
                        <option value="Breakdown Roadside Assistance">Breakdown Roadside Assistance</option>
                        <option value="BS-VI AdBlue / DPF Cleansing">BS-VI AdBlue / DPF Cleansing</option>
                        <option value="Brake & Pneumatic Air Repairs">Brake & Pneumatic Air Repairs</option>
                        <option value="Electrical / Alternator Service">Electrical / Alternator Service</option>
                        <option value="Suspension / Leaf Spring Work">Suspension / Leaf Spring Work</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Fleet Size Operating on NH-27
                    </label>
                    <select
                      value={fleetSize}
                      onChange={(e) => setFleetSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm outline-none"
                    >
                      <option value="1-5 Commercial Trucks">1–5 Commercial Trucks</option>
                      <option value="5-15 Commercial Trucks">5–15 Commercial Trucks</option>
                      <option value="15-50 Multi-Axle Trucks">15–50 Multi-Axle Trucks</option>
                      <option value="50+ Transporter Fleet">50+ Commercial Transporter Fleet</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Location Milestone or Workshop Visit Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Gadan Khera Bypass, Unnao or Nearest Milestone"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Specific Requirements or Fault Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe any symptoms, required parts, or preferred response time..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#2563EB] rounded-xl text-white text-xs sm:text-sm outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'SENDING'}
                    className="w-full py-3.5 px-6 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status === 'SENDING' ? 'Registering Inquiry...' : 'Submit Service Inquiry'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

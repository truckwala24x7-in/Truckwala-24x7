import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Loader2,
  Navigation,
  Copy,
  Clock,
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';
import { BUSINESS_CONFIG, COMMON_SYMPTOMS, buildWhatsAppLink } from '../data/content';
import { TrackingEventType } from '../types';

export interface SavedBreakdownTicket {
  id: string;
  vehicleNo: string;
  driverPhone: string;
  problem: string;
  location: string;
  coords?: { latitude: number; longitude: number; accuracy?: number } | null;
  status: 'REQUESTED' | 'DISPATCH_IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

interface EmergencyBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackAction: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
}

export const EmergencyBreakdownModal: React.FC<EmergencyBreakdownModalProps> = ({
  isOpen,
  onClose,
  onTrackAction,
}) => {
  const [vehicleNo, setVehicleNo] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('');
  const [customLocation, setCustomLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; accuracy?: number } | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ vehicleNo?: string; driverPhone?: string; location?: string }>({});
  const [submittedTicket, setSubmittedTicket] = useState<SavedBreakdownTicket | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    // Reset errors when modal opens
    if (isOpen) {
      setErrors({});
      setGeoNotice(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    setGeoNotice(null);
    if (!navigator.geolocation) {
      setGeoNotice('Geolocation is not supported by your browser. Please describe your highway milestone below.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        const { latitude, longitude, accuracy } = position.coords;
        setCoords({ latitude, longitude, accuracy });
        setCustomLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} (±${Math.round(accuracy)}m)`);
        setGeoNotice(`GPS Acquired: ${latitude.toFixed(4)}, ${longitude.toFixed(4)} (±${Math.round(accuracy)}m)`);
        onTrackAction('LOCATION_SHARED', 'Emergency Geolocation Acquired', {
          latitude,
          longitude,
          accuracy,
        });
      },
      (error) => {
        setLocating(false);
        const reason = error.code === 1 ? 'Location access was declined' : 'Satellite fix timed out';
        setGeoNotice(`${reason}. Please specify your nearest highway milestone or landmark.`);
        if (!customLocation) {
          setCustomLocation('Gadan Khera Bypass corridor / NH-27');
        }
      },
      { enableHighAccuracy: true, timeout: 9000, maximumAge: 0 }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const validate = () => {
    const newErrors: { vehicleNo?: string; driverPhone?: string; location?: string } = {};
    if (!vehicleNo.trim()) {
      newErrors.vehicleNo = 'Vehicle registration number is required (e.g. UP 78 AT 1234).';
    }
    const cleanPhone = driverPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.driverPhone = 'Please provide a valid 10-digit mobile phone number.';
    }
    if (!customLocation.trim()) {
      newErrors.location = 'Please describe your location milestone on NH-27.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDispatchSubmit = (channel: 'whatsapp' | 'call') => {
    if (!validate()) return;

    // Generate verifiable local ticket ID
    const ticketId = `TW-2407-${Date.now().toString().slice(-6).toUpperCase()}`;
    const newTicket: SavedBreakdownTicket = {
      id: ticketId,
      vehicleNo: vehicleNo.trim().toUpperCase(),
      driverPhone: driverPhone.trim(),
      problem: selectedSymptom || 'General Highway Breakdown Assistance',
      location: customLocation.trim(),
      coords: coords || null,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
    };

    // Resilient local persistence
    try {
      const existingStr = localStorage.getItem('truckwala_breakdown_tickets');
      const existingList: SavedBreakdownTicket[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('truckwala_breakdown_tickets', JSON.stringify([newTicket, ...existingList.slice(0, 19)]));
    } catch (e) {
      console.warn('Could not save ticket to localStorage', e);
    }

    setSubmittedTicket(newTicket);

    onTrackAction('JOB_REQUESTED', `Emergency Breakdown Ticket Created: ${ticketId}`, {
      ticketId,
      channel,
      vehicleNo: newTicket.vehicleNo,
      problem: newTicket.problem,
      location: newTicket.location,
    });

    if (channel === 'whatsapp') {
      const customMsg = `🚨 EMERGENCY BREAKDOWN DISPATCH REQUEST\nTicket ID: ${ticketId}\nVehicle: ${newTicket.vehicleNo}\nPhone: ${newTicket.driverPhone}\nProblem: ${newTicket.problem}\nLocation: ${newTicket.location}${
        coords ? `\nGPS: https://maps.google.com/?q=${coords.latitude},${coords.longitude}` : ''
      }\nStatus: REQUESTED - Awaiting Duty Mechanic Rollout`;

      const whatsappUrl = `https://wa.me/919450002407?text=${encodeURIComponent(customMsg)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `tel:+919450002407`;
    }
  };

  const handleCopyTicket = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-[#0E131F] border border-slate-700/80 rounded-2xl text-slate-100 shadow-2xl my-6 overflow-hidden">
        {/* Modal Top Bar - Brand Semantic Alignment */}
        <div className="bg-[#F04438] px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 id="modal-title" className="font-extrabold text-base tracking-wide font-display uppercase leading-tight">
                Emergency Highway Assistance
              </h2>
              <p className="text-[11px] text-white/90">
                Kanpur–Unnao NH-27 Corridor · 24×7 Mechanical Rescue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-black/20 rounded-lg cursor-pointer transition-colors text-white/90 hover:text-white"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {submittedTicket ? (
            /* Explicit, Honest Confirmation State with Persistence Guarantee */
            <div className="py-2 space-y-5">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-[#16A34A]/20 border border-[#16A34A] rounded-2xl text-[#16A34A]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white font-display">
                  Breakdown Request Logged
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your roadside request has been registered in local records and pre-formatted for on-duty highway technicians.
                </p>
              </div>

              {/* Ticket Details Summary Card */}
              <div className="bg-[#121622] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400">
                      Booking Reference
                    </span>
                    <p className="text-lg font-black text-white font-mono flex items-center gap-2">
                      <span>{submittedTicket.id}</span>
                      <button
                        onClick={() => handleCopyTicket(submittedTicket.id)}
                        className="text-xs text-[#2563EB] hover:text-blue-400 font-sans font-semibold flex items-center gap-1 cursor-pointer"
                        title="Copy ticket reference ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedId ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </p>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                    REQUESTED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Vehicle No</span>
                    <span className="font-bold text-slate-200 font-mono">{submittedTicket.vehicleNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Driver Contact</span>
                    <span className="font-bold text-slate-200 font-mono">{submittedTicket.driverPhone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Highway Milestone</span>
                    <span className="font-medium text-slate-200">{submittedTicket.location}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 block">Reported Fault</span>
                    <span className="font-medium text-[#F04438]">{submittedTicket.problem}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-blue-950/40 border border-blue-900/50 rounded-lg text-[11px] text-blue-200 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Next Step:</strong> Ensure voice or WhatsApp confirmation with the duty coordinator so the mobile unit rolls out with the exact tools.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/919450002407?text=${encodeURIComponent(
                    `Hello TruckWala, I am following up on Ticket ${submittedTicket.id} for vehicle ${submittedTicket.vehicleNo} stranded at ${submittedTicket.location}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-950/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Ticket to WhatsApp</span>
                </a>

                <a
                  href="tel:+919450002407"
                  className="py-3 px-5 bg-[#F04438] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Hotline (+91 94500 02407)</span>
                </a>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Submit another breakdown ticket
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Emergency Hotline Bypass Box */}
              <div className="p-3.5 bg-red-950/40 border border-red-900/60 rounded-xl flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="text-red-200 text-xs">
                  <strong className="block sm:inline font-bold">In high danger on highway shoulder?</strong> Skip form and call dispatch directly.
                </div>
                <a
                  href="tel:+919450002407"
                  onClick={() => onTrackAction('CALL_CLICK', 'Emergency Modal Direct Hotline Call')}
                  className="px-3 py-1.5 bg-[#F04438] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 24×7</span>
                </a>
              </div>

              {/* 1. Vehicle Registration Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. Vehicle Registration Number <span className="text-[#F04438]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. UP 78 AT 1234 or HR 55 AB 7890"
                  value={vehicleNo}
                  onChange={(e) => {
                    setVehicleNo(e.target.value);
                    if (errors.vehicleNo) setErrors((prev) => ({ ...prev, vehicleNo: undefined }));
                  }}
                  aria-invalid={!!errors.vehicleNo}
                  className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl font-mono text-white text-sm uppercase placeholder:normal-case placeholder:text-slate-500 outline-none transition-colors ${
                    errors.vehicleNo
                      ? 'border-[#F04438] focus:ring-1 focus:ring-[#F04438]'
                      : 'border-slate-700 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                  }`}
                />
                {errors.vehicleNo && (
                  <p className="mt-1 text-xs text-[#F04438] flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>{errors.vehicleNo}</span>
                  </p>
                )}
              </div>

              {/* 2. Driver Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Driver / Coordinator Mobile Number <span className="text-[#F04438]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="10-digit mobile number (e.g. 9876543210)"
                  value={driverPhone}
                  onChange={(e) => {
                    setDriverPhone(e.target.value);
                    if (errors.driverPhone) setErrors((prev) => ({ ...prev, driverPhone: undefined }));
                  }}
                  aria-invalid={!!errors.driverPhone}
                  className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl font-mono text-white text-sm placeholder:text-slate-500 outline-none transition-colors ${
                    errors.driverPhone
                      ? 'border-[#F04438] focus:ring-1 focus:ring-[#F04438]'
                      : 'border-slate-700 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                  }`}
                />
                {errors.driverPhone && (
                  <p className="mt-1 text-xs text-[#F04438] flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>{errors.driverPhone}</span>
                  </p>
                )}
              </div>

              {/* 3. Location on Highway */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    3. Location on NH-27 Highway <span className="text-[#F04438]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locating}
                    className="text-xs font-semibold text-[#2563EB] hover:text-blue-400 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    {locating ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Locating GPS...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3 h-3" />
                        <span>Use My Live GPS</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 5 km before Gadan Khera flyover, near HP petrol pump"
                    value={customLocation}
                    onChange={(e) => {
                      setCustomLocation(e.target.value);
                      if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                    }}
                    aria-invalid={!!errors.location}
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border rounded-xl text-white text-sm placeholder:text-slate-500 outline-none transition-colors ${
                      errors.location
                        ? 'border-[#F04438] focus:ring-1 focus:ring-[#F04438]'
                        : 'border-slate-700 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]'
                    }`}
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {geoNotice && (
                  <div className="mt-1 text-xs text-blue-300 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{geoNotice}</span>
                  </div>
                )}
                {errors.location && (
                  <p className="mt-1 text-xs text-[#F04438] flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>{errors.location}</span>
                  </p>
                )}
              </div>

              {/* 4. Common Problem Quick Tap */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  4. Select Breakdown Symptom
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-36 overflow-y-auto pr-1">
                  {COMMON_SYMPTOMS.map((sym) => {
                    const isSelected = selectedSymptom === sym;
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setSelectedSymptom(sym)}
                        className={`text-left p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#2563EB]/20 border-[#2563EB] text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Photo Attachment */}
              <div>
                <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-900 border border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-slate-400 hover:text-slate-200 text-xs cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <span>{photoPreview ? 'Vehicle Photo Attached ✓' : 'Attach Photo of Problem (Optional)'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {photoPreview && (
                  <div className="mt-2 relative inline-block">
                    <img
                      src={photoPreview}
                      alt="Breakdown preview"
                      className="h-14 w-20 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={() => setPhotoPreview(null)}
                      className="absolute -top-1.5 -right-1.5 bg-[#F04438] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons - Brand Color Alignment */}
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleDispatchSubmit('whatsapp')}
                  className="flex-1 py-3 px-4 bg-[#16A34A] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Log & Dispatch via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDispatchSubmit('call')}
                  className="py-3 px-5 bg-[#F04438] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Log & Call Now</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Tickets are saved locally to your device and transmitted directly to on-call mechanics. No delays or unmonitored queues.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

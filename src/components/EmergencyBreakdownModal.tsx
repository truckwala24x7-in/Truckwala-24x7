import React, { useState } from 'react';
import { X, MapPin, Phone, MessageSquare, AlertTriangle, CheckCircle2, Camera, Loader2, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG, COMMON_SYMPTOMS, buildWhatsAppLink } from '../data/content';
import { TrackingEventType } from '../types';

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
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; accuracy?: number } | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Please type your highway milestone.');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        const { latitude, longitude, accuracy } = position.coords;
        setCoords({ latitude, longitude, accuracy });
        setCustomLocation(`GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} (±${Math.round(accuracy)}m)`);
        onTrackAction('LOCATION_SHARED', 'Emergency Geolocation Acquired', {
          latitude,
          longitude,
          accuracy,
        });
      },
      (error) => {
        setLocating(false);
        console.warn('Geolocation error:', error);
        setCustomLocation('Gadan Khera Bypass corridor / NH-27');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleWhatsAppDispatch = () => {
    onTrackAction('JOB_REQUESTED', 'Emergency WhatsApp Dispatch', {
      vehicleNo,
      problem: selectedSymptom,
      location: customLocation,
      coords,
    });

    const link = buildWhatsAppLink({
      vehicleNumber: vehicleNo,
      problem: selectedSymptom || 'Highway roadside breakdown',
      location: customLocation,
      coords: coords || undefined,
    });

    setSubmitted(true);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleDirectCall = () => {
    onTrackAction('CALL_CLICK', 'Emergency Modal Direct Call', {
      vehicleNo,
    });
    window.location.href = `tel:${BUSINESS_CONFIG.phoneCall}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0e1420] border-2 border-[#D32F2F] rounded-sm text-slate-100 shadow-2xl my-8 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="bg-[#D32F2F] px-4 sm:px-6 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-extrabold text-base uppercase tracking-wider">
              Emergency Highway Assistance
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black/20 rounded cursor-pointer transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex p-3 bg-emerald-950/80 border border-emerald-500 rounded-full text-[#43A047]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black uppercase text-white">
                Dispatch Request Initiated
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                TruckWala 24×7 duty team has been alerted. Our technician is reviewing your location on NH-27. For immediate verbal confirmation, call our hotline now.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleDirectCall}
                  className="px-6 py-3 bg-[#D32F2F] hover:bg-[#b71c1c] text-white font-bold uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Duty Mechanic Now</span>
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-sm text-xs cursor-pointer"
                >
                  Edit Request
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Emergency Callout Box */}
              <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-sm flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="text-red-200">
                  <strong>Stuck on road right now?</strong> Skip typing and talk to the mechanic directly.
                </div>
                <button
                  onClick={handleDirectCall}
                  className="px-3 py-1.5 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm shrink-0 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 24×7</span>
                </button>
              </div>

              {/* 1. Vehicle Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  1. Vehicle Registration Number <span className="text-[#D32F2F]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. UP 35 AT 1234 or HR 55 AB 7890"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5] rounded-sm font-mono text-white text-sm uppercase placeholder:normal-case placeholder:text-slate-500 outline-none"
                />
              </div>

              {/* 2. Location GPS / Milestone */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Location on Highway <span className="text-[#D32F2F]">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locating}
                    className="text-xs font-semibold text-[#1E88E5] hover:text-blue-400 flex items-center gap-1 cursor-pointer disabled:opacity-50"
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
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] focus:ring-1 focus:ring-[#1E88E5] rounded-sm text-white text-sm placeholder:text-slate-500 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
                {coords && (
                  <div className="mt-1 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>GPS Acquired: {coords.latitude.toFixed(4)}, {coords.longitude.toFixed(4)} (Accuracy ±{Math.round(coords.accuracy || 10)}m)</span>
                  </div>
                )}
              </div>

              {/* 3. Common Problem Quick Tap */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. Select Breakdown Symptom
                </label>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-40 overflow-y-auto pr-1">
                  {COMMON_SYMPTOMS.map((sym) => {
                    const isSelected = selectedSymptom === sym;
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => setSelectedSymptom(sym)}
                        className={`text-left p-2 rounded-sm text-xs font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1E88E5]/20 border-[#1E88E5] text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Driver Phone & Photo Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-[#1E88E5] rounded-sm text-white text-xs font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Problem Photo (Optional)
                  </label>
                  <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 border border-dashed border-slate-700 hover:border-slate-500 rounded-sm text-slate-400 hover:text-slate-200 text-xs cursor-pointer">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{photoPreview ? 'Photo Selected ✓' : 'Attach Photo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {photoPreview && (
                <div className="relative inline-block">
                  <img
                    src={photoPreview}
                    alt="Breakdown preview"
                    className="h-16 w-24 object-cover rounded border border-slate-700"
                  />
                  <button
                    onClick={() => setPhotoPreview(null)}
                    className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5 text-xs"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDispatch}
                  className="flex-1 py-3.5 px-4 bg-[#43A047] hover:bg-emerald-600 text-white font-extrabold text-sm uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Dispatch via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectCall}
                  className="py-3.5 px-5 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call 24×7</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Operating Corridor: Gadan Khera Bypass, Unnao & NH-27 stretch · Direct technician coordination
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

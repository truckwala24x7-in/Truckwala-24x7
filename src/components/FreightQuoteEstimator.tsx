import React, { useState } from 'react';
import {
  Calculator,
  Truck,
  MapPin,
  Wrench,
  CheckCircle2,
  FileText,
  AlertCircle,
  Copy,
  MessageSquare,
  Phone,
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { TrackingEventType } from '../types';

interface FreightQuoteEstimatorProps {
  onTrackAction: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
  onOpenEmergencyModal?: () => void;
}

interface EstimateRecord {
  id: string;
  vehicleType: string;
  serviceType: string;
  corridor: string;
  isUrgentNight: boolean;
  baseCallout: number;
  laborFee: number;
  tollBuffer: number;
  emergencyFee: number;
  totalEst: number;
  createdAt: string;
}

const VEHICLE_OPTIONS = [
  { id: 'lcv', label: 'LCV 4–6 Wheeler (Tata 407, Bolero Pickup, Eicher 1110)', baseFactor: 1.0 },
  { id: 'mcv', label: 'MCV 6–10 Wheeler (Tata 1109, 1618, BharatBenz 1217)', baseFactor: 1.25 },
  { id: 'hcv', label: 'HCV Rigid 12–14 Wheeler (Tata Signa 2818, 3518, Leyland 4220)', baseFactor: 1.55 },
  { id: 'trailer', label: 'Multi-Axle Trailer / Container (16–22 Wheeler, 40ft/55T)', baseFactor: 1.85 },
];

const SERVICE_OPTIONS = [
  { id: 'ecm', label: 'Computerized ECM & BS-VI AdBlue Scan / Derate Clearing', baseCost: 1200, laborCost: 800 },
  { id: 'airbrake', label: 'High-Pressure Air Leak & Spring Brake Chamber Unlocking', baseCost: 1000, laborCost: 950 },
  { id: 'jumpstart', label: 'Heavy-Duty 24V Dual-Battery Booster Jumpstart', baseCost: 800, laborCost: 600 },
  { id: 'tyre', label: 'Highway Tyre Vulcanization & Heavy Wheel Replacement', baseCost: 750, laborCost: 650 },
  { id: 'towing', label: 'Heavy Hydraulic Towing & Underlift Rig Recovery', baseCost: 3500, laborCost: 2200 },
  { id: 'general', label: 'General Roadside Mechanical Inspection & Hose/Belt Swap', baseCost: 900, laborCost: 700 },
];

const CORRIDOR_OPTIONS = [
  { id: 'c1', label: 'Gadan Khera Bypass & Unnao Hub (0–15 km)', distanceKm: 10, toll: 100 },
  { id: 'c2', label: 'Unnao–Nawabganj Bird Sanctuary Stretch (15–35 km)', distanceKm: 25, toll: 180 },
  { id: 'c3', label: 'Unnao–Lucknow Expressway Toll Link (35–65 km)', distanceKm: 50, toll: 320 },
  { id: 'c4', label: 'Kanpur–Ganga Barrage / Industrial Belt (10–25 km)', distanceKm: 18, toll: 150 },
  { id: 'c5', label: 'Kanpur–Fatehpur Highway Corridor (30–60 km)', distanceKm: 45, toll: 280 },
];

export const FreightQuoteEstimator: React.FC<FreightQuoteEstimatorProps> = ({
  onTrackAction,
  onOpenEmergencyModal,
}) => {
  const [vehicleId, setVehicleId] = useState('hcv');
  const [serviceId, setServiceId] = useState('ecm');
  const [corridorId, setCorridorId] = useState('c1');
  const [isUrgentNight, setIsUrgentNight] = useState(false);
  const [savedEstimate, setSavedEstimate] = useState<EstimateRecord | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Calculation logic
  const selectedVehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[2];
  const selectedService = SERVICE_OPTIONS.find((s) => s.id === serviceId) || SERVICE_OPTIONS[0];
  const selectedCorridor = CORRIDOR_OPTIONS.find((c) => c.id === corridorId) || CORRIDOR_OPTIONS[0];

  const baseCallout = Math.round(selectedService.baseCost * selectedVehicle.baseFactor);
  const laborFee = Math.round(selectedService.laborCost * (selectedCorridor.distanceKm > 25 ? 1.25 : 1.0));
  const tollBuffer = selectedCorridor.toll;
  const emergencyFee = isUrgentNight ? 500 : 0;
  const totalEst = baseCallout + laborFee + tollBuffer + emergencyFee;

  const handleSaveEstimate = () => {
    const estId = `EST-2407-${Date.now().toString().slice(-5)}`;
    const record: EstimateRecord = {
      id: estId,
      vehicleType: selectedVehicle.label,
      serviceType: selectedService.label,
      corridor: selectedCorridor.label,
      isUrgentNight,
      baseCallout,
      laborFee,
      tollBuffer,
      emergencyFee,
      totalEst,
      createdAt: new Date().toISOString(),
    };

    try {
      const existingStr = localStorage.getItem('truckwala_estimates');
      const existingList: EstimateRecord[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('truckwala_estimates', JSON.stringify([record, ...existingList.slice(0, 9)]));
    } catch (e) {
      console.warn('Could not save estimate locally', e);
    }

    setSavedEstimate(record);

    onTrackAction('FORM_SUBMITTED', 'Corridor Estimate Generated', {
      estimateId: estId,
      vehicleType: record.vehicleType,
      serviceType: record.serviceType,
      totalEst,
    });
  };

  const handleCopyEstimateId = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section id="quote-calculator" className="py-16 sm:py-24 bg-[#0A0D14] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Brand Alignment */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-[#2563EB] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent Highway Operations Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-display">
            Corridor Service & Freight Cost Estimator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Compute transparent, indicative roadside service and freight mobilization estimates along NH-27. Zero surprise charges or arbitrary pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 bg-[#101420] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* 1. Vehicle Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2563EB]" />
                <span>1. Vehicle Category</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VEHICLE_OPTIONS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVehicleId(v.id)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      vehicleId === v.id
                        ? 'bg-[#2563EB]/15 border-[#2563EB] text-white ring-1 ring-[#2563EB]/40'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Service Required */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#F04438]" />
                <span>2. Required Highway Assistance</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceId(s.id)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      serviceId === s.id
                        ? 'bg-[#F04438]/15 border-[#F04438] text-white ring-1 ring-[#F04438]/40'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Corridor Stretch */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#16A34A]" />
                <span>3. Highway Corridor Location</span>
              </label>
              <select
                value={corridorId}
                onChange={(e) => setCorridorId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs sm:text-sm outline-none focus:border-[#2563EB]"
              >
                {CORRIDOR_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Night / Urgent Emergency Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-3.5 bg-slate-900/90 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-colors">
                <input
                  type="checkbox"
                  checked={isUrgentNight}
                  onChange={(e) => setIsUrgentNight(e.target.checked)}
                  className="w-4 h-4 text-[#F04438] rounded accent-[#F04438] cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Immediate Night Hours / Dense Fog Priority (+₹500 mobilization)
                  </span>
                  <span className="text-slate-400">
                    Dispatches dedicated auxiliary lighting rig and dual technician crew for midnight highway safety.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Transparent Live Calculation Card */}
          <div className="lg:col-span-5 bg-[#121624] border-2 border-[#2563EB]/40 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-bold text-base text-white font-display uppercase tracking-wider">
                  Transparent Tariff Breakdown
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                Live Calculation
              </span>
            </div>

            {/* Itemized Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Base Mobilization & Diagnostic Callout</span>
                <span className="font-mono text-white font-semibold">₹{baseCallout.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Technician Labor & Corridor Travel</span>
                <span className="font-mono text-white font-semibold">₹{laborFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Toll & Highway Access Allowance</span>
                <span className="font-mono text-white font-semibold">₹{tollBuffer.toLocaleString('en-IN')}</span>
              </div>
              {isUrgentNight && (
                <div className="flex justify-between text-[#F04438]">
                  <span>Night / Dense Fog Priority Mobilization</span>
                  <span className="font-mono font-semibold">+₹{emergencyFee.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">
                    Total Estimated Tariff
                  </span>
                  <span className="text-[11px] text-slate-500">Excludes physical OEM replacement parts</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white font-mono tracking-tight">
                    ₹{totalEst.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Explicit Sample/Disclaimer (Addressing Critical 3) */}
            <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Indicative Highway Estimate:</strong> Generated for driver and fleet budgeting. Final quote is finalized on-site based on actual spares used and exact milestone condition. No arbitrary surge charges.
              </span>
            </div>

            {/* Saved Estimate Confirmation */}
            {savedEstimate ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-600/60 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span>Estimate #{savedEstimate.id} Saved</span>
                  </span>
                  <button
                    onClick={() => handleCopyEstimateId(savedEstimate.id)}
                    className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Ready to book roadside van with this quote? Forward this reference directly to our dispatch coordinator:
                </p>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/919450002407?text=${encodeURIComponent(
                      `Hello TruckWala, I calculated Estimate ${savedEstimate.id} (₹${savedEstimate.totalEst}) for ${savedEstimate.serviceType} on ${savedEstimate.corridor}. Please confirm mechanic availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Forward on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+919450002407"
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center transition-colors"
                    title="Call directly"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleSaveEstimate}
                  className="w-full py-3.5 px-4 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 cursor-pointer transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Lock & Save This Estimate</span>
                </button>

                {onOpenEmergencyModal && (
                  <button
                    type="button"
                    onClick={onOpenEmergencyModal}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-[#F04438] border border-[#F04438]/40 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Need Emergency Van Immediately?</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

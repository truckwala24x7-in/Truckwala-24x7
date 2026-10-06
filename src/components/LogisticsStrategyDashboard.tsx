import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Phone,
  MessageSquare,
  Navigation,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Boxes,
  Zap,
  Building,
  HardHat,
  Headphones,
  CheckCircle2,
  Copy,
  AlertCircle,
  RotateCw,
  Search,
  Sparkles,
  MessageCircle,
  Send,
  UserCheck
} from 'lucide-react';
import { TrackingEventType } from '../types';
import { DriverQuickConnectModal } from './DriverQuickConnectModal';

interface LogisticsStrategyDashboardProps {
  onTrackAction?: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
  onOpenSOSModal?: () => void;
}

export interface TruckFleetItem {
  id: string;
  number: string;
  status: 'Loading' | 'En Route' | 'Unloading';
  driver: string;
  driverPhone: string;
  driverCleanPhone: string;
  driverLanguage?: string;
  driverRating: number;
  lastCheckpoint?: string;
  route: string;
  from: string;
  to: string;
  load: string;
  eta: string;
  progress: number;
  color: string;
  animClass: string;
  pos: { top: string; left: string };
}

const FLEET_DATA: TruckFleetItem[] = [
  {
    id: 't1',
    number: 'UP78 DT 1234',
    status: 'Loading',
    driver: 'Ramesh Kumar',
    driverPhone: '+91 98391 24701',
    driverCleanPhone: '919839124701',
    driverLanguage: 'Hindi, Bhojpuri',
    driverRating: 4.9,
    lastCheckpoint: 'Sikandra Toll Plaza (NH-19)',
    route: 'Kanpur → Delhi',
    from: 'Kanpur',
    to: 'Delhi',
    load: '12 Ton Cement',
    eta: '4h 32m',
    progress: 18,
    color: '#3B82F6',
    animClass: 'truck-a',
    pos: { top: '42%', left: '18%' }
  },
  {
    id: 't2',
    number: 'DL01 AB 8890',
    status: 'En Route',
    driver: 'Aman Singh',
    driverPhone: '+91 94501 88902',
    driverCleanPhone: '919450188902',
    driverLanguage: 'Hindi, Punjabi',
    driverRating: 4.8,
    lastCheckpoint: 'Unnao Bypass Flyover (NH-27)',
    route: 'Kanpur → Lucknow',
    from: 'Kanpur',
    to: 'Lucknow',
    load: '8 Ton Steel',
    eta: '1h 10m',
    progress: 64,
    color: '#0EA5E9',
    animClass: 'truck-b',
    pos: { top: '28%', left: '62%' }
  },
  {
    id: 't3',
    number: 'UP32 CD 4455',
    status: 'En Route',
    driver: 'Sunil Yadav',
    driverPhone: '+91 98380 44551',
    driverCleanPhone: '919838044551',
    driverLanguage: 'Hindi, Awadhi',
    driverRating: 4.7,
    lastCheckpoint: 'Etawah Toll (Agra Expressway)',
    route: 'Kanpur → Agra',
    from: 'Kanpur',
    to: 'Agra',
    load: '15 Ton Grains',
    eta: '2h 55m',
    progress: 42,
    color: '#F59E0B',
    animClass: 'truck-c',
    pos: { top: '58%', left: '48%' }
  },
  {
    id: 't4',
    number: 'UP78 EF 2024',
    status: 'Unloading',
    driver: 'Vikash Patel',
    driverPhone: '+91 97920 20243',
    driverCleanPhone: '919792020243',
    driverLanguage: 'Hindi, Gujarati',
    driverRating: 4.9,
    lastCheckpoint: 'Panki Industrial Yard Gate 3',
    route: 'Delhi → Kanpur',
    from: 'Delhi',
    to: 'Kanpur',
    load: '10 Ton Tiles',
    eta: '0h 20m',
    progress: 88,
    color: '#10B981',
    animClass: 'truck-d',
    pos: { top: '62%', left: '72%' }
  },
  {
    id: 't5',
    number: 'HR55 GH 1122',
    status: 'Loading',
    driver: 'Deepak Verma',
    driverPhone: '+91 98890 11224',
    driverCleanPhone: '919889011224',
    driverLanguage: 'Hindi, Haryanvi',
    driverRating: 4.8,
    lastCheckpoint: 'Kanpur Central Transhipment Hub',
    route: 'Kanpur → Varanasi',
    from: 'Kanpur',
    to: 'Varanasi',
    load: '6 Ton Electronics',
    eta: '5h 05m',
    progress: 12,
    color: '#6366F1',
    animClass: 'truck-e',
    pos: { top: '38%', left: '38%' }
  },
  {
    id: 't6',
    number: 'UP78 IJ 3344',
    status: 'En Route',
    driver: 'Manoj Tiwari',
    driverPhone: '+91 99180 33445',
    driverCleanPhone: '919918033445',
    driverLanguage: 'Hindi, Bhojpuri',
    driverRating: 4.7,
    lastCheckpoint: 'Hardoi Crossroad Junction',
    route: 'Kanpur → Bareilly',
    from: 'Kanpur',
    to: 'Bareilly',
    load: '9 Ton Furniture',
    eta: '3h 12m',
    progress: 56,
    color: '#EF4444',
    animClass: 'truck-f',
    pos: { top: '18%', left: '42%' }
  }
];

const LOGISTICS_SERVICES = [
  {
    title: 'Full Truck Load (FTL)',
    desc: 'Dedicated 9 to 22 ton multi-axle trucks for heavy industrial freight. Pan-UP and Delhi-NCR corridor coverage.',
    icon: '🚛',
    code: 'FTL',
    badge: 'High Capacity'
  },
  {
    title: 'Part Load Sharing (PTL)',
    desc: 'Pay strictly for the cubic space or tonnage you occupy. Daily runs on Kanpur–Delhi–Lucknow routes.',
    icon: '📦',
    code: 'PTL',
    badge: 'Economical'
  },
  {
    title: 'Express Corridors Dispatch',
    desc: 'Same-day turnaround, satellite GPS synced, 24×7 active operations control room.',
    icon: '⚡',
    code: 'EXP',
    badge: 'SLA Guaranteed'
  },
  {
    title: 'Warehouse + Cross-Docking',
    desc: 'Kanpur Hub A & B — 12,000 sq ft paved storage with heavy hydraulic loading docks and forklifts.',
    icon: '🏭',
    code: 'WMS',
    badge: 'Secure Storage'
  },
  {
    title: 'Heavy Construction Freight',
    desc: 'Cement, steel coils, ceramic tiles, and industrial machinery with heavy crane and winch assistance.',
    icon: '🏗️',
    code: 'CNS',
    badge: 'Heavy Duty'
  },
  {
    title: '24×7 Operations Control',
    desc: 'Live tracking URL for customers, digital driver verification, electronic Proof of Delivery (e-POD).',
    icon: '🎧',
    code: 'SUP',
    badge: 'Direct Fleet'
  }
];

const DISTANCE_MATRIX: Record<string, number> = {
  Delhi: 470,
  Lucknow: 90,
  Agra: 300,
  Varanasi: 330,
  Bareilly: 260,
  Kanpur: 0
};

const MAPS_URL = 'https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA';

function useCountUp(target: number, durationMs = 1200) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let animId = 0;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = Math.min((now - startTime) / durationMs, 1);
      const ease = 1 - Math.pow(1 - elapsed, 3);
      setVal(Math.floor(target * ease));
      if (elapsed < 1) {
        animId = requestAnimationFrame(frame);
      }
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [target, durationMs]);

  return val;
}

export const LogisticsStrategyDashboard: React.FC<LogisticsStrategyDashboardProps> = ({
  onTrackAction,
  onOpenSOSModal
}) => {
  const [selectedTruckId, setSelectedTruckId] = useState<string>('t2');
  const [quickConnectTruck, setQuickConnectTruck] = useState<TruckFleetItem | null>(null);
  const [isQuickConnectOpen, setIsQuickConnectOpen] = useState(false);
  const [driverSearchQuery, setDriverSearchQuery] = useState('');
  const [fromCity, setFromCity] = useState<string>('Kanpur');
  const [toCity, setToCity] = useState<string>('Delhi');
  const [weightTons, setWeightTons] = useState<string>('12');
  const [material, setMaterial] = useState<string>('Cement');
  const [generatedQuote, setGeneratedQuote] = useState<{
    id: string;
    from: string;
    to: string;
    weight: string;
    material: string;
    price: number;
    distance: number;
  } | null>(null);
  const [copiedQuoteId, setCopiedQuoteId] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'En Route' | 'Loading' | 'Unloading'>('ALL');

  const selectedTruck = FLEET_DATA.find((t) => t.id === selectedTruckId) || FLEET_DATA[0];

  const totalFleetCount = useCountUp(247);
  const activeDeliveriesCount = useCountUp(34);

  // Live calculation of price
  const distanceKm = Math.abs((DISTANCE_MATRIX[toCity] || 200) - (DISTANCE_MATRIX[fromCity] || 0)) || 90;
  const calculatedPrice = Math.round(
    distanceKm * 22 + Number(weightTons || 0) * 180 + (material === 'Steel' ? 1200 : material === 'Electronics' ? 800 : 0)
  );

  const filteredFleet = FLEET_DATA.filter((t) => filterStatus === 'ALL' || t.status === filterStatus);

  const filteredDrivers = FLEET_DATA.filter(
    (t) =>
      t.driver.toLowerCase().includes(driverSearchQuery.toLowerCase()) ||
      t.number.toLowerCase().includes(driverSearchQuery.toLowerCase()) ||
      t.route.toLowerCase().includes(driverSearchQuery.toLowerCase()) ||
      t.load.toLowerCase().includes(driverSearchQuery.toLowerCase())
  );

  const handleSelectTruck = (id: string) => {
    setSelectedTruckId(id);
    if (onTrackAction) {
      onTrackAction('JOB_REQUESTED', `Fleet Truck Selected: ${id}`);
    }
  };

  const handleOpenQuickConnect = (truck: TruckFleetItem) => {
    setQuickConnectTruck(truck);
    setIsQuickConnectOpen(true);
    if (onTrackAction) {
      onTrackAction('WHATSAPP_CLICK', `Driver Quick-Connect Opened: ${truck.driver} (${truck.number})`, {
        truckId: truck.id,
        driver: truck.driver,
        number: truck.number,
        phone: truck.driverCleanPhone
      });
    }
  };

  const handleCloseQuickConnect = () => {
    setIsQuickConnectOpen(false);
    setQuickConnectTruck(null);
  };

  const handleGenerateQuote = () => {
    const quoteId = `QT-2407-${Date.now().toString().slice(-5)}`;
    const quoteData = {
      id: quoteId,
      from: fromCity,
      to: toCity,
      weight: weightTons,
      material,
      price: calculatedPrice,
      distance: distanceKm
    };

    setGeneratedQuote(quoteData);

    try {
      const stored = localStorage.getItem('truckwala_logistics_quotes');
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem('truckwala_logistics_quotes', JSON.stringify([quoteData, ...list.slice(0, 9)]));
    } catch (e) {
      console.warn('Could not save quote locally', e);
    }

    if (onTrackAction) {
      onTrackAction('FORM_SUBMITTED', 'Strategy Game Quote Generated', {
        quoteId,
        fromCity,
        toCity,
        weightTons,
        material,
        calculatedPrice
      });
    }
  };

  const handleCopyQuote = (id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedQuoteId(true);
      setTimeout(() => setCopiedQuoteId(false), 2000);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 border-b border-slate-200 font-sans selection:bg-blue-200">
      {/* 01 - Control Room Sub-Header with Brand Alignment */}
      <div className="bg-[#0F172A] text-white border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-extrabold uppercase tracking-wider text-slate-200 font-display">
              Kanpur Panki Hub · Live Logistics Operations Control Room
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <span className="hidden sm:inline text-white/60">
              Direct Fleet Dispatch · No Middleman Brokers
            </span>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium flex items-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#3B82F6]" />
              <span>Hub Directions ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* 02 - Live Operations KPI Cards */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: 'Total Active Fleet',
            value: `${totalFleetCount} Trucks`,
            sub: 'Heavy multi-axle & containers',
            icon: '🚛',
            trend: '+4.2% Growth',
            live: false
          },
          {
            label: 'Active Trips',
            value: `${activeDeliveriesCount} On Road`,
            sub: 'Monitored live on corridor',
            icon: '📍',
            trend: 'LIVE DISPATCH',
            live: true
          },
          {
            label: 'On-Time SLA',
            value: '98.2%',
            sub: 'Last 30 days verified trips',
            icon: '⏱️',
            trend: 'SLA MET',
            live: false
          },
          {
            label: 'Today Dispatched',
            value: '₹1.4L Freight',
            sub: 'Daily verified transport ledger',
            icon: '💰',
            trend: 'VERIFIED',
            live: false
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex items-center justify-between"
          >
            <div>
              <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                {item.label}
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 font-display">
                {item.value}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {item.sub}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white grid place-items-center text-lg shadow-sm">
                {item.icon}
              </div>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  item.live
                    ? 'bg-emerald-500 text-white animate-pulse'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 03 - Isometric Strategy Game Live Visualizer */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#EEF2F7] border border-slate-300 shadow-[0_20px_80px_rgba(15,23,42,0.12)] h-[780px] lg:h-[660px]">
          {/* Isometric Background Grid */}
          <div className="absolute inset-0 iso-grid opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-900/[0.05] pointer-events-none" />

          {/* Isometric Road Highways & Angled Infrastructure */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary Highway Arterial A */}
            <div className="absolute left-0 top-[38%] w-full h-[74px] bg-[#CBD5E1] rotate-[-28deg] shadow-inner origin-left">
              <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,white_0_18px,transparent_18px_28px)] opacity-90" />
              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/80" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/80" />
            </div>

            {/* Secondary Arterial B */}
            <div className="absolute left-0 top-[62%] w-full h-[56px] bg-[#CBD5E1] rotate-[-28deg] origin-left">
              <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-[repeating-linear-gradient(90deg,white_0_16px,transparent_16px_26px)] opacity-70" />
            </div>

            {/* Cross-corridor Express Highway */}
            <div className="absolute left-[52%] top-[-10%] w-[64px] h-[140%] bg-[#CBD5E1] rotate-[32deg]">
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-[repeating-linear-gradient(180deg,white_0_16px,transparent_16px_26px)] opacity-75" />
            </div>

            {/* Isometric Warehouse A Building */}
            <div className="absolute left-[12%] top-[10%]">
              <div className="relative">
                <div className="iso-building w-[220px] h-[150px] bg-[#1E40AF] rounded-xl shadow-[0_20px_40px_rgba(30,64,175,0.35)] border border-white/20">
                  <div
                    className="absolute -top-[34px] left-0 w-full h-[44px] bg-[#3B82F6] rounded-lg shadow"
                    style={{ transform: 'rotateX(-10deg)' }}
                  />
                </div>
                <div className="absolute -bottom-2 left-6 right-6 h-[10px] bg-black/20 blur-[6px] rounded-full" />
                <div className="absolute top-[12px] left-[14px] glass px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide">
                  KANPUR HUB • WAREHOUSE A
                </div>
                <div className="absolute top-[48px] left-[18px] flex gap-1.5">
                  {[0, 1, 2].map((dock) => (
                    <div
                      key={dock}
                      className="w-[28px] h-[18px] bg-black/20 rounded-[2px] border border-white/20"
                    />
                  ))}
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -top-3 -right-6 lg:right-0 glass-dark text-white px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:scale-105 transition-transform z-10"
                >
                  <span className="w-5 h-5 rounded-full bg-[#3B82F6] grid place-items-center text-[10px]">
                    📍
                  </span>
                  <span>Directions to Hub</span>
                </a>
              </div>
            </div>

            {/* Isometric Warehouse B Building */}
            <div className="absolute right-[14%] top-[18%] hidden lg:block">
              <div className="relative">
                <div className="iso-building w-[180px] h-[120px] bg-[#0F172A] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.35)] border border-white/10">
                  <div className="absolute -top-[30px] left-0 w-full h-[40px] bg-[#1E293B] rounded-lg" />
                </div>
                <div className="absolute top-[10px] left-[12px] glass-dark text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                  WAREHOUSE B • COLD CHAIN
                </div>
              </div>
            </div>

            {/* Roadside Parking Staging Bays */}
            <div className="absolute left-[8%] top-[50%] rotate-[-28deg] flex gap-2">
              {[0, 1, 2, 3, 4].map((bay) => (
                <div
                  key={bay}
                  className="w-[54px] h-[84px] bg-white/70 border border-slate-300 rounded-lg grid place-items-center"
                >
                  <div className="w-[34px] h-[6px] bg-slate-300 rounded-full" />
                </div>
              ))}
            </div>

            {/* Animated Road Fleet Trucks */}
            {FLEET_DATA.map((truck) => {
              const isSelected = selectedTruckId === truck.id;
              return (
                <button
                  key={truck.id}
                  onClick={() => handleSelectTruck(truck.id)}
                  className="absolute z-10 group cursor-pointer focus:outline-none"
                  style={{ top: truck.pos.top, left: truck.pos.left }}
                  aria-label={`Select truck ${truck.number}`}
                >
                  <div
                    className={`relative transition-transform duration-200 ${truck.animClass} ${
                      isSelected ? 'scale-[1.25]' : 'group-hover:scale-110'
                    }`}
                  >
                    <div className="absolute -bottom-1 left-1 right-1 h-[6px] bg-black/20 blur-[3px] rounded-full" />
                    <div
                      className="relative w-[54px] h-[22px] rounded-[4px] flex overflow-hidden border border-black/10 shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
                      style={{ background: truck.color }}
                    >
                      <div className="w-[18px] bg-black/15 grid place-items-center text-[11px]">
                        🚛
                      </div>
                      <div className="flex-1 bg-white/90" />
                      <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-black/10" />
                    </div>

                    <div
                      className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-bold border shadow backdrop-blur transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-800 scale-105'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {truck.number.split(' ').slice(0, 2).join(' ')} · {truck.status}
                      {isSelected && (
                        <span className="ml-1 inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      )}
                    </div>

                    {isSelected && (
                      <div className="absolute -inset-2 rounded-xl border-2 border-[#3B82F6]/70 animate-pulse pointer-events-none" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Left Overlay: Fleet Overview List */}
          <div className="absolute left-3 top-3 lg:left-4 lg:top-4 w-[310px] max-w-[calc(100%-24px)] glass rounded-2xl p-3.5 z-20 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-800 font-display">
                  Fleet Overview
                </span>
                <span className="text-[10px] text-slate-500 block">Kanpur Central Corridor</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE SYNC</span>
              </div>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex gap-1 mb-2.5 text-[10px] font-bold">
              {(['ALL', 'En Route', 'Loading', 'Unloading'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`flex-1 py-1 rounded-lg transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Scrollable Truck Cards */}
            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {filteredFleet.map((truck) => {
                const isSelected = truck.id === selectedTruckId;
                return (
                  <div
                    key={truck.id}
                    onClick={() => handleSelectTruck(truck.id)}
                    className={`w-full text-left rounded-xl border px-3 py-2.5 flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.25)]'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div
                      className="w-9 h-9 rounded-lg grid place-items-center text-xs font-bold shrink-0"
                      style={{
                        background: isSelected ? 'white' : truck.color,
                        color: isSelected ? '#0F172A' : 'white'
                      }}
                    >
                      {truck.number.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate font-mono">{truck.number}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                            truck.status === 'En Route'
                              ? 'bg-sky-500 text-white'
                              : truck.status === 'Loading'
                              ? 'bg-amber-400 text-amber-950'
                              : 'bg-emerald-500 text-white'
                          }`}
                        >
                          {truck.status.toUpperCase()}
                        </span>
                      </div>
                      <div className={`text-[11px] truncate ${isSelected ? 'text-white/70' : 'text-slate-500'}`}>
                        {truck.driver} · {truck.load}
                      </div>
                      <div className="mt-1 h-1.5 rounded-full bg-black/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${truck.progress}%`,
                            background: isSelected ? '#3B82F6' : truck.color
                          }}
                        />
                      </div>
                    </div>

                    {/* WhatsApp Quick Connect Trigger */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuickConnect(truck);
                      }}
                      className="w-7 h-7 rounded-lg bg-emerald-500/15 hover:bg-[#25D366] text-emerald-600 hover:text-white border border-emerald-500/30 grid place-items-center transition-colors cursor-pointer shrink-0"
                      title={`Quick-Connect WhatsApp with ${truck.driver}`}
                      aria-label={`Quick-Connect WhatsApp with ${truck.driver}`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.46 3.491 1.334 5.006L2 22.5l5.632-1.309a10.007 10.007 0 004.4.996h.005c5.535 0 10.03-4.495 10.03-10.029 0-2.68-1.043-5.199-2.937-7.094A9.972 9.972 0 0012.031 2zm0 18.285h-.004a8.28 8.28 0 01-4.225-1.157l-.303-.18-3.14.729.832-3.061-.197-.314A8.285 8.285 0 013.743 12.03c0-4.57 3.719-8.288 8.291-8.288 2.215 0 4.296.862 5.86 2.428a8.236 8.236 0 012.427 5.861c0 4.571-3.719 8.288-8.29 8.288zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.167.249-.645.809-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.063-.125-.562-1.353-.77-1.852-.203-.487-.41-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312-.229.249-.874.853-.874 2.08 0 1.228.895 2.414 1.02 2.58.125.166 1.761 2.689 4.266 3.771.596.257 1.061.41 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.472-.602 1.68-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>{FLEET_DATA.length} Active Rigs on Map</span>
              <span className="font-semibold text-slate-700">Click truck to inspect</span>
            </div>
          </div>

          {/* Right Overlay: Selected Delivery Details */}
          <div className="absolute right-3 top-[370px] lg:top-4 lg:right-4 w-[330px] max-w-[calc(100%-24px)] glass rounded-2xl p-4 z-20 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold tracking-widest text-slate-500 uppercase">
                Live Delivery Details
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                {selectedTruck.eta} ETA
              </span>
            </div>

            {/* Truck Banner */}
            <div className="mt-3 rounded-xl bg-[#0F172A] text-white p-3 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#2563EB] grid place-items-center font-extrabold text-sm font-mono">
                {selectedTruck.number.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-black font-mono">{selectedTruck.number}</div>
                <div className="text-[11px] text-white/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{selectedTruck.status} · {selectedTruck.eta} remaining</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/50 block">CARGO</span>
                <span className="text-xs font-bold text-white">{selectedTruck.load}</span>
              </div>
            </div>

            {/* Driver & Route Info Grid */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-white border border-slate-200 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold tracking-wide block">DRIVER</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                    ● Online
                  </span>
                </div>
                <div className="text-xs font-bold mt-0.5 flex items-center gap-1.5 text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white grid place-items-center text-[10px] shrink-0">
                    👨
                  </span>
                  <span className="truncate">{selectedTruck.driver}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono truncate">
                  {selectedTruck.driverPhone}
                </div>
              </div>

              <div className="rounded-xl bg-white border border-slate-200 p-2.5">
                <span className="text-[10px] text-slate-500 font-semibold block">CORRIDOR ROUTE</span>
                <div className="text-xs font-bold mt-0.5 text-slate-900 truncate">{selectedTruck.route}</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="truncate">Kanpur</span>
                  <span className="flex-1 h-px bg-slate-200 mx-1" />
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span className="truncate">{selectedTruck.to}</span>
                </div>
              </div>
            </div>

            {/* 5-Step Shipment Journey Progress Tracker */}
            <div className="mt-3 pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-800">Shipment Journey</span>
                <span className="text-slate-500 font-semibold">{selectedTruck.progress}% Complete</span>
              </div>

              <div className="flex items-center justify-between">
                {['Booked', 'Loading', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, idx) => {
                  const threshold = idx * 25;
                  const isDone = selectedTruck.progress >= threshold;
                  const isCurrent = selectedTruck.progress >= threshold && selectedTruck.progress < threshold + 25;
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold border-2 transition-all ${
                            isDone
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'bg-white border-slate-200 text-slate-400'
                          } ${isCurrent ? 'ring-2 ring-blue-400 ring-offset-2' : ''}`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span
                          className={`mt-1 text-[8px] font-semibold ${
                            isDone ? 'text-slate-900' : 'text-slate-400'
                          } text-center leading-tight max-w-[50px]`}
                        >
                          {step}
                        </span>
                      </div>
                      {idx < 4 && (
                        <div
                          className={`flex-1 h-[2px] mx-1 mb-4 ${
                            selectedTruck.progress > threshold ? 'bg-slate-900' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Driver Quick-Connect WhatsApp Action Module */}
            <div className="mt-3 rounded-2xl bg-[#0F172A] text-white p-3 border border-white/10 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                    Driver Quick-Connect
                  </span>
                </div>
                <span className="text-[10px] text-white/50 font-mono">{selectedTruck.driverPhone}</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenQuickConnect(selectedTruck)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.46 3.491 1.334 5.006L2 22.5l5.632-1.309a10.007 10.007 0 004.4.996h.005c5.535 0 10.03-4.495 10.03-10.029 0-2.68-1.043-5.199-2.937-7.094A9.972 9.972 0 0012.031 2zm0 18.285h-.004a8.28 8.28 0 01-4.225-1.157l-.303-.18-3.14.729.832-3.061-.197-.314A8.285 8.285 0 013.743 12.03c0-4.57 3.719-8.288 8.291-8.288 2.215 0 4.296.862 5.86 2.428a8.236 8.236 0 012.427 5.861c0 4.571-3.719 8.288-8.29 8.288zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.167.249-.645.809-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.063-.125-.562-1.353-.77-1.852-.203-.487-.41-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312-.229.249-.874.853-.874 2.08 0 1.228.895 2.414 1.02 2.58.125.166 1.761 2.689 4.266 3.771.596.257 1.061.41 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.472-.602 1.68-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
                  </svg>
                  <span>Chat Driver via WhatsApp</span>
                </button>
                <a
                  href={`tel:${selectedTruck.driverPhone.replace(/\s+/g, '')}`}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold grid place-items-center text-sm transition-colors shrink-0"
                  title={`Call ${selectedTruck.driver}`}
                  aria-label={`Call driver ${selectedTruck.driver}`}
                >
                  📞
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Timeline Strip (Desktop) */}
          <div className="absolute bottom-3 left-3 right-3 lg:left-1/2 lg:-translate-x-1/2 lg:w-[760px] glass rounded-2xl px-4 py-2.5 z-20 hidden md:flex items-center gap-3 shadow-lg">
            <span className="text-[11px] font-black tracking-widest text-slate-800 whitespace-nowrap font-display uppercase">
              Shipment Timeline
            </span>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex-1 flex items-center gap-2 overflow-x-auto text-[11px]">
              {[
                { time: '09:12 AM', text: 'Booked · UP78 DT 1234' },
                { time: '10:05 AM', text: 'Loading started · Dock 3' },
                { time: '11:30 AM', text: 'Dispatched · Kanpur Hub' },
                { time: 'Now', text: `En Route · ${selectedTruck.to}` },
                { time: selectedTruck.eta, text: 'Expected Delivery' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 rounded-full font-semibold border ${
                      idx === 3
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {item.time} · {item.text}
                  </span>
                  {idx < 4 && <div className="w-3 h-px bg-slate-300" />}
                </div>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-1.5 pl-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-extrabold text-emerald-600">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 03.5 - Fleet Operations: Driver Quick-Connect Console */}
      <section id="driver-quick-connect" className="max-w-[1360px] mx-auto px-4 sm:px-6 mt-10 sm:mt-14">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.06)] p-5 sm:p-7 overflow-hidden relative">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-black tracking-widest text-emerald-800 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>FLEET MANAGER CONSOLE · DRIVER QUICK-CONNECT</span>
              </div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-slate-900">
                Direct WhatsApp Dispatch With Vehicle Drivers
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-[620px]">
                Initiate pre-filled WhatsApp conversations with drivers on active corridor trips. Instant 1-tap templates for live GPS pins, ETA updates, fatigue advisories, toll Fastag issues, and digital e-POD delivery slips.
              </p>
            </div>

            {/* Quick Search & Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={driverSearchQuery}
                  onChange={(e) => setDriverSearchQuery(e.target.value)}
                  placeholder="Search driver or truck..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>
              {driverSearchQuery && (
                <button
                  type="button"
                  onClick={() => setDriverSearchQuery('')}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Drivers Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDrivers.map((truck) => (
              <div
                key={truck.id}
                className="rounded-2xl border border-slate-200 hover:border-slate-300 p-4 bg-slate-50/50 hover:bg-white transition-all shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Driver Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 rounded-xl grid place-items-center text-white font-extrabold text-xs shadow-sm shrink-0"
                        style={{ backgroundColor: truck.color }}
                      >
                        {truck.driver
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-black text-slate-900 font-display">
                            {truck.driver}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            ★ {truck.driverRating}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {truck.driverPhone}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                        truck.status === 'En Route'
                          ? 'bg-sky-100 text-sky-800 border border-sky-200'
                          : truck.status === 'Loading'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}
                    >
                      ● {truck.status}
                    </span>
                  </div>

                  {/* Vehicle & Checkpoint details */}
                  <div className="space-y-1.5 text-xs bg-white rounded-xl p-2.5 border border-slate-200/80 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Vehicle:</span>
                      <span className="font-mono font-bold text-slate-800">{truck.number}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Route:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[180px]">{truck.route}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Cargo:</span>
                      <span className="font-semibold text-slate-700">{truck.load}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Checkpoint:</span>
                      <span className="font-semibold text-emerald-700 truncate max-w-[170px]">
                        {truck.lastCheckpoint || 'NH-19 Toll'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleOpenQuickConnect(truck)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:shadow"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.46 3.491 1.334 5.006L2 22.5l5.632-1.309a10.007 10.007 0 004.4.996h.005c5.535 0 10.03-4.495 10.03-10.029 0-2.68-1.043-5.199-2.937-7.094A9.972 9.972 0 0012.031 2zm0 18.285h-.004a8.28 8.28 0 01-4.225-1.157l-.303-.18-3.14.729.832-3.061-.197-.314A8.285 8.285 0 013.743 12.03c0-4.57 3.719-8.288 8.291-8.288 2.215 0 4.296.862 5.86 2.428a8.236 8.236 0 012.427 5.861c0 4.571-3.719 8.288-8.29 8.288zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.167.249-.645.809-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.063-.125-.562-1.353-.77-1.852-.203-.487-.41-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312-.229.249-.874.853-.874 2.08 0 1.228.895 2.414 1.02 2.58.125.166 1.761 2.689 4.266 3.771.596.257 1.061.41 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.472-.602 1.68-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
                    </svg>
                    <span>Quick-Connect WhatsApp</span>
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectTruck(truck.id);
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer text-center truncate"
                    >
                      Focus Map Rig
                    </button>
                    <a
                      href={`tel:${truck.driverPhone.replace(/\s+/g, '')}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[11px] flex items-center gap-1 transition-colors"
                      title="Direct phone call"
                    >
                      <Phone className="w-3 h-3 text-blue-600" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDrivers.length === 0 && (
            <div className="mt-8 text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-sm font-bold text-slate-700">No active drivers found matching &quot;{driverSearchQuery}&quot;</p>
              <button
                type="button"
                onClick={() => setDriverSearchQuery('')}
                className="mt-2 text-xs text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Reset Driver Filter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 04 - Services Grid from Prototype */}
      <section id="logistics-services" className="max-w-[1360px] mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold tracking-widest text-blue-700">
              COMMERCIAL FREIGHT SERVICES · KANPUR HUB
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display uppercase leading-tight text-slate-900">
              Logistics That Plays Like a Strategy Game
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-[420px] leading-relaxed">
            Built for contractors, manufacturing traders, and industrial factories. Real GPS, live simulation dashboard, zero middleman broker commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOGISTICS_SERVICES.map((serv) => (
            <div
              key={serv.code}
              className="group rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white grid place-items-center text-2xl shadow-sm">
                    {serv.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600">
                    {serv.code}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5 font-display">
                  {serv.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {serv.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-600">
                  ✓ {serv.badge}
                </span>
                <a
                  href="#booking-calculator"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-[#2563EB]"
                >
                  <span>Get Tariff</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 - Instant Freight Quote & Booking Engine (Zero alert(), real calculation) */}
      <section id="booking-calculator" className="max-w-[1360px] mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          {/* Left: Calculator Box */}
          <div className="rounded-3xl bg-[#0F172A] text-white p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full bg-[#3B82F6]/20 blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-[#F59E0B]/15 blur-[50px] pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>BOOK TRUCK · INSTANT CORRIDOR QUOTE</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight">
                Transparent Freight Estimation in Seconds
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-[460px]">
                Direct Kanpur-based logistics booking. Select route, cargo weight, and load material to calculate transparent highway tariffs without broker markups.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3.5">
                {/* FROM */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] font-bold tracking-widest text-white/50 mb-1.5 uppercase">
                    From (Origin)
                  </label>
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-sm font-semibold outline-none text-white focus:border-white/30"
                  >
                    {['Kanpur', 'Lucknow', 'Delhi', 'Agra', 'Varanasi', 'Bareilly'].map((city) => (
                      <option key={city} className="text-slate-900" value={city}>
                        {city} Hub
                      </option>
                    ))}
                  </select>
                </div>

                {/* TO */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] font-bold tracking-widest text-white/50 mb-1.5 uppercase">
                    To (Destination)
                  </label>
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-sm font-semibold outline-none text-white focus:border-white/30"
                  >
                    {['Delhi', 'Lucknow', 'Agra', 'Varanasi', 'Bareilly', 'Kanpur'].map((city) => (
                      <option key={city} className="text-slate-900" value={city}>
                        {city} Hub
                      </option>
                    ))}
                  </select>
                </div>

                {/* MATERIAL */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] font-bold tracking-widest text-white/50 mb-1.5 uppercase">
                    Material Type
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-sm font-semibold outline-none text-white focus:border-white/30"
                  >
                    {['Cement', 'Steel', 'Tiles', 'Grains', 'Electronics', 'Furniture'].map((mat) => (
                      <option key={mat} className="text-slate-900" value={mat}>
                        {mat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* WEIGHT */}
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[11px] font-bold tracking-widest text-white/50 mb-1.5 uppercase">
                    Weight (Tons)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="55"
                    value={weightTons}
                    onChange={(e) => setWeightTons(e.target.value)}
                    className="w-full h-11 rounded-xl bg-white/10 border border-white/15 px-3 text-sm font-semibold outline-none text-white focus:border-white/30"
                  />
                </div>
              </div>

              {/* Action Button & Live Estimate Indicator */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateQuote}
                  className="h-11 px-6 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-slate-900 font-black text-sm shadow-[0_8px_24px_rgba(245,158,11,0.35)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Lock Estimate · ₹{calculatedPrice.toLocaleString('en-IN')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:+919450002407"
                  className="h-11 px-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Dispatch (+91 94500 02407)</span>
                </a>
              </div>

              {/* Resulting Honest Quote Card (Replacing browser alert) */}
              {generatedQuote && (
                <div className="mt-5 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                    <span className="font-mono text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Quote Generated #{generatedQuote.id}</span>
                    </span>
                    <button
                      onClick={() => handleCopyQuote(generatedQuote.id)}
                      className="text-xs text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedQuoteId ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                    <div>
                      <span className="text-white/50 block text-[10px]">ROUTE</span>
                      <span className="font-bold">{generatedQuote.from} → {generatedQuote.to}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px]">DISTANCE</span>
                      <span className="font-bold">{generatedQuote.distance} km</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px]">CARGO & WEIGHT</span>
                      <span className="font-bold">{generatedQuote.weight} Ton {generatedQuote.material}</span>
                    </div>
                    <div>
                      <span className="text-white/50 block text-[10px]">ESTIMATED TARIFF</span>
                      <span className="font-black text-amber-300 text-sm">₹{generatedQuote.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/60">
                    * Indicative corridor freight tariff subject to physical weighbridge slip and cargo handling specifications.
                  </p>

                  <div className="pt-1 flex gap-2">
                    <a
                      href={`https://wa.me/919450002407?text=${encodeURIComponent(
                        `Hello TruckWala 24x7, I received Freight Quote ${generatedQuote.id} for ${generatedQuote.from} to ${generatedQuote.to} (${generatedQuote.weight} Ton ${generatedQuote.material}) estimated at ₹${generatedQuote.price}. Please confirm vehicle dispatch.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Forward to WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3 text-[11px] text-white/50">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>12 trucks ready in Kanpur right now</span>
                </span>
                <span>·</span>
                <span>e-POD · GPS · Fastag Verified</span>
              </div>
            </div>
          </div>

          {/* Right: Why Choose Card */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-slate-800 font-display">
                  Why TruckWala 24×7
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                  98.2% ON-TIME
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Live GPS link for every trip',
                    desc: 'Share live link with customer; eliminates repeated status check phone calls.',
                    icon: '✓'
                  },
                  {
                    title: 'Kanpur Hub — 2 Full Warehouses',
                    desc: 'Loading docks, hydraulic lifts, 24×7 armed guards and CCTV security.',
                    icon: '🏭'
                  },
                  {
                    title: 'Direct Driver Logistics, Zero Broker',
                    desc: 'Save 12–18% compared to unorganized brokerage markets with verified background checks.',
                    icon: '💵'
                  },
                  {
                    title: 'Strategy-Game Control Room',
                    desc: 'Monitor full fleet movement in real-time with automatic milestone checkpoints.',
                    icon: '🎮'
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white grid place-items-center text-xs font-bold shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{feature.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-[#0F172A] text-white p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center text-lg">
                ⭐
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold">Trusted by 1,200+ businesses across UP</div>
                <div className="text-[11px] text-white/60">Construction, steel, trading, FMCG</div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-white text-slate-900">
                4.9/5
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 06 - Physical Hub Location & Control Center */}
      <section id="hub-location" className="max-w-[1360px] mx-auto px-4 sm:px-6 my-12 sm:my-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <div className="px-4 py-1.5 rounded-full bg-[#0F172A] text-white text-[11px] font-bold tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONS HUB · PHYSICAL YARD DETAILS</span>
          </div>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Left: Hub Facility Highlights */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-700">
              PHYSICAL HUB INFRASTRUCTURE
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display uppercase tracking-tight">
              Visit Our 24×7 Yard & Control Room
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Walk-in freight booking, heavy commercial truck inspection, driver verification, and computer diagnostics — all under one roof at our Panki Industrial Area yard & Gadan Khera Bypass facility.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">OPERATING HOURS</span>
                <span className="text-xs font-bold text-slate-900 block mt-1">24 Hours · 365 Days</span>
                <span className="text-[10px] text-emerald-600 font-semibold">● Yard Open Now</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">YARD CAPACITY</span>
                <span className="text-xs font-bold text-slate-900 block mt-1">12,000 sq ft Paved</span>
                <span className="text-[10px] text-slate-500">2 Loading Docks</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">EQUIPMENT</span>
                <span className="text-xs font-bold text-slate-900 block mt-1">Crane & Forklift</span>
                <span className="text-[10px] text-slate-500">24V Jump Rigs & ECM</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold block">TruckWala 24×7 Central Facility</span>
                <span className="text-[11px] text-white/60 block">
                  Panki Industrial Area, Kanpur & Gadan Khera Bypass, Unnao, UP
                </span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none py-2 px-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Quick Emergency & Roadside Bridge */}
          <div className="rounded-3xl bg-[#0F172A] text-white p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#F04438] font-bold uppercase tracking-wider mb-3">
                <AlertCircle className="w-4 h-4" />
                <span>Need Highway Breakdown Rescue?</span>
              </div>
              <h4 className="text-xl font-bold font-display uppercase tracking-tight text-white mb-2">
                Stranded On Highway With Mechanical Fault?
              </h4>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Our 24×7 mobile repair vans carry computerized ECM diagnostic tools, high-pressure air leak repair kits, 24V jump-starters, and genuine OEM spare parts directly to your truck on the highway shoulder.
              </p>
            </div>

            <div className="space-y-3">
              {onOpenSOSModal && (
                <button
                  type="button"
                  onClick={onOpenSOSModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#F04438] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 cursor-pointer transition-all"
                >
                  <AlertCircle className="w-4 h-4 animate-bounce" />
                  <span>Request Emergency Roadside Van</span>
                </button>
              )}

              <a
                href="tel:+919450002407"
                className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Hotline (+91 94500 02407)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Quick-Connect Modal */}
      <DriverQuickConnectModal
        isOpen={isQuickConnectOpen}
        onClose={handleCloseQuickConnect}
        truck={quickConnectTruck}
        onTrackAction={onTrackAction}
      />
    </div>
  );
};

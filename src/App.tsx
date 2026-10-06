import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Clock,
  Wrench,
  AlertTriangle,
  RotateCw,
  ExternalLink,
  ChevronRight,
  Radio,
  CheckCircle2,
  Navigation,
  Sparkles,
  Info,
  Calculator,
  FileText,
  Truck,
  Gamepad2,
  Eye
} from 'lucide-react';
import { EmergencyBreakdownModal } from './components/EmergencyBreakdownModal';
import { FreightQuoteEstimator } from './components/FreightQuoteEstimator';
import { MyTicketsModal } from './components/MyTicketsModal';
import { FleetAndServiceForm } from './components/FleetAndServiceForm';
import { DiagnosticsGuide } from './components/DiagnosticsGuide';
import { LocationMap } from './components/LocationMap';
import { ReviewsSection } from './components/ReviewsSection';
import { LogisticsStrategyDashboard } from './components/LogisticsStrategyDashboard';
import { VehicleCoverage } from './components/VehicleCoverage';
import { SeoKnowledgeFaqSection } from './components/SeoKnowledgeFaqSection';
import { TrackingEventType } from './types';

/* ============================================================
   TRUCKWALA 24×7 — UNIFIED COMMERCIAL HIGHWAY PLATFORM
   Roadside Assistance + 3D Diagnostic Visualizer + Strategy Game Logistics
   Brand Colors: TRUCK Blue (#2563EB) | WALA Red (#F04438) | 24×7 Green (#16A34A)
   ============================================================ */

export const CONFIG = {
  business: {
    name: "TruckWala 24×7",
    tagline: "Complete Commercial Vehicle Solution Under One Roof",
    phone: "+91-9450002407",
    phoneDisplay: "+91 94500 02407",
    whatsapp: "919450002407",
    email: "help@truckwala24x7.com",
    address: "Gadan Khera Bypass, Unnao & Panki Industrial Hub, Kanpur, UP, India",
    coordinates: { lat: 26.4499, lng: 80.3319 },
    googleMapsUrl: "https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA",
    googleReviewUrl: "https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA",
    corridor: "Kanpur–Unnao NH-27 Corridor",
  },
  colors: {
    bg: '#0A0D14',
    panel: 'rgba(16, 20, 32, 0.75)',
    blue: '#2563EB',        // TRUCK Blue
    orange: '#F04438',      // WALA Red/Orange
    green: '#16A34A',       // 24×7 Green
    electric: '#2DD4FF',
  }
};

export const SERVICES = [
  {
    id: 'engine',
    name: "Engine Diagnostics",
    desc: "Computerised diagnostics and engine health checks.",
    details: "BS-VI SCR / AdBlue derate clearing, ECM scan, injector calibration, and high-temp overheating fixes.",
    icon: "⚙️",
    color: '#F04438',
    turnaround: "15–30 Min Target"
  },
  {
    id: 'cabin',
    name: "Cabin & Electrical",
    desc: "Alternator, starter, wiring and cabin repairs.",
    details: "24V starter motors, alternator charging relays, fuse board short circuits, and digital dashboard meters.",
    icon: "⚡",
    color: '#2563EB',
    turnaround: "20–35 Min Target"
  },
  {
    id: 'brakes',
    name: "Brake System",
    desc: "Brake pads, drums, hydraulics and ABS service.",
    details: "Dual air tank pressure leaks, spring brake chamber lock clearing, pneumatic valve repair, and shoe relining.",
    icon: "🛑",
    color: '#F04438',
    turnaround: "15–25 Min Target"
  },
  {
    id: 'tyres',
    name: "Tyre Service",
    desc: "Puncture, replacement and tyre service on the go.",
    details: "Heavy commercial radial tyre vulcanizing, puncture patch, tubeless tyre rim bead seating, and wheel swap.",
    icon: "⭕",
    color: '#16A34A',
    turnaround: "15–30 Min Target"
  },
  {
    id: 'battery',
    name: "Battery Service",
    desc: "Battery jump-start, testing and replacement.",
    details: "Heavy-duty 24V jump-start booster pack, terminal corrosion repair, alternator voltage testing, and fresh battery swaps.",
    icon: "🔋",
    color: '#EAB308',
    turnaround: "15–20 Min Target"
  },
  {
    id: 'body',
    name: "Container & Body",
    desc: "Container repair, body work and structural fixes.",
    details: "Container sheet welding, rear door hinge locks, chassis structural reinforcement, and accident recovery.",
    icon: "📦",
    color: '#2563EB',
    turnaround: "30–45 Min Target"
  },
];

export const HOTSPOTS = [
  { id: 'engine', position: [-1.8, 0.4, 0.9] as [number, number, number], label: 'Engine', serviceId: 'engine' },
  { id: 'cabin', position: [-1.5, 1.4, 0] as [number, number, number], label: 'Cabin', serviceId: 'cabin' },
  { id: 'brakes', position: [0.8, -0.3, 1.2] as [number, number, number], label: 'Brakes', serviceId: 'brakes' },
  { id: 'tyres', position: [1.8, -0.4, 1.1] as [number, number, number], label: 'Tyres', serviceId: 'tyres' },
  { id: 'battery', position: [-2.2, 0.2, -0.8] as [number, number, number], label: 'Battery', serviceId: 'battery' },
  { id: 'body', position: [1.2, 1.2, 0] as [number, number, number], label: 'Container', serviceId: 'body' },
];

function Wheel({
  position,
  onClickPart,
  active
}: {
  position: [number, number, number];
  onClickPart?: (() => void) | null;
  active?: boolean;
}) {
  const wheelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        if (onClickPart) {
          e.stopPropagation();
          onClickPart();
        }
      }}
    >
      <group ref={wheelRef} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
          <meshStandardMaterial
            color={active ? '#F04438' : '#14161f'}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.29, 16]} />
          <meshStandardMaterial
            color={active ? '#2563EB' : '#4a5568'}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.31, 12]} />
          <meshStandardMaterial color="#2d3748" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

function TruckModel({
  onPartClick,
  activePart,
}: {
  onPartClick: (id: string) => void;
  activePart: string | null;
}) {
  const group = useRef<THREE.Group>(null);
  const headlightL = useRef<THREE.PointLight>(null);
  const headlightR = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (headlightL.current && headlightR.current) {
      const intensity = 2 + Math.sin(t * 2) * 0.3;
      headlightL.current.intensity = intensity;
      headlightR.current.intensity = intensity;
    }
  });

  const partColor = (partId: string, baseColor: string) =>
    activePart === partId ? '#F04438' : baseColor;

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      <group onClick={(e) => { e.stopPropagation(); onPartClick('body'); }}>
        <mesh position={[1.2, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 1.8, 2]} />
          <meshStandardMaterial color={partColor('body', '#181C26')} metalness={0.6} roughness={0.4} />
        </mesh>
        {[-0.8, -0.2, 0.4, 1.0, 1.6, 2.2].map((x, i) => (
          <mesh key={i} position={[x, 0.8, 1.01]} castShadow>
            <boxGeometry args={[0.04, 1.7, 0.02]} />
            <meshStandardMaterial color="#282E3E" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        <mesh position={[1.2, 0.5, 1.02]}>
          <boxGeometry args={[3.4, 0.06, 0.01]} />
          <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[1.2, 1.2, 1.02]}>
          <planeGeometry args={[2.4, 0.3]} />
          <meshStandardMaterial color="#0A0D14" transparent opacity={0.92} />
        </mesh>
      </group>

      <group onClick={(e) => { e.stopPropagation(); onPartClick('cabin'); }}>
        <mesh position={[-1.8, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 1.4, 2]} />
          <meshStandardMaterial color={partColor('cabin', '#2563EB')} metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-1.8, 1.4, 0]} castShadow>
          <boxGeometry args={[1.3, 0.15, 1.9]} />
          <meshStandardMaterial color="#1D4ED8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-2.45, 0.9, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.05, 0.8, 1.7]} />
          <meshStandardMaterial
            color="#2DD4FF"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.6}
            emissive="#2DD4FF"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[-1.8, 0.9, 1.01]}>
          <boxGeometry args={[0.9, 0.5, 0.02]} />
          <meshStandardMaterial color="#2DD4FF" metalness={0.9} roughness={0.1} transparent opacity={0.5} />
        </mesh>
        <mesh position={[-1.8, 0.3, 1.01]}>
          <boxGeometry args={[1.2, 0.02, 0.01]} />
          <meshStandardMaterial color="#1E3A8A" />
        </mesh>
        <mesh position={[-1.5, 0.5, 1.02]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
          <meshStandardMaterial color="#93C5FD" metalness={0.9} />
        </mesh>
        <mesh position={[-2.3, 1.1, 1.1]}>
          <boxGeometry args={[0.08, 0.15, 0.1]} />
          <meshStandardMaterial color="#181C26" metalness={0.8} />
        </mesh>
      </group>

      <group>
        <mesh position={[-2.5, 0.4, 0.6]}>
          <boxGeometry args={[0.05, 0.15, 0.25]} />
          <meshStandardMaterial color="#fff4c2" emissive="#fff4c2" emissiveIntensity={2} />
        </mesh>
        <mesh position={[-2.5, 0.4, -0.6]}>
          <boxGeometry args={[0.05, 0.15, 0.25]} />
          <meshStandardMaterial color="#fff4c2" emissive="#fff4c2" emissiveIntensity={2} />
        </mesh>
        <pointLight ref={headlightL} position={[-3, 0.4, 0.6]} color="#fff4c2" intensity={2} distance={5} />
        <pointLight ref={headlightR} position={[-3, 0.4, -0.6]} color="#fff4c2" intensity={2} distance={5} />
      </group>

      <mesh position={[-2.5, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.4, 1.2]} />
        <meshStandardMaterial color="#0A0D14" metalness={0.9} roughness={0.2} />
      </mesh>

      <mesh position={[-2.4, -0.2, 0]} castShadow>
        <boxGeometry args={[0.2, 0.2, 2.1]} />
        <meshStandardMaterial color="#181C26" metalness={0.8} roughness={0.3} />
      </mesh>

      <group onClick={(e) => { e.stopPropagation(); onPartClick('engine'); }}>
        <mesh position={[-2.1, 0.2, 0]}>
          <boxGeometry args={[0.8, 0.6, 1.5]} />
          <meshStandardMaterial
            color={partColor('engine', '#282E3E')}
            transparent
            opacity={activePart === 'engine' ? 0.6 : 0.05}
            emissive={activePart === 'engine' ? '#F04438' : '#000000'}
            emissiveIntensity={activePart === 'engine' ? 0.5 : 0}
          />
        </mesh>
      </group>

      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[5.2, 0.15, 1.6]} />
        <meshStandardMaterial color="#0A0D14" metalness={0.8} roughness={0.4} />
      </mesh>

      <mesh position={[-0.8, -0.1, 1]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.3]} />
        <meshStandardMaterial color="#181C26" metalness={0.7} roughness={0.4} />
      </mesh>

      <group onClick={(e) => { e.stopPropagation(); onPartClick('battery'); }}>
        <mesh position={[-2.2, 0.2, -0.8]} castShadow>
          <boxGeometry args={[0.35, 0.3, 0.25]} />
          <meshStandardMaterial color={partColor('battery', '#181C26')} metalness={0.6} roughness={0.5} />
        </mesh>
        <mesh position={[-2.2, 0.37, -0.8]}>
          <cylinderGeometry args={[0.03, 0.03, 0.05, 8]} />
          <meshStandardMaterial color="#EAB308" emissive="#EAB308" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {[
        { pos: [-1.8, -0.5, 1.1] as [number, number, number], id: null },
        { pos: [-1.8, -0.5, -1.1] as [number, number, number], id: null },
        { pos: [0.8, -0.5, 1.1] as [number, number, number], id: 'brakes' },
        { pos: [0.8, -0.5, -1.1] as [number, number, number], id: 'brakes' },
        { pos: [1.8, -0.5, 1.1] as [number, number, number], id: 'tyres' },
        { pos: [1.8, -0.5, -1.1] as [number, number, number], id: 'tyres' },
        { pos: [2.4, -0.5, 1.1] as [number, number, number], id: 'tyres' },
        { pos: [2.4, -0.5, -1.1] as [number, number, number], id: 'tyres' },
      ].map((w, i) => (
        <Wheel
          key={i}
          position={w.pos}
          onClickPart={w.id ? () => onPartClick(w.id) : null}
          active={activePart === w.id}
        />
      ))}

      {[-1.8, 0.8, 1.8, 2.4].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.2, 1.15]}>
            <boxGeometry args={[0.8, 0.1, 0.1]} />
            <meshStandardMaterial color="#181C26" metalness={0.7} />
          </mesh>
          <mesh position={[x, -0.2, -1.15]}>
            <boxGeometry args={[0.8, 0.1, 0.1]} />
            <meshStandardMaterial color="#181C26" metalness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HotspotMarker({
  position,
  active,
  onClick,
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  useFrame((state) => {
    if (ringRef.current) {
      const t = state.clock.getElapsedTime();
      const s = 1 + (Math.sin(t * 3.5) * 0.22 + 0.22);
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color={active ? '#F04438' : hovered ? '#2563EB' : '#16A34A'}
          emissive={active ? '#F04438' : hovered ? '#2563EB' : '#16A34A'}
          emissiveIntensity={active ? 2.5 : 1.4}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.16, 32]} />
        <meshBasicMaterial
          color={active ? '#F04438' : '#2563EB'}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.012, 0.005, 0.16, 8]} />
        <meshStandardMaterial
          color={active ? '#F04438' : '#4a5568'}
          emissive={active ? '#F04438' : '#1a202c'}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// ============ HEADER ============
function Header({
  onOpenSOS,
  onOpenMyTickets,
  onTrackAction,
  viewMode,
  setViewMode,
}: {
  onOpenSOS: () => void;
  onOpenMyTickets: () => void;
  onTrackAction: (type: TrackingEventType, label: string) => void;
  viewMode: 'ALL' | 'RESCUE_3D' | 'LOGISTICS_STRATEGY';
  setViewMode: (m: 'ALL' | 'RESCUE_3D' | 'LOGISTICS_STRATEGY') => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#0A0D14]/92 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Wordmark Treatment */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-900/30 ring-1 ring-white/20">
            T
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight font-display flex items-baseline gap-1">
                <span className="text-[#2563EB]">TRUCK</span>
                <span className="text-[#F04438]">WALA</span>
                <span className="text-[#16A34A]">24×7</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16A34A]/15 text-[#16A34A] border border-[#16A34A]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                24×7 ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {CONFIG.business.corridor} · Gadan Khera & Panki Hub
            </p>
          </div>
        </div>

        {/* View Switcher Pill & Navigation */}
        <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-300">
          <a href="#hero-3d" className="hover:text-[#2563EB] transition-colors">
            3D Visualizer
          </a>
          <a href="#driver-quick-connect" className="hover:text-[#16A34A] transition-colors flex items-center gap-1 text-emerald-400">
            <span>💬 Quick-Connect</span>
          </a>
          <a href="#live-tracking" className="hover:text-[#2563EB] transition-colors flex items-center gap-1">
            <Gamepad2 className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Fleet Simulator</span>
          </a>
          <a href="#vehicle-coverage" className="hover:text-[#2563EB] transition-colors">
            Mahindra & Models
          </a>
          <a href="#seo-knowledge-faq" className="hover:text-[#2563EB] transition-colors">
            Highway FAQs
          </a>
          <a
            href="/vanilla/index.html"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            title="Open lightweight vanilla HTML version"
          >
            <span>Vanilla Mode</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={onOpenMyTickets}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            title="View my breakdown tickets & saved quotes"
          >
            <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">My Tickets</span>
          </button>

          <a
            href={`tel:${CONFIG.business.phone}`}
            onClick={() => onTrackAction('CALL_CLICK', 'Header Call Direct')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Call 24×7</span>
          </a>

          <a
            href={`https://wa.me/${CONFIG.business.whatsapp}?text=${encodeURIComponent(
              'Hello TruckWala 24x7, I need urgent commercial vehicle breakdown assistance on the highway.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackAction('WHATSAPP_CLICK', 'Header WhatsApp Direct')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#16A34A]/20 hover:bg-[#16A34A]/30 text-[#16A34A] border border-[#16A34A]/40 text-xs font-semibold transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onTrackAction('JOB_REQUESTED', 'Header SOS Clicked');
              onOpenSOS();
            }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#F04438] hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950/40 transition-all hover:scale-105 active:scale-95 cursor-pointer ring-1 ring-white/20"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>EMERGENCY SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ============ HERO 3D INTERACTIVE ============
function Hero3D({
  activePart,
  setActivePart,
  onOpenSOS,
  onTrackAction,
}: {
  activePart: string | null;
  setActivePart: (id: string | null) => void;
  onOpenSOS: () => void;
  onTrackAction: (type: TrackingEventType, label: string) => void;
}) {
  const activeService = SERVICES.find((s) => s.id === activePart);

  const handleSelectHotspot = (serviceId: string) => {
    setActivePart(serviceId);
    onTrackAction('JOB_REQUESTED', `3D Hotspot Clicked: ${serviceId}`);
  };

  return (
    <section id="hero-3d" className="relative min-h-[750px] lg:h-[860px] bg-[#0A0D14] border-b border-slate-800 overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#2563EB]/10 via-[#F04438]/10 to-transparent blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Interactive 3D Heavy Fleet Diagnostic Model</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase font-display max-w-4xl mx-auto leading-none">
          {CONFIG.business.tagline}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Rotate and interact with the commercial truck in 3D. Click any component or hotspot to diagnose roadside faults and dispatch highway rescue.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto">
          {SERVICES.map((s) => {
            const isSelected = activePart === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectHotspot(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-900/40 ring-2 ring-white/40 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            );
          })}
          {activePart && (
            <button
              onClick={() => setActivePart(null)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative flex-1 w-full min-h-[420px] lg:min-h-[500px] z-10">
        <Canvas
          shadows
          camera={{ position: [-5, 2.5, 5], fov: 42 }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[6, 8, 6]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#2563EB" />
          <pointLight position={[0, -1, 0]} intensity={0.9} color="#F04438" distance={6} />

          <Suspense fallback={null}>
            <TruckModel
              onPartClick={handleSelectHotspot}
              activePart={activePart}
            />

            {HOTSPOTS.map((h) => (
              <HotspotMarker
                key={h.id}
                position={h.position}
                active={activePart === h.serviceId}
                onClick={() => handleSelectHotspot(h.serviceId)}
              />
            ))}

            <ContactShadows
              position={[0, -0.92, 0]}
              opacity={0.7}
              scale={12}
              blur={2}
              far={4}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 + 0.05}
            minPolarAngle={Math.PI / 6}
            autoRotate={!activePart}
            autoRotateSpeed={0.5}
          />
        </Canvas>

        <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-slate-800 text-xs text-slate-400 backdrop-blur-md">
          <RotateCw className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Click & Drag to Rotate · Scroll to Zoom · Tap Components</span>
        </div>

        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 right-4 sm:right-6 max-w-sm sm:max-w-md w-[calc(100%-2rem)] z-30 bg-[#101422]/95 border-2 rounded-2xl p-5 shadow-2xl backdrop-blur-xl"
              style={{ borderColor: activeService.color }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner"
                    style={{ backgroundColor: `${activeService.color}25` }}
                  >
                    {activeService.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white font-display">
                        {activeService.name}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: activeService.color }}
                      >
                        Selected
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Corridor Response: {activeService.turnaround}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePart(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  aria-label="Close part card"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-slate-200 mt-3 font-medium">
                {activeService.desc}
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {activeService.details}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => {
                    onTrackAction('JOB_REQUESTED', `Dispatch Van: ${activeService.name}`);
                    onOpenSOS();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl text-white text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-1.5 cursor-pointer ring-1 ring-white/20 bg-[#F04438] hover:bg-red-700"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Dispatch Van Now</span>
                </button>

                <a
                  href={`https://wa.me/${CONFIG.business.whatsapp}?text=${encodeURIComponent(
                    `Hello TruckWala 24x7, I need ${activeService.name} roadside assistance on the Kanpur-Unnao corridor.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    onTrackAction('WHATSAPP_CLICK', `WhatsApp Part: ${activeService.name}`)
                  }
                  className="p-2.5 rounded-xl bg-[#16A34A]/20 hover:bg-[#16A34A]/30 text-[#16A34A] border border-[#16A34A]/40 transition-colors"
                  title="WhatsApp this issue"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${CONFIG.business.phone}`}
                  onClick={() =>
                    onTrackAction('CALL_CLICK', `Call Part: ${activeService.name}`)
                  }
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  title="Call Emergency Line"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 bg-slate-950/80 border-t border-slate-800/80 backdrop-blur-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <MapPin className="w-4 h-4 text-[#F04438]" />
              Highway Hub: Gadan Khera Bypass, Unnao
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 font-medium">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              Arrival Target: 15–30 Minutes on NH-27 Corridor
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Need immediate help?</span>
            <a
              href={`tel:${CONFIG.business.phone}`}
              className="font-bold text-[#F04438] hover:underline"
            >
              {CONFIG.business.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES GRID ============
function ServicesGrid({
  onSelectService,
  onOpenSOS,
  onTrackAction,
}: {
  onSelectService: (id: string) => void;
  onOpenSOS: () => void;
  onTrackAction: (type: TrackingEventType, label: string) => void;
}) {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#0A0D14] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-[#2563EB] mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Heavy Commercial Vehicle Specialization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-display">
            Comprehensive Services Under One Roof
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Equipped with mobile mechanical diagnostic vans, 24V jumpstart rigs, genuine OEM spares, and computerized ECM scanners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.id}
              className="group relative bg-[#101420] border border-slate-800 hover:border-slate-600 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: s.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-inner"
                    style={{ backgroundColor: `${s.color}20` }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                    {s.turnaround}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  {s.name}
                </h3>
                <p className="text-sm text-slate-300 mb-2 font-medium">
                  {s.desc}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {s.details}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectService(s.id);
                    onTrackAction('JOB_REQUESTED', `Inspect 3D: ${s.name}`);
                    const hero = document.getElementById('hero-3d');
                    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Inspect in 3D</span>
                </button>

                <button
                  onClick={() => {
                    onTrackAction('JOB_REQUESTED', `Book Service: ${s.name}`);
                    onOpenSOS();
                  }}
                  className="py-2 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer bg-[#F04438] hover:bg-red-700"
                >
                  <span>Book Van</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ STATS ============
function Stats() {
  const stats = [
    {
      value: "15–30 Min",
      label: "Target Arrival Time",
      sub: "Average highway response target from Gadan Khera hub on NH-27",
      color: "#F04438",
    },
    {
      value: "10,000+",
      label: "Breakdown Assists",
      sub: "Commercial trailers, tippers, containers, & BS-VI fleets supported",
      color: "#2563EB",
    },
    {
      value: "24/7/365",
      label: "Highway Standby",
      sub: "Dedicated day & night mobile repair vans stationed on corridor",
      color: "#16A34A",
    },
    {
      value: "OEM Spares",
      label: "Genuine Components",
      sub: "Wabco/Knorr air valves, Fleetguard filters, genuine DEF & sensors",
      color: "#2DD4FF",
    },
  ];

  return (
    <section className="py-16 bg-[#080B12] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((st, i) => (
            <div
              key={i}
              className="bg-[#0F131E] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: st.color }}
              />
              <div>
                <p
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display mb-1"
                  style={{ color: st.color }}
                >
                  {st.value}
                </p>
                <p className="text-base font-bold text-white">
                  {st.label}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {st.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer({
  onOpenSOS,
  onOpenMyTickets,
  onTrackAction,
}: {
  onOpenSOS: () => void;
  onOpenMyTickets: () => void;
  onTrackAction: (type: TrackingEventType, label: string) => void;
}) {
  return (
    <footer className="bg-[#06080E] text-slate-400 pt-16 pb-28 sm:pb-20 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center font-black text-white text-lg">
                T
              </div>
              <span className="text-xl font-extrabold tracking-tight font-display flex items-baseline gap-1">
                <span className="text-[#2563EB]">TRUCK</span>
                <span className="text-[#F04438]">WALA</span>
                <span className="text-[#16A34A]">24×7</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {CONFIG.business.tagline}. On-site mechanical repairs, ECM scanning, tyre services, and heavy towing dispatch across Uttar Pradesh.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <Radio className="w-3.5 h-3.5 text-[#16A34A] animate-pulse" />
              <span>Corridor Highway Standby Active</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-xs">
              Corridor Hub & Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero-3d" className="hover:text-white transition-colors">
                  3D Interactive Truck Model
                </a>
              </li>
              <li>
                <a href="#live-tracking" className="hover:text-white transition-colors">
                  Logistics Strategy Simulator
                </a>
              </li>
              <li>
                <a href="#booking-calculator" className="hover:text-white transition-colors">
                  Fast Freight Calculator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  All Commercial Services
                </a>
              </li>
              <li>
                <a href="#diagnostics" className="hover:text-white transition-colors">
                  BS-VI AdBlue & Air Leak Guide
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenMyTickets}
                  className="hover:text-[#2563EB] text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>My Breakdown Tickets</span>
                </button>
              </li>
              <li>
                <a
                  href="/vanilla/index.html"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#2563EB]"
                >
                  <span>Standalone Vanilla Web Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-xs">
              Highway Location
            </h4>
            <p className="text-xs text-slate-300 font-medium mb-1">
              {CONFIG.business.address}
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Coordinates: {CONFIG.business.coordinates.lat}, {CONFIG.business.coordinates.lng}
            </p>
            <a
              href={CONFIG.business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackAction('MAP_CLICK', 'Footer Directions Click')}
              className="inline-flex items-center gap-1.5 text-xs text-[#2563EB] hover:underline font-semibold"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-xs">
              24×7 Highway Dispatch
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Direct highway emergency control for drivers, fleet managers, and transporters:
            </p>
            <a
              href={`tel:${CONFIG.business.phone}`}
              onClick={() => onTrackAction('CALL_CLICK', 'Footer Direct Call')}
              className="flex items-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#F04438] transition-colors mb-3 group"
            >
              <Phone className="w-4 h-4 text-[#16A34A] group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-[10px] text-slate-400">Emergency Phone</p>
                <p className="text-sm font-bold text-white">{CONFIG.business.phoneDisplay}</p>
              </div>
            </a>
            <p className="text-xs text-slate-500">
              Email: <a href={`mailto:${CONFIG.business.email}`} className="text-slate-400 hover:underline">{CONFIG.business.email}</a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {CONFIG.business.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">NH-27 Commercial Fleet Support</span>
            <span>·</span>
            <a href="/vanilla/index.html" className="text-slate-400 hover:text-white transition-colors">
              Vanilla Version
            </a>
            <span>·</span>
            <a href="/logistics/index.html" className="text-slate-400 hover:text-white transition-colors">
              Logistics Page
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ FLOATING SOS BAR ============
function FloatingSOS({
  onOpenSOS,
  onOpenMyTickets,
  onTrackAction,
}: {
  onOpenSOS: () => void;
  onOpenMyTickets: () => void;
  onTrackAction: (type: TrackingEventType, label: string) => void;
}) {
  return (
    <aside aria-label="Emergency quick actions" className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[#0A0D14]/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl max-w-4xl mx-auto sm:bottom-4 sm:rounded-2xl sm:border">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <button
          onClick={() => {
            onTrackAction('JOB_REQUESTED', 'Floating Bar SOS Pressed');
            onOpenSOS();
          }}
          className="flex-1 py-3 px-4 rounded-xl bg-[#F04438] hover:bg-red-700 text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 ring-1 ring-white/30 transition-transform active:scale-95 cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          <span>INSTANT HIGHWAY SOS</span>
        </button>

        <button
          onClick={onOpenMyTickets}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          title="View my breakdown tickets & saved quotes"
        >
          <FileText className="w-5 h-5 text-[#2563EB]" />
        </button>

        <a
          href={`https://wa.me/${CONFIG.business.whatsapp}?text=${encodeURIComponent(
            'EMERGENCY: Truck Breakdown on Kanpur–Unnao NH-27 Corridor. Please send immediate rescue van.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onTrackAction('WHATSAPP_CLICK', 'Floating Bar WhatsApp')}
          className="p-3 rounded-xl bg-[#16A34A]/20 hover:bg-[#16A34A]/30 text-[#16A34A] border border-[#16A34A]/40 flex items-center justify-center transition-colors"
          title="Share Location on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <a
          href={`tel:${CONFIG.business.phone}`}
          onClick={() => onTrackAction('CALL_CLICK', 'Floating Bar Call')}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 flex items-center justify-center transition-colors"
          title="Direct Emergency Hotline"
        >
          <Phone className="w-5 h-5 text-[#16A34A]" />
        </a>
      </div>
    </aside>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isTicketsOpen, setIsTicketsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'ALL' | 'RESCUE_3D' | 'LOGISTICS_STRATEGY'>('ALL');

  const handleTrackAction = (
    type: TrackingEventType,
    label: string,
    metadata?: Record<string, unknown>
  ) => {
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: type,
        label,
        metadata,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleSelectServiceFromGrid = (serviceId: string) => {
    setActivePart(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans selection:bg-[#2563EB] selection:text-white pb-32 sm:pb-24">
      {/* 01 - Header */}
      <Header
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenMyTickets={() => setIsTicketsOpen(true)}
        onTrackAction={handleTrackAction}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* 02 - View Mode Switcher Sticky Bar */}
      <div className="bg-[#0F172A] border-b border-slate-800 py-2.5 px-4 sticky top-18 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'ALL'
                  ? 'bg-[#2563EB] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌟 All Operations
            </button>
            <button
              onClick={() => setViewMode('RESCUE_3D')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'RESCUE_3D'
                  ? 'bg-[#F04438] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🛠️ 3D Breakdown Rescue</span>
            </button>
            <button
              onClick={() => setViewMode('LOGISTICS_STRATEGY')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'LOGISTICS_STRATEGY'
                  ? 'bg-[#3B82F6] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🎮 Strategy Fleet Command</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="hidden sm:inline">Kanpur Panki Hub · Gadan Khera NH-27 Corridor</span>
            <a
              href="#booking-calculator"
              className="text-[#F59E0B] hover:underline font-bold"
            >
              Instant Freight Quote ↗
            </a>
          </div>
        </div>
      </div>

      {/* 03 - SECTION 1: 3D Procedural Truck Visualizer (Visible in ALL or RESCUE_3D) */}
      {(viewMode === 'ALL' || viewMode === 'RESCUE_3D') && (
        <>
          <Hero3D
            activePart={activePart}
            setActivePart={setActivePart}
            onOpenSOS={() => setIsSOSOpen(true)}
            onTrackAction={handleTrackAction}
          />

          <ServicesGrid
            onSelectService={handleSelectServiceFromGrid}
            onOpenSOS={() => setIsSOSOpen(true)}
            onTrackAction={handleTrackAction}
          />

          <Stats />
        </>
      )}

      {/* 04 - SECTION 2: Strategy Game Logistics Dashboard (Visible in ALL or LOGISTICS_STRATEGY) */}
      {(viewMode === 'ALL' || viewMode === 'LOGISTICS_STRATEGY') && (
        <LogisticsStrategyDashboard
          onTrackAction={handleTrackAction}
          onOpenSOSModal={() => setIsSOSOpen(true)}
        />
      )}

      {/* 05 - Supporting Operational Sections */}
      {viewMode === 'ALL' && (
        <>
          <FreightQuoteEstimator
            onTrackAction={handleTrackAction}
            onOpenEmergencyModal={() => setIsSOSOpen(true)}
          />

          <div id="diagnostics">
            <DiagnosticsGuide
              onOpenSOS={() => setIsSOSOpen(true)}
              onTrackAction={handleTrackAction}
            />
          </div>

          <div id="vehicle-coverage">
            <VehicleCoverage
              onTrackAction={(type, label) => handleTrackAction(type, label)}
            />
          </div>

          <FleetAndServiceForm
            onTrackAction={handleTrackAction}
          />

          <div id="location">
            <LocationMap onTrackAction={handleTrackAction} />
          </div>

          <ReviewsSection onTrackAction={handleTrackAction} />

          <SeoKnowledgeFaqSection
            onOpenSOS={() => setIsSOSOpen(true)}
            onTrackAction={handleTrackAction}
          />
        </>
      )}

      {/* 06 - Footer */}
      <Footer
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenMyTickets={() => setIsTicketsOpen(true)}
        onTrackAction={handleTrackAction}
      />

      {/* 07 - Floating SOS Bar */}
      <FloatingSOS
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenMyTickets={() => setIsTicketsOpen(true)}
        onTrackAction={handleTrackAction}
      />

      {/* 08 - Modals */}
      <EmergencyBreakdownModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onTrackAction={handleTrackAction}
      />

      <MyTicketsModal
        isOpen={isTicketsOpen}
        onClose={() => setIsTicketsOpen(false)}
        onOpenSOSModal={() => {
          setIsTicketsOpen(false);
          setIsSOSOpen(true);
        }}
      />
    </div>
  );
}

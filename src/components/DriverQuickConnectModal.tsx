import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  Copy,
  CheckCircle2,
  Navigation,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Send,
  MessageCircle,
  Truck,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TruckFleetItem } from './LogisticsStrategyDashboard';
import { TrackingEventType } from '../types';

export interface DriverQuickConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  truck: TruckFleetItem | null;
  onTrackAction?: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
}

type TemplateKey = 'status_eta' | 'safety_fatigue' | 'fastag_fuel' | 'epod_handover' | 'breakdown_alert' | 'custom';

interface MessageTemplate {
  key: TemplateKey;
  label: string;
  badge: string;
  icon: string;
  getText: (truck: TruckFleetItem, dispatcherName: string) => string;
}

const TEMPLATES: MessageTemplate[] = [
  {
    key: 'status_eta',
    label: 'Location & ETA Check',
    badge: 'Transit Update',
    icon: '📍',
    getText: (truck, dispatcher) =>
      `नमस्ते ${truck.driver} जी, ${dispatcher} से संपर्क कर रहे हैं।\n\nगाड़ी: *${truck.number}*\nरूट: *${truck.route}* (${truck.load})\n\nकृपया अपना वर्तमान हाईवे लोकेशन (GPS Location) और अनुमानित पहुंचने का समय (ETA - वर्तमान: ${truck.eta}) साझा करें। धन्यवाद।`
  },
  {
    key: 'safety_fatigue',
    label: 'Safety & Night Halt Advisory',
    badge: 'Road Safety',
    icon: '🛡️',
    getText: (truck, dispatcher) =>
      `नमस्ते ${truck.driver} जी, ${dispatcher} से सुरक्षा संदेश:\n\nगाड़ी: *${truck.number}*\nरूट: *${truck.route}*\n\nयदि आपको थकान महसूस हो रही है या रात में दृश्यता कम है, तो कृपया निकटतम अधिकृत पेट्रोल पंप या सुरक्षित ढाबे पर 15-20 मिनट का विश्राम लें। सुरक्षित ड्राइव करें, आपकी सुरक्षा हमारी प्राथमिकता है।`
  },
  {
    key: 'fastag_fuel',
    label: 'Toll Fastag & Fuel Verification',
    badge: 'Corridor Operations',
    icon: '⛽',
    getText: (truck, dispatcher) =>
      `नमस्ते ${truck.driver} जी, ${dispatcher} से:\n\nगाड़ी: *${truck.number}* के लिए टोल / Fastag और डीजल पर्ची का स्टेटस जांच रहे हैं।\n\nयदि Fastag में कोई समस्या आ रही है या टोल प्लाजा पर कोई रुकावट है, तो तुरंत इस नंबर पर सूचित करें।`
  },
  {
    key: 'epod_handover',
    label: 'e-POD & Receiver Delivery Slip',
    badge: 'Unloading',
    icon: '📦',
    getText: (truck, dispatcher) =>
      `नमस्ते ${truck.driver} जी, ${dispatcher} से:\n\nगाड़ी: *${truck.number}* (${truck.load})\nगंतव्य: *${truck.to}*\n\nमाल अनलोड होने के बाद कृपया पार्टी (Consignee) से बिल्टी / LR कॉपी और वे-ब्रिज (कांटा पर्ची) पर मुहर व हस्ताक्षर करवाकर तुरंत इस व्हाट्सएप पर स्पष्ट फोटो भेजें।`
  },
  {
    key: 'breakdown_alert',
    label: 'Breakdown & Roadside Emergency SOS',
    badge: 'Urgent Rescue',
    icon: '🚨',
    getText: (truck, dispatcher) =>
      `*जरूरी सहायता संदेश - TruckWala 24×7 कंट्रोल रूम*\n\nचालक: *${truck.driver}* जी\nगाड़ी: *${truck.number}*\n\nक्या आपकी गाड़ी में कोई तकनीकी खराबी (एयर प्रेशर, टायर, हीटिंग, या क्लच समस्या) आई है? यदि हाईवे पर आपातकालीन मैकेनिक वैन की जरूरत है तो तुरंत अपना लाइव लोकेशन भेजें या 9450002407 पर कॉल करें।`
  },
  {
    key: 'custom',
    label: 'Custom Dispatch Instructions',
    badge: 'Fleet Notes',
    icon: '✏️',
    getText: (truck, dispatcher) =>
      `नमस्ते ${truck.driver} जी (गाड़ी: ${truck.number}, रूट: ${truck.route}), ${dispatcher} की ओर से विशेष निर्देश:\n\n`
  }
];

export const DriverQuickConnectModal: React.FC<DriverQuickConnectModalProps> = ({
  isOpen,
  onClose,
  truck,
  onTrackAction
}) => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<TemplateKey>('status_eta');
  const [dispatcherName, setDispatcherName] = useState('TruckWala 24×7 Dispatch Control');
  const [messageText, setMessageText] = useState('');
  const [copied, setCopied] = useState(false);
  const [recentDispatches, setRecentDispatches] = useState<{ id: string; time: string; template: string }[]>([]);

  // Update text when template or truck changes
  useEffect(() => {
    if (truck) {
      const template = TEMPLATES.find((t) => t.key === selectedTemplateKey) || TEMPLATES[0];
      setMessageText(template.getText(truck, dispatcherName));
    }
  }, [truck, selectedTemplateKey, dispatcherName]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !truck) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleLaunchWhatsApp = () => {
    const cleanPhone = truck.driverCleanPhone || '919450002407';
    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    // Record action for audit/analytics
    if (onTrackAction) {
      onTrackAction('WHATSAPP_CLICK', `Driver Quick-Connect: ${truck.driver} (${truck.number})`, {
        driver: truck.driver,
        truckNumber: truck.number,
        phone: cleanPhone,
        template: selectedTemplateKey
      });
    }

    // Save recent dispatch record
    const record = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      template: TEMPLATES.find((t) => t.key === selectedTemplateKey)?.label || 'Custom'
    };
    setRecentDispatches((prev) => [record, ...prev.slice(0, 4)]);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const selectedTemplate = TEMPLATES.find((t) => t.key === selectedTemplateKey) || TEMPLATES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="driver-quick-connect-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#0F172A] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 grid place-items-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.46 3.491 1.334 5.006L2 22.5l5.632-1.309a10.007 10.007 0 004.4.996h.005c5.535 0 10.03-4.495 10.03-10.029 0-2.68-1.043-5.199-2.937-7.094A9.972 9.972 0 0012.031 2zm0 18.285h-.004a8.28 8.28 0 01-4.225-1.157l-.303-.18-3.14.729.832-3.061-.197-.314A8.285 8.285 0 013.743 12.03c0-4.57 3.719-8.288 8.291-8.288 2.215 0 4.296.862 5.86 2.428a8.236 8.236 0 012.427 5.861c0 4.571-3.719 8.288-8.29 8.288zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.167.249-.645.809-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.063-.125-.562-1.353-.77-1.852-.203-.487-.41-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312-.229.249-.874.853-.874 2.08 0 1.228.895 2.414 1.02 2.58.125.166 1.761 2.689 4.266 3.771.596.257 1.061.41 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.472-.602 1.68-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="driver-quick-connect-title" className="text-base sm:text-lg font-black tracking-tight font-display">
                  Driver Quick-Connect
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  WhatsApp Direct
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Panki Operations Control · Instant Pre-filled Driver Chat
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center transition-colors cursor-pointer"
            aria-label="Close Driver Quick-Connect"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Driver Summary Banner */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center text-white font-extrabold text-sm shadow-md"
                style={{ backgroundColor: truck.color }}
              >
                {truck.driver
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-slate-900 font-display">
                    {truck.driver}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified · {truck.driverRating}★</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-600 font-mono">
                  <span className="font-bold text-slate-900">{truck.number}</span>
                  <span>·</span>
                  <span className="text-slate-500">{truck.driverPhone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span
                className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                  truck.status === 'En Route'
                    ? 'bg-sky-100 text-sky-800 border border-sky-300'
                    : truck.status === 'Loading'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
              >
                ● {truck.status.toUpperCase()}
              </span>
              <a
                href={`tel:${truck.driverPhone.replace(/\s+/g, '')}`}
                className="h-8 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                title="Direct voice call"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Call Driver</span>
              </a>
            </div>
          </div>

          {/* Route & Cargo Pill Info */}
          <div className="mt-3 pt-3 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Route</span>
              <span className="font-bold text-slate-800 truncate block">{truck.route}</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Cargo</span>
              <span className="font-bold text-slate-800 truncate block">{truck.load}</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">ETA</span>
              <span className="font-bold text-emerald-700 block">{truck.eta} remaining</span>
            </div>
            <div className="bg-white/80 rounded-xl p-2 border border-slate-200/60">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Checkpoint</span>
              <span className="font-bold text-slate-800 truncate block">{truck.lastCheckpoint || 'NH-19 Toll'}</span>
            </div>
          </div>
        </div>

        {/* Template Selector & Live Message Builder */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[58vh] overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-display">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Select Pre-Filled Operational Template</span>
              </label>
              <span className="text-[11px] text-slate-500">1-Tap Fleet Prompt</span>
            </div>

            {/* Template Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {TEMPLATES.map((tmpl) => {
                const isSelected = tmpl.key === selectedTemplateKey;
                return (
                  <button
                    key={tmpl.key}
                    type="button"
                    onClick={() => setSelectedTemplateKey(tmpl.key)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-sm">{tmpl.icon}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tmpl.badge}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-snug line-clamp-2">{tmpl.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dispatcher Signature Input */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">
              Dispatcher Sign-off:
            </span>
            <input
              type="text"
              value={dispatcherName}
              onChange={(e) => setDispatcherName(e.target.value)}
              placeholder="e.g. TruckWala 24x7 Control Room"
              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:border-slate-400 focus:outline-none bg-slate-50"
            />
          </div>

          {/* Live Editable Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>Message Preview & Editor</span>
                <span className="text-[10px] font-normal text-slate-400">
                  (Editable before sending to {truck.driver})
                </span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const template = TEMPLATES.find((t) => t.key === selectedTemplateKey) || TEMPLATES[0];
                    setMessageText(template.getText(truck, dispatcherName));
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  title="Reset to default template"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={5}
                className="w-full text-xs font-sans p-3 rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none bg-slate-50/70 text-slate-900 leading-relaxed shadow-inner"
                placeholder="Type your WhatsApp message..."
              />
              <div className="absolute right-3 bottom-3 text-[10px] text-slate-400">
                {messageText.length} characters
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600">✓</span>
              <span>
                Formatted with bold highlights for key vehicle details. Automatically opens WhatsApp Web on desktop or the WhatsApp App on mobile.
              </span>
            </p>
          </div>

          {/* Recent Dispatches Tracker if any */}
          {recentDispatches.length > 0 && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Session Dispatch Activity
              </span>
              <div className="flex flex-wrap gap-2">
                {recentDispatches.map((r) => (
                  <span
                    key={r.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>
                      {r.template} · {r.time}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono font-bold text-slate-800">{truck.driverPhone}</span>
            <span className="text-slate-400">({truck.driverLanguage || 'Hindi'})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.768.46 3.491 1.334 5.006L2 22.5l5.632-1.309a10.007 10.007 0 004.4.996h.005c5.535 0 10.03-4.495 10.03-10.029 0-2.68-1.043-5.199-2.937-7.094A9.972 9.972 0 0012.031 2zm0 18.285h-.004a8.28 8.28 0 01-4.225-1.157l-.303-.18-3.14.729.832-3.061-.197-.314A8.285 8.285 0 013.743 12.03c0-4.57 3.719-8.288 8.291-8.288 2.215 0 4.296.862 5.86 2.428a8.236 8.236 0 012.427 5.861c0 4.571-3.719 8.288-8.29 8.288zm4.542-6.195c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.167.249-.645.809-.79 1-.146.187-.291.208-.541.083-.249-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.729-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.063-.125-.562-1.353-.77-1.852-.203-.487-.41-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312-.229.249-.874.853-.874 2.08 0 1.228.895 2.414 1.02 2.58.125.166 1.761 2.689 4.266 3.771.596.257 1.061.41 1.424.526.598.19 1.143.163 1.573.099.48-.072 1.472-.602 1.68-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.479-.291z" />
              </svg>
              <span>Initiate WhatsApp Conversation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

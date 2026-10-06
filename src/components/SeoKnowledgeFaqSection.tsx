import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Truck,
  Wrench,
  Zap,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Clock,
  Compass
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';
import { TrackingEventType } from '../types';

interface SeoKnowledgeFaqSectionProps {
  onOpenSOS: () => void;
  onTrackAction: (type: TrackingEventType, label: string, metadata?: Record<string, unknown>) => void;
}

interface FaqItem {
  id: string;
  category: 'breakdown' | 'towing' | 'brands' | 'location';
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  highlightTag: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'breakdown',
    questionEn: 'How do I call a roadside truck mechanic or breakdown service near me on NH-27 / NH-19?',
    questionHi: 'हाईवे पर ट्रक खराब (ब्रेकडाउन) होने पर तुरंत मैकेनिक या सर्विस वैन कैसे बुलाएं?',
    answerEn:
      'Call TruckWala 24×7 hotline at +91 94500 02407 or send your live WhatsApp location. Our fully equipped mobile breakdown van with diesel mechanics, 24V jump-start rig, computerized ECM scanner, and high-pressure pneumatic air pipe repair tools reaches your truck within 15–30 minutes anywhere on the Kanpur–Unnao NH-27 corridor.',
    answerHi:
      'तुरंत TruckWala 24×7 हेल्पलाइन +91 94500 02407 पर कॉल करें या व्हाट्सएप पर लाइव लोकेशन भेजें। हमारी 24×7 मोबाइल मैकेनिक वैन 15 से 30 मिनट के भीतर आपके ट्रक के पास पहुंचती है, जिसमें कम्प्यूटराइज्ड ईसीएम स्कैनर, एयर पाइप किट, 24V जंप-स्टार्ट और ओरिजिनल स्पेयर पार्ट्स मौजूद होते हैं।',
    highlightTag: '15-30 Min SLA · 24×7 Active'
  },
  {
    id: 'faq-2',
    category: 'towing',
    questionEn: 'Do you provide tow truck and recovery van service for heavy multi-axle trailer trucks (टेलर ट्रक)?',
    questionHi: 'क्या आपके पास भारी टेलर ट्रक और कंटेनर के लिए टो ट्रक (Tow Truck) और क्रेन रिकवरी वैन उपलब्ध है?',
    answerEn:
      'Yes. TruckWala 24×7 operates 24/7 hydraulic heavy-duty tow trucks (रिकवरी वैन / टोइंग क्रेन) capable of pulling 22-ton to 55-ton multi-axle trailer trucks, flatbeds, tippers, and 40ft containers stranded due to differential failure, axle lock, or accidental steering damage across Uttar Pradesh.',
    answerHi:
      'जी हाँ! TruckWala 24×7 के पास 22 से 55 टन तक के भारी टेलर ट्रक (Trailer Trucks), कंटेनर और 12/14/16/18 चक्का गाड़ियों के लिए हैवी हाइड्रोलिक टो ट्रक (Tow Truck) और रिकवरी क्रेन 24 घंटे उपलब्ध हैं। एक्सल टूटने या गियरबॉक्स लॉक होने पर तुरंत सेफ टोइंग की जाती है।',
    highlightTag: 'Heavy Hydraulic Towing · Multi-Axle'
  },
  {
    id: 'faq-3',
    category: 'brands',
    questionEn: 'Can you troubleshoot Mahindra Furio, Blazo, Cruzio, Jayo, and Loadking Optimo BS6 errors on-site?',
    questionHi: 'क्या आप महिंद्रा फुरियो, ब्लाज़ो, क्रूज़ियो, जायो और लोडकिंग ऑप्टिमो (BS6) के एरर ठीक करते हैं?',
    answerEn:
      'Yes. Our highway mobile diagnostic vans carry dedicated software scanners for Mahindra mPower FuelSmart & mDiTech diesel engines. We clear BS6 AdBlue (DEF) derate speed limiters, resolve DPF soot clogging, service common rail injectors, and solve sensor faults on Furio, Blazo X, Cruzio, Jayo, and Loadking Optimo trucks right on the highway.',
    answerHi:
      'हाँ, हमारे पास महिंद्रा कमर्शियल गाड़ियों (Mahindra Furio 7/11/14/16/17, Blazo X 28-55, Cruzio, Jayo, Loadking Optimo) के लिए लेटेस्ट डायग्नोस्टिक स्कैनर मौजूद हैं। BS-VI AdBlue (यूरिया) स्पीड लॉकर, DPF चोक और टॉर्क लिमिटर को हाईवे पर ही रीसेट और ठीक किया जाता है।',
    highlightTag: 'Mahindra BS6 Scanner · On-Highway'
  },
  {
    id: 'faq-4',
    category: 'brands',
    questionEn: 'Do you service Volvo Eicher, Tata Signa/Prima, Ashok Leyland AVTR, and BharatBenz trucks?',
    questionHi: 'क्या आप वोल्वो आईशर (Volvo Eicher), टाटा सिग्ना, लेलैंड और भारतबेंज ट्रकों की मरम्मत करते हैं?',
    answerEn:
      'Yes. We carry full diagnostic coverage for Volvo Eicher (VEDX5 & VEDX8), Tata Motors Commercial (Signa, Prima, Cummins ISBe), Ashok Leyland AVTR (i-Gen6, H-Series), and BharatBenz (OM 926 / OM 906). From air brake leaks to clutch plate burnouts and alternator short-circuits, our technicians carry OEM-spec replacements.',
    answerHi:
      'बिल्कुल! हम वोल्वो आईशर (Volvo Eicher Pro), टाटा मोटर्स (Tata Signa, Prima, LPT), अशोक लेलैंड (AVTR, Ecomet, Dost), और भारतबेंज की सभी कमर्शियल गाड़ियों का फुल मैकेनिकल व इलेक्ट्रॉनिक काम 24×7 करते हैं। क्लच, गियर, एयर ब्रेक, और वायरिंग का काम तुरंत किया जाता है।',
    highlightTag: 'Multi-Brand Coverage · OEM Spares'
  },
  {
    id: 'faq-5',
    category: 'location',
    questionEn: 'Where are TruckWala 24×7 physical workshops and highway emergency hubs located?',
    questionHi: 'TruckWala 24×7 की मुख्य वर्कशॉप और हाईवे इमरजेंसी हब कहाँ स्थित हैं?',
    answerEn:
      'Our primary roadside yard and mechanical workshop is located directly at Gadan Khera Bypass, NH-27, Unnao, UP 209801, with our fleet logistics operations center at Panki Industrial Area, Kanpur. Both facilities operate 24 hours every day with paved parking, hydraulic cranes, ECM scanners, and dispatch vehicles.',
    answerHi:
      'हमारी मुख्य हाईवे वर्कशॉप गदन खेड़ा बाईपास (Gadan Khera Bypass, NH-27), उन्नाव (UP 209801) पर स्थित है, तथा दूसरा लॉजिस्टिक्स हब पनकी इंडस्ट्रियल एरिया, कानपुर में है। दोनों केंद्र 24 घंटे खुले रहते हैं और तुरंत मोबाइल मैकेनिक रवाना करते हैं।',
    highlightTag: 'NH-27 Gadan Khera · Panki Kanpur'
  }
];

export const SeoKnowledgeFaqSection: React.FC<SeoKnowledgeFaqSectionProps> = ({
  onOpenSOS,
  onTrackAction
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [language, setLanguage] = useState<'bilingual' | 'hi' | 'en'>('bilingual');

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQ_DATA
      : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="seo-knowledge-faq"
      className="py-16 sm:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>AEO · GEO · HIGHWAY ASSISTANCE KNOWLEDGE HUB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
              ट्रकवाला 24×7 · Highway Help & FAQs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Commercial truck breakdown assistance, heavy tow trucks (रिकवरी वैन), ECM scanning, and Mahindra Furio/Blazo, Volvo Eicher, Tata & Leyland roadside support across Kanpur–Unnao NH-27.
            </p>
          </div>

          {/* Language Switcher & Instant Call */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage('bilingual')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  language === 'bilingual' ? 'bg-[#1E88E5] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी + English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  language === 'hi' ? 'bg-[#1E88E5] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-[#1E88E5] text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <a
              href={`tel:${BUSINESS_CONFIG.phoneCall}`}
              onClick={() => onTrackAction('CALL_CLICK', 'FAQ Section Top Call Button')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 94500 02407</span>
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: 'All Queries (सभी प्रश्न)' },
            { id: 'breakdown', label: '🚨 Highway Breakdown (ब्रेकडाउन)' },
            { id: 'towing', label: '🏗️ Tow Truck & Recovery (टो ट्रक व क्रेन)' },
            { id: 'brands', label: '🚛 Mahindra, Eicher & Tata (गाड़ी मॉडल्स)' },
            { id: 'location', label: '📍 Location & Hub (वर्कशॉप पता)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategory === tab.id
                  ? 'bg-white text-slate-900 border-white shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-800/60 border border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-600"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    <div className="inline-block px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                      {faq.highlightTag}
                    </div>
                    {(language === 'bilingual' || language === 'en') && (
                      <h3 className="text-base sm:text-lg font-bold text-white font-display">
                        {faq.questionEn}
                      </h3>
                    )}
                    {(language === 'bilingual' || language === 'hi') && (
                      <div className="text-sm sm:text-base font-semibold text-emerald-400">
                        {faq.questionHi}
                      </div>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 grid place-items-center text-slate-300 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-700/60 bg-slate-800/40 space-y-4 animate-in fade-in duration-200">
                    {(language === 'bilingual' || language === 'en') && (
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {faq.answerEn}
                      </p>
                    )}
                    {(language === 'bilingual' || language === 'hi') && (
                      <p className="text-sm text-slate-300 leading-relaxed bg-black/20 p-3.5 rounded-xl border border-slate-700/60">
                        {faq.answerHi}
                      </p>
                    )}

                    {/* Action buttons inside FAQ */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={onOpenSOS}
                        className="px-4 py-2 rounded-xl bg-[#D32F2F] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Dispatch Mobile Van Now</span>
                      </button>

                      <a
                        href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          `Hello TruckWala 24x7, I need emergency assistance for: ${faq.questionEn}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Ask on WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Hotline: +91 94500 02407</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Hyperlink Silo Cards (Search Engine Deep Crawling & Page Navigation) */}
        <div className="mt-12 pt-10 border-t border-slate-800">
          <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
            Search Topics & Specialized Portals (महत्वपूर्ण लिंक्स):
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <a
              href="/vanilla/index.html"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-white block mb-1">⚡ Fast Highway Mode</span>
              <span className="text-[11px] text-slate-400">Zero-lag lightweight vanilla portal for 2G/3G drivers</span>
            </a>

            <a
              href="/#driver-quick-connect"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-emerald-400 block mb-1">💬 Driver Quick-Connect</span>
              <span className="text-[11px] text-slate-400">1-Tap WhatsApp console for active highway trips</span>
            </a>

            <a
              href="/#diagnostics"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-blue-400 block mb-1">💻 ECM Diagnostics</span>
              <span className="text-[11px] text-slate-400">BS6 AdBlue, DPF derate, and sensor troubleshooting</span>
            </a>

            <a
              href="/#booking-calculator"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-amber-400 block mb-1">🚛 Freight Calculator</span>
              <span className="text-[11px] text-slate-400">Direct Kanpur–Delhi–Lucknow corridor tariffs</span>
            </a>

            <a
              href="/#location"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-white block mb-1">📍 Gadan Khera Yard</span>
              <span className="text-[11px] text-slate-400">Unnao NH-27 physical workshop & Google Maps</span>
            </a>

            <a
              href="https://maps.app.goo.gl/P7uBDaVwf3XMfVYdA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 transition-colors flex flex-col justify-between"
            >
              <span className="font-bold text-red-400 block mb-1 flex items-center gap-1">
                <span>Google Maps GPS</span>
                <ExternalLink className="w-3 h-3" />
              </span>
              <span className="text-[11px] text-slate-400">Direct navigation coordinates to workshop yard</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

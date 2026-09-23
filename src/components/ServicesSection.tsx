import React from 'react';
import { Truck, Wrench, Cpu, Package, Building2, Shield, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/content';

interface ServicesSectionProps {
  onOpenSOS: () => void;
  onSelectService: (serviceName: string) => void;
  onTrackAction: (type: 'CALL_CLICK', label: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenSOS,
  onSelectService,
  onTrackAction,
}) => {
  const services = [
    {
      id: 'breakdown',
      title: '24×7 Breakdown Assistance',
      tagline: 'Highway Roadside Emergency Response',
      desc: 'Mobile unit dispatched on the Kanpur–Unnao NH-27 corridor with air compressor, heavy hydraulic jacks, jumper packs, and highway emergency tools.',
      icon: Truck,
      highlight: 'Avg. Arrival: 25–45 min',
      color: 'border-l-4 border-l-[#D32F2F]',
      badgeColor: 'text-[#D32F2F]',
    },
    {
      id: 'heavy-repair',
      title: 'Commercial Vehicle Repair',
      tagline: 'Heavy Mechanical & Workshop Overhaul',
      desc: 'Comprehensive mechanical repair for multi-axle trucks, tippers, haulage & prime movers. Engine tuning, clutch plate replacement, gear box, differential & heavy suspension.',
      icon: Wrench,
      highlight: 'Workshop at Gadan Khera',
      color: 'border-l-4 border-l-[#1E88E5]',
      badgeColor: 'text-[#1E88E5]',
    },
    {
      id: 'diagnostics',
      title: 'Computer & ECM Diagnostics',
      tagline: 'BS-III, BS-IV & BS-VI Electronic Systems',
      desc: 'Advanced handheld diagnostic scanners for Cummins, Tata Turbotronn, Ashok Leyland CRS & BharatBenz. Fault code reading, AdBlue/SCR parameter test & sensor calibration.',
      icon: Cpu,
      highlight: 'Live ECM Scan & Derate Clearing',
      color: 'border-l-4 border-l-[#1E88E5]',
      badgeColor: 'text-[#1E88E5]',
    },
    {
      id: 'spare-parts',
      title: 'Commercial Spare Parts',
      tagline: 'Genuine Filters, Valves & Hardware',
      desc: 'Immediate spare parts support. Heavy air brake chambers, relay valves, serpentine belts, coolant hoses, oil & fuel filters, wheel bearings and electrical switches in stock.',
      icon: Package,
      highlight: 'Genuine Quality Certified',
      color: 'border-l-4 border-l-[#43A047]',
      badgeColor: 'text-[#43A047]',
    },
    {
      id: 'fleet-support',
      title: 'Fleet Operator Support',
      tagline: 'Dedicated Fleet Maintenance Agreements',
      desc: 'Priority roadside breakdown dispatch and scheduled maintenance for transport operators, container fleets, and logistics companies moving along the NH-27 corridor.',
      icon: Building2,
      highlight: 'Corporate Billing & Priority',
      color: 'border-l-4 border-l-amber-500',
      badgeColor: 'text-amber-400',
    },
    {
      id: 'mobile-van',
      title: 'TruckWala Mobile Response Unit',
      tagline: 'Workshop on Wheels',
      desc: 'Purpose-built service van carrying diesel generator, high-output pneumatic air hose reel, heavy welding equipment, torch, and rapid breakdown mechanics.',
      icon: Shield,
      highlight: '24×7 Highway Standby',
      color: 'border-l-4 border-l-[#D32F2F]',
      badgeColor: 'text-[#D32F2F]',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#080c13] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1E88E5] mb-2">
            03 · Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Commercial Vehicle Service & Breakdown
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real workshop facility at Gadan Khera Bypass + fully mobile highway response van. From quick pneumatic brake repairs to complete diesel engine overhaul.
          </p>
        </div>

        {/* Visual Showcase: Real Workshop & Service Van */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="relative rounded-sm overflow-hidden border border-slate-800 group">
            <img
              src="/src/assets/images/workshop_heavy_repair_1790186289825.jpg"
              alt="TruckWala heavy commercial vehicle workshop bay in Unnao"
              className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c13] via-[#080c13]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E88E5] bg-black/60 px-2 py-1 rounded-xs">
                Workshop Bay · Gadan Khera Bypass
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mt-1">
                Heavy Mechanical Repair & Overhaul
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Heavy vehicle inspection pit, hydraulic hoists, pneumatic torque tools and transmission benches.
              </p>
            </div>
          </div>

          <div className="relative rounded-sm overflow-hidden border border-slate-800 group">
            <img
              src="/src/assets/images/mobile_service_van_1790186318807.jpg"
              alt="TruckWala 24x7 mobile roadside response van on highway corridor"
              className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c13] via-[#080c13]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D32F2F] bg-black/60 px-2 py-1 rounded-xs">
                Mobile Response Unit · 24×7 Standby
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white mt-1">
                Rapid Highway Breakdown Response
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Equipped with mobile air compressor, generator, diagnostic computer and emergency spare parts.
              </p>
            </div>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className={`bg-[#0e1420] border border-slate-800 rounded-sm p-6 flex flex-col justify-between hover:border-slate-700 transition-all ${srv.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${srv.badgeColor}`}>
                      {srv.highlight}
                    </span>
                    <Icon className={`w-5 h-5 ${srv.badgeColor}`} />
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                    {srv.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-medium mb-3">
                    {srv.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (srv.id === 'breakdown' || srv.id === 'mobile-van') {
                        onOpenSOS();
                      } else {
                        onSelectService(srv.title);
                      }
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer group"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1E88E5] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneCall}`}
                    onClick={() => onTrackAction('CALL_CLICK', `Service Card Call ${srv.title}`)}
                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    Call
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

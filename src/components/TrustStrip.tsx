import React from 'react';
import { Truck, Clock, Cpu, PackageCheck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      title: '24×7 Highway Support',
      desc: 'Round-the-clock emergency dispatch on Kanpur–Unnao NH-27',
      accent: 'text-[#43A047]',
    },
    {
      icon: Truck,
      title: 'Roadside Mobile Unit',
      desc: 'Fully equipped service van with pneumatic tools & generator',
      accent: 'text-[#1E88E5]',
    },
    {
      icon: Cpu,
      title: 'Computer Diagnostics',
      desc: 'BS-IV & BS-VI ECM scanner, fault code clearing & sensors',
      accent: 'text-[#1E88E5]',
    },
    {
      icon: PackageCheck,
      title: 'Spare Parts Support',
      desc: 'Genuine commercial vehicle filters, belts, valves & bearings',
      accent: 'text-[#D32F2F]',
    },
  ];

  return (
    <section className="bg-[#0e1420] border-b border-slate-800 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`flex items-start gap-4 pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''}`}
              >
                <div className={`p-2.5 rounded-sm bg-slate-900 border border-slate-800 ${pillar.accent} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

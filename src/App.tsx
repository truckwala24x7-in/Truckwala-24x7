import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { BreakdownExperience } from './components/BreakdownExperience';
import { ServicesSection } from './components/ServicesSection';
import { DiagnosticsGuide } from './components/DiagnosticsGuide';
import { VehicleCoverage } from './components/VehicleCoverage';
import { LocationMap } from './components/LocationMap';
import { ReviewsSection } from './components/ReviewsSection';
import { FleetAndServiceForm } from './components/FleetAndServiceForm';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { EmergencyBreakdownModal } from './components/EmergencyBreakdownModal';
import { OperationsDemoTracker } from './components/OperationsDemoTracker';
import { TrackingEvent, TrackingEventType } from './types';

export default function App() {
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('Breakdown Assistance');
  const [events, setEvents] = useState<TrackingEvent[]>([
    {
      id: 'init-1',
      type: 'LOCATION_SHARED',
      label: 'Hub Registered: Gadan Khera Bypass, Unnao',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const handleTrackAction = (
    type: TrackingEventType,
    label: string,
    metadata?: Record<string, unknown>
  ) => {
    const newEvent: TrackingEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      label,
      timestamp: new Date().toLocaleTimeString(),
      metadata,
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForForm(serviceName);
    const formElement = document.getElementById('fleet');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearEvents = () => {
    setEvents([]);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-[#1E88E5] selection:text-white">
      {/* Top Bar complying with Top Bar Contract */}
      <TopBar
        onOpenSOS={() => setIsSOSOpen(true)}
        onTrackAction={handleTrackAction}
      />

      <main className="flex-1">
        {/* 02 - Hero Section: Bold, fast, operational, high contrast */}
        <Hero
          onOpenSOS={() => setIsSOSOpen(true)}
          onTrackAction={handleTrackAction}
        />

        {/* 07 - Trust Strip */}
        <TrustStrip />

        {/* 01 & 05 - The Job & Breakdown Experience */}
        <BreakdownExperience
          onOpenSOS={() => setIsSOSOpen(true)}
          onTrackAction={handleTrackAction}
        />

        {/* 03 - Core Services */}
        <ServicesSection
          onOpenSOS={() => setIsSOSOpen(true)}
          onSelectService={handleSelectService}
          onTrackAction={handleTrackAction}
        />

        {/* Diagnostics & Fault Guidance */}
        <DiagnosticsGuide
          onOpenSOS={() => setIsSOSOpen(true)}
          onTrackAction={handleTrackAction}
        />

        {/* Vehicle Coverage */}
        <VehicleCoverage onTrackAction={handleTrackAction} />

        {/* 07 - Location Hub at Gadan Khera Bypass, Unnao */}
        <LocationMap onTrackAction={handleTrackAction} />

        {/* 06 - Customer & Fleet Reviews */}
        <ReviewsSection onTrackAction={handleTrackAction} />

        {/* Request Service / Fleet Inquiry Form */}
        <FleetAndServiceForm
          initialService={selectedServiceForForm}
          onTrackAction={handleTrackAction}
        />
      </main>

      {/* 44 - Footer */}
      <Footer
        onOpenSOS={() => setIsSOSOpen(true)}
        onTrackAction={handleTrackAction}
      />

      {/* 08 - Mobile Sticky Bar (Emergency Actions) */}
      <MobileStickyBar onTrackAction={handleTrackAction} />

      {/* Emergency Breakdown SOS Modal */}
      <EmergencyBreakdownModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        onTrackAction={handleTrackAction}
      />

      {/* Tech Under the Hood: Telemetry & Event Stream */}
      <OperationsDemoTracker
        events={events}
        onClear={handleClearEvents}
      />
    </div>
  );
}

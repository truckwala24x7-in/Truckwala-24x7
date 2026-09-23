import React, { useState } from 'react';
import { Activity, X, Trash2, CheckCircle2, Code2, ExternalLink, BookOpen } from 'lucide-react';
import { TrackingEvent } from '../types';

interface OperationsDemoTrackerProps {
  events: TrackingEvent[];
  onClear: () => void;
}

export const OperationsDemoTracker: React.FC<OperationsDemoTrackerProps> = ({
  events,
  onClear,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'telemetry' | 'lab'>('telemetry');

  return (
    <>
      {/* Discreet Trigger in Desktop / Mobile Corner */}
      <div className="fixed bottom-16 sm:bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href="/vanilla/index.html"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Vanilla HTML/CSS/JS Starter"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0b0f17]/90 hover:bg-slate-900 border border-slate-700/80 rounded-sm text-xs font-mono text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-colors"
        >
          <Code2 className="w-3.5 h-3.5 text-[#1E88E5]" />
          <span>Vanilla Lab</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0b0f17]/90 hover:bg-slate-900 border border-slate-700/80 rounded-sm text-xs font-mono text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-colors cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#43A047] animate-pulse" />
          <span>Ops Telemetry</span>
          <span className="text-slate-500 font-mono text-[11px]">({events.length})</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-14 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] bg-[#0e1420] border border-slate-700 rounded-sm shadow-2xl p-4 text-xs font-mono text-slate-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab('telemetry')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold uppercase cursor-pointer ${
                  tab === 'telemetry'
                    ? 'bg-[#1E88E5] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Events</span>
              </button>
              <button
                onClick={() => setTab('lab')}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold uppercase cursor-pointer ${
                  tab === 'lab'
                    ? 'bg-[#1E88E5] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Lab Path</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {tab === 'telemetry' && (
                <button
                  onClick={onClear}
                  title="Clear event log"
                  className="text-slate-500 hover:text-slate-300 cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {tab === 'telemetry' ? (
            <>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {events.length === 0 ? (
                  <div className="text-slate-500 text-center py-4 text-[11px]">
                    No events recorded yet. Click "Call 24×7", "WhatsApp", "SOS", or "Share GPS Location" to verify live event tracking.
                  </div>
                ) : (
                  events.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-2 bg-slate-900/90 border border-slate-800 rounded text-[11px]"
                    >
                      <div className="flex items-center justify-between text-slate-400">
                        <span className="font-bold text-[#1E88E5]">{evt.type}</span>
                        <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                      </div>
                      <div className="text-slate-200 mt-0.5">{evt.label}</div>
                      {evt.metadata && Object.keys(evt.metadata).length > 0 && (
                        <div className="mt-1 text-[10px] text-slate-400 font-mono bg-black/40 p-1 rounded overflow-x-auto">
                          {JSON.stringify(evt.metadata)}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 mt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#43A047]" />
                  <span>Telemetry Pipeline Active</span>
                </span>
                <span>Total: {events.length} logs</span>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-[11px] leading-relaxed">
              <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded">
                <div className="font-bold text-[#1E88E5] flex items-center justify-between">
                  <span>Phase 1-3: Vanilla Core</span>
                  <a
                    href="/vanilla/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#43A047] hover:underline flex items-center gap-1 font-sans"
                  >
                    <span>View /vanilla</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-slate-400 text-[10px] mt-1">
                  HTML5 semantic layout, pure CSS Grid truck badge & document-level click listener with dataLayer push.
                </div>
              </div>

              <div className="p-2.5 bg-slate-900/90 border border-[#1E88E5]/50 rounded">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>Phase 4-6: Production React + TS</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Active App</span>
                </div>
                <div className="text-slate-400 text-[10px] mt-1">
                  React 19 + TypeScript + Tailwind v4 + Geolocation API + SPN Diagnostic Engine + Highway SOS Modal.
                </div>
              </div>

              <div className="p-2 bg-black/30 rounded text-slate-400 text-[10px]">
                <strong>Learning Loop:</strong> Learn concept → implement on TruckWala → test mobile response → measure conversions.
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

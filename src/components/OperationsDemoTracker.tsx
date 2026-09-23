import React, { useState } from 'react';
import { Activity, X, Trash2, CheckCircle2 } from 'lucide-react';
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

  return (
    <>
      {/* Discreet Trigger in Desktop / Mobile Corner */}
      <div className="fixed bottom-16 sm:bottom-4 right-4 z-30 flex items-center gap-2">
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
              <span className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold uppercase bg-[#1E88E5] text-white">
                <Activity className="w-3.5 h-3.5" />
                <span>Events</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClear}
                title="Clear event log"
                className="text-slate-500 hover:text-slate-300 cursor-pointer p-0.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

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
        </div>
      )}
    </>
  );
};

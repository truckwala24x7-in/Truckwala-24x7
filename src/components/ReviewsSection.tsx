import React from 'react';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { REVIEWS, BUSINESS_CONFIG } from '../data/content';

interface ReviewsSectionProps {
  onTrackAction: (type: 'MAP_CLICK', label: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onTrackAction }) => {
  const handleReviewsClick = () => {
    onTrackAction('MAP_CLICK', 'Reviews Section Open Google Reviews');
    window.open(BUSINESS_CONFIG.googleReviewsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-[#080c13] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#43A047] mb-2">
              06 · Verified Highway Service Experience
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              What Commercial Drivers & Fleets Say
            </h2>
          </div>

          <button
            onClick={handleReviewsClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#1E88E5]" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0e1420] border border-slate-800 rounded-sm p-6 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-mono">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-6">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-sm font-bold text-white uppercase tracking-tight">
                  {rev.author}
                </div>
                <div className="text-xs text-[#1E88E5] font-medium">
                  {rev.role}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  Vehicle: {rev.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real Review Callout */}
        <div className="mt-8 p-4 bg-slate-900/60 border border-slate-800 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#43A047] shrink-0" />
            <div className="text-xs sm:text-sm text-slate-300">
              Have you had emergency breakdown service with TruckWala 24×7 at Unnao? Share your authentic feedback on our verified Google Business Profile.
            </div>
          </div>
          <button
            onClick={handleReviewsClick}
            className="text-xs font-bold text-[#1E88E5] hover:text-blue-400 uppercase tracking-wider shrink-0 cursor-pointer"
          >
            Leave Google Review →
          </button>
        </div>
      </div>
    </section>
  );
};

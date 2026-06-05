"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { siteInfo } from "../constants/siteInfo";

const POPUP_DURATION = 5; // seconds

function CarnivalBanner() {
  const [popupOpen, setPopupOpen] = useState(true);
  const [countdown, setCountdown] = useState(POPUP_DURATION);

  useEffect(() => {
    if (!popupOpen) return;

    if (countdown <= 0) {
      setPopupOpen(false);
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [popupOpen, countdown]);

  // SVG ring progress (circle circumference = 2π×14 ≈ 87.96)
  const circumference = 2 * Math.PI * 14;
  const progress = ((POPUP_DURATION - countdown) / POPUP_DURATION) * circumference;

  return (
    <>
      {/* ── Popup Modal ── */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[24px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Poster image */}
            <div className="relative w-full bg-black flex items-center justify-center">
              <Image
                src="/Carnival.jpeg"
                alt="Carnival at The Waves Water Park – 13 June 2026"
                width={1200}
                height={1200}
                priority
                className="w-full h-auto object-contain max-h-[90vh]"
              />

              {/* Dark gradient at top for close button visibility */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />

              {/* Close button with countdown ring */}
              <button
                onClick={() => setPopupOpen(false)}
                aria-label="Close popup"
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
                  {/* Background ring */}
                  <circle
                    cx="18" cy="18" r="14"
                    fill="rgba(0,0,0,0.55)"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2.5"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="18" cy="18" r="14"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                  {/* X icon — drawn in normal orientation via nested group */}
                  <g transform="rotate(90, 18, 18)">
                    <line x1="12" y1="12" x2="24" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <line x1="24" y1="12" x2="12" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </button>

              {/* Bottom info overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-5">
              
                <a
                  href="/book-tickets"
                  className="inline-flex items-center gap-2 bg-[#FF1493] text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform"
                  onClick={() => setPopupOpen(false)}
                >
                  🎪 Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarnivalBanner;

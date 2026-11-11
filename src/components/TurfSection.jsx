"use client";

import Link from "next/link";
import TurfArcadeGame from "./TurfArcadeGame";
import { siteInfo } from "../constants/siteInfo";

export default function TurfSection() {
  const pricePerHour = siteInfo.turf?.pricePerHour || 499;

  return (
    <section
      id="turf"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0C021E_0%,#1B063D_50%,#0C021E_100%)] py-14 md:py-20 px-4 md:px-8 lg:px-12 text-white"
    >
      {/* Background ambient glow matching game theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C5FA19]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00D4D4]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl">
        {/* Gaming Arcade Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5FA19]/40 bg-[#C5FA19]/10 px-4 py-1.5 text-xs md:text-sm font-extrabold uppercase tracking-widest text-[#C5FA19] backdrop-blur mb-4 shadow-[0_0_25px_rgba(197,250,25,0.25)]">
            <span>🎮</span> Video Game Arena &middot; Box Cricket Turf
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
            Play Under The Lights at <span className="text-[#C5FA19]">₹{pricePerHour}</span> / Hour
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-gray-300">
            Step onto the floodlit AstroTurf stadium. Choose your team, pick your time slot, and play day or night!
          </p>
        </div>

        {/* Custom Coded Video Game Console Stadium Component */}
        <TurfArcadeGame />

        {/* Action Button & Call-out */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/book-turf"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C5FA19] px-9 py-4 text-base md:text-lg font-black text-[#0C021E] shadow-[0_10px_35px_rgba(197,250,25,0.4)] transition-all hover:scale-105 hover:bg-[#d6ff47] active:scale-95 w-full sm:w-auto"
          >
            <span>🏏</span> Book Turf Slot Online (₹{pricePerHour}/hr) →
          </Link>

          <a
            href={`tel:${siteInfo.supportPhone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm md:text-base font-bold text-white backdrop-blur transition hover:bg-white/20 w-full sm:w-auto"
          >
            <span>📞</span> Tournament Hotline: {siteInfo.supportPhoneDisplay}
          </a>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur hover:border-[#C5FA19]/40 transition">
            <span className="text-2xl md:text-3xl">💡</span>
            <h4 className="mt-2 text-sm md:text-base font-bold text-white">Day & Night Stadium</h4>
            <p className="mt-1 text-xs text-gray-400">High-power LED floodlights for clear night matches.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur hover:border-[#C5FA19]/40 transition">
            <span className="text-2xl md:text-3xl">🏏</span>
            <h4 className="mt-2 text-sm md:text-base font-bold text-white">Full Gear Included</h4>
            <p className="mt-1 text-xs text-gray-400">Bats, tennis balls, and stumps provided free at turf.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur hover:border-[#C5FA19]/40 transition">
            <span className="text-2xl md:text-3xl">🕒</span>
            <h4 className="mt-2 text-sm md:text-base font-bold text-white">9:00 AM – 11:00 PM</h4>
            <p className="mt-1 text-xs text-gray-400">1 to 4 hour match slots open 7 days a week.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur hover:border-[#C5FA19]/40 transition">
            <span className="text-2xl md:text-3xl">⚡</span>
            <h4 className="mt-2 text-sm md:text-base font-bold text-white">Instant QR Pass</h4>
            <p className="mt-1 text-xs text-gray-400">Secure Cashfree payment with digital pass verification.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

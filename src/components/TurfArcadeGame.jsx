"use client";

import Link from "next/link";
import { siteInfo } from "../constants/siteInfo";

export default function TurfArcadeGame() {
  const pricePerHour = siteInfo.turf?.pricePerHour || 499;

  return (
    <div className="relative mx-auto w-full select-none overflow-hidden rounded-[26px] md:rounded-[36px] border-2 md:border-3 border-[#C5FA19]/50 bg-[#070214] shadow-[0_0_60px_rgba(197,250,25,0.25)] transition-all duration-300 hover:border-[#C5FA19]/80 hover:shadow-[0_0_90px_rgba(197,250,25,0.35)]">
      {/* ─── CRT Scanline & Screen Glare Overlay ─── */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* ─── SVG STADIUM BACKGROUND & PERSPECTIVE GROUND ─── */}
      <svg
        className="absolute inset-0 h-full w-full object-cover"
        viewBox="0 0 1024 480"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep night sky */}
          <linearGradient id="stadiumSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050110" />
            <stop offset="40%" stopColor="#0F0524" />
            <stop offset="70%" stopColor="#1B0A3A" />
            <stop offset="100%" stopColor="#25104E" />
          </linearGradient>

          {/* Left Floodlight Beam */}
          <linearGradient id="leftBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#C5FA19" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#00D4D4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#160830" stopOpacity="0" />
          </linearGradient>

          {/* Right Floodlight Beam */}
          <linearGradient id="rightBeam" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#C5FA19" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#00D4D4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#160830" stopOpacity="0" />
          </linearGradient>

          {/* Turf Outfield Gradient */}
          <linearGradient id="turfBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#124A1E" />
            <stop offset="40%" stopColor="#1B632B" />
            <stop offset="75%" stopColor="#228238" />
            <stop offset="100%" stopColor="#2BA347" />
          </linearGradient>

          {/* Pitch Strip Gradient */}
          <linearGradient id="pitchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B39B78" />
            <stop offset="50%" stopColor="#CFB895" />
            <stop offset="100%" stopColor="#E2CFAE" />
          </linearGradient>

          {/* Chainlink fence pattern */}
          <pattern id="fenceMesh" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 L7 0 L14 7 L7 14 Z" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.18" />
          </pattern>

          {/* Neon Glow Filters */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="superGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Background Sky ── */}
        <rect width="1024" height="480" fill="url(#stadiumSky)" />

        {/* Twinkling Stadium Stars */}
        <g fill="#FFFFFF" opacity="0.75">
          <circle cx="120" cy="50" r="1.2" />
          <circle cx="280" cy="35" r="1" opacity="0.5" />
          <circle cx="440" cy="70" r="1.5" />
          <circle cx="610" cy="45" r="1.2" />
          <circle cx="750" cy="80" r="1" opacity="0.6" />
          <circle cx="890" cy="40" r="1.5" />
          <circle cx="512" cy="25" r="1.8" />
          <circle cx="340" cy="110" r="1" opacity="0.4" />
          <circle cx="680" cy="115" r="1" opacity="0.5" />
        </g>

        {/* Distant Stadium Horizon Silhouette / Trees */}
        <path
          d="M0 260 Q80 250 160 258 Q260 248 360 256 Q480 245 560 255 Q680 248 780 258 Q880 250 1024 260 L1024 280 L0 280 Z"
          fill="#080315"
          opacity="0.9"
        />

        {/* ── Floodlight Volumetric Cones ── */}
        <polygon points="220,50 0,420 540,480" fill="url(#leftBeam)" />
        <polygon points="804,50 484,480 1024,420" fill="url(#rightBeam)" />

        {/* ── Outfield Turf Ground (Perspective Lawn) ── */}
        <polygon points="0,250 1024,250 1024,480 0,480" fill="url(#turfBase)" />

        {/* Alternating Mowed Turf Stripes */}
        <g opacity="0.28" fill="#144A20">
          <polygon points="0,250 120,250 160,480 0,480" />
          <polygon points="200,250 300,250 340,480 220,480" />
          <polygon points="380,250 460,250 480,480 390,480" />
          <polygon points="564,250 644,250 634,480 544,480" />
          <polygon points="724,250 824,250 804,480 684,480" />
          <polygon points="904,250 1024,250 1024,480 864,480" />
        </g>

        {/* ── Center Cricket Pitch Strip ── */}
        <polygon points="468,255 556,255 580,480 444,480" fill="url(#pitchGrad)" />

        {/* Pitch Crease Lines - Moved above the text area to avoid cutting through bottom text */}
        <line x1="472" y1="280" x2="552" y2="280" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
        <line x1="465" y1="330" x2="559" y2="330" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

        {/* Pitch Inner Crease Rectangle */}
        <polygon points="484,260 540,260 550,330 474,330" fill="#EADBC3" opacity="0.4" />

        {/* ── 3 Cricket Wickets (Stumps & Bails) on Pitch ── */}
        <g filter="url(#neonGlow)">
          {/* Stumps shadow */}
          <ellipse cx="512" cy="308" rx="14" ry="3" fill="#0A2412" opacity="0.8" />
          {/* 3 Stumps */}
          <line x1="506" y1="272" x2="506" y2="306" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="512" y1="272" x2="512" y2="306" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="518" y1="272" x2="518" y2="306" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bails */}
          <line x1="504" y1="272" x2="520" y2="272" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* ── Chainlink Fence & Neon Base Rail ── */}
        <rect x="0" y="160" width="1024" height="92" fill="url(#fenceMesh)" />

        {/* Fence Posts */}
        <g stroke="#64748B" strokeWidth="3" opacity="0.6">
          <line x1="80" y1="140" x2="80" y2="252" />
          <line x1="240" y1="140" x2="240" y2="252" />
          <line x1="400" y1="140" x2="400" y2="252" />
          <line x1="624" y1="140" x2="624" y2="252" />
          <line x1="784" y1="140" x2="784" y2="252" />
          <line x1="944" y1="140" x2="944" y2="252" />
        </g>

        {/* Top Wire */}
        <line x1="0" y1="160" x2="1024" y2="160" stroke="#94A3B8" strokeWidth="2" opacity="0.4" />

        {/* Glowing Neon Green Ground Boundary Rail */}
        <line x1="0" y1="250" x2="1024" y2="250" stroke="#C5FA19" strokeWidth="4" filter="url(#neonGlow)" />
        <line x1="0" y1="250" x2="1024" y2="250" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />

        {/* ── Stadium Flags / Sponsor Pennants on Fence ── */}
        {/* Left flag */}
        <g transform="translate(244, 180)">
          <rect width="36" height="52" rx="4" fill="#0C2515" stroke="#C5FA19" strokeWidth="1.5" opacity="0.85" />
          <path d="M10 14 L20 26 L10 38" fill="none" stroke="#C5FA19" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Right flag */}
        <g transform="translate(744, 180)">
          <rect width="36" height="52" rx="4" fill="#0C2515" stroke="#C5FA19" strokeWidth="1.5" opacity="0.85" />
          <path d="M26 14 L16 26 L26 38" fill="none" stroke="#C5FA19" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ── Glowing Neon Batsman Graphic on Right Fence (Bat held firmly in hands) ── */}
        <g transform="translate(850, 150)" filter="url(#neonGlow)" opacity="0.95">
          {/* Framed box on fence */}
          <rect width="90" height="96" rx="8" fill="#041208" fillOpacity="0.75" stroke="#C5FA19" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Head & Helmet */}
          <circle cx="52" cy="22" r="6" fill="#C5FA19" />
          <path d="M46 22 L38 24" stroke="#C5FA19" strokeWidth="2.5" strokeLinecap="round" />

          {/* Torso */}
          <path d="M51 28 L45 48" stroke="#C5FA19" strokeWidth="4.5" strokeLinecap="round" />

          {/* Front and Back Legs */}
          <path d="M45 48 L35 66 L26 84" stroke="#C5FA19" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M45 48 L55 66 L64 84" stroke="#C5FA19" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Arms reaching down to hands */}
          <path d="M49 32 L40 38 L36 46" stroke="#C5FA19" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M53 33 L46 41 L39 48" stroke="#C5FA19" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Two Hands wrapped around the bat handle */}
          <circle cx="36" cy="46" r="3" fill="#C5FA19" />
          <circle cx="39" cy="48" r="3" fill="#C5FA19" />

          {/* Bat Handle passing directly through the hands */}
          <line x1="32" y1="42" x2="42" y2="52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

          {/* Cricket Bat Blade extending straight from the hands */}
          <polygon points="41,51 46,54 61,78 55,81" fill="#FFFFFF" />

          {/* Glowing Cricket Ball */}
          <circle cx="18" cy="42" r="4" fill="#FFFFFF" filter="url(#superGlow)" />
        </g>

        {/* ── Left Floodlight Tower ── */}
        <g transform="translate(205, 30)">
          {/* Tower steel pole */}
          <line x1="22" y1="50" x2="30" y2="230" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <line x1="16" y1="50" x2="26" y2="230" stroke="#64748B" strokeWidth="2" />
          {/* LED Bank Frame (angled) */}
          <polygon points="0,15 48,0 56,44 8,58" fill="#0F172A" stroke="#C5FA19" strokeWidth="1.5" />
          {/* 4x3 Floodlight Matrix */}
          <g fill="#FFFFFF" filter="url(#superGlow)">
            <rect x="8" y="14" width="7" height="7" rx="1.5" />
            <rect x="18" y="11" width="7" height="7" rx="1.5" />
            <rect x="28" y="8" width="7" height="7" rx="1.5" />
            <rect x="38" y="5" width="7" height="7" rx="1.5" />
            <rect x="10" y="25" width="7" height="7" rx="1.5" />
            <rect x="20" y="22" width="7" height="7" rx="1.5" />
            <rect x="30" y="19" width="7" height="7" rx="1.5" />
            <rect x="40" y="16" width="7" height="7" rx="1.5" />
            <rect x="12" y="36" width="7" height="7" rx="1.5" />
            <rect x="22" y="33" width="7" height="7" rx="1.5" />
            <rect x="32" y="30" width="7" height="7" rx="1.5" />
            <rect x="42" y="27" width="7" height="7" rx="1.5" />
          </g>
        </g>

        {/* ── Right Floodlight Tower ── */}
        <g transform="translate(760, 30)">
          {/* Tower steel pole */}
          <line x1="28" y1="50" x2="20" y2="230" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <line x1="24" y1="50" x2="16" y2="230" stroke="#64748B" strokeWidth="2" />
          {/* LED Bank Frame (angled) */}
          <polygon points="8,0 56,15 48,58 0,44" fill="#0F172A" stroke="#C5FA19" strokeWidth="1.5" />
          {/* 4x3 Floodlight Matrix */}
          <g fill="#FFFFFF" filter="url(#superGlow)">
            <rect x="9" y="5" width="7" height="7" rx="1.5" />
            <rect x="19" y="8" width="7" height="7" rx="1.5" />
            <rect x="29" y="11" width="7" height="7" rx="1.5" />
            <rect x="39" y="14" width="7" height="7" rx="1.5" />
            <rect x="7" y="16" width="7" height="7" rx="1.5" />
            <rect x="17" y="19" width="7" height="7" rx="1.5" />
            <rect x="27" y="22" width="7" height="7" rx="1.5" />
            <rect x="37" y="25" width="7" height="7" rx="1.5" />
            <rect x="5" y="27" width="7" height="7" rx="1.5" />
            <rect x="15" y="30" width="7" height="7" rx="1.5" />
            <rect x="25" y="33" width="7" height="7" rx="1.5" />
            <rect x="35" y="36" width="7" height="7" rx="1.5" />
          </g>
        </g>
      </svg>

      {/* ─── INTERACTIVE HTML / REACT HUD & GAMING OVERLAY ─── */}
      <div className="relative z-20 flex min-h-[380px] md:min-h-[460px] flex-col justify-between p-4 sm:p-6 md:p-8">
        {/* ── TOP HUD BAR ── */}
        <div className="flex items-center justify-between gap-2">
          {/* Left HUD: Player Avatar & HP/Level */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/60 px-3 py-2 backdrop-blur-md shadow-lg">
            {/* Pixel Avatar Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C5FA19]/60 bg-[#122415] text-lg shadow-[0_0_12px_rgba(197,250,25,0.4)]">
              🏏
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                  PLAYER 1
                </span>
                <span className="font-mono text-[10px] font-bold text-[#C5FA19]">
                  LV. 10
                </span>
              </div>
              {/* Segmented Green HP / Power Bar */}
              <div className="mt-1 flex h-2 w-24 gap-0.5 overflow-hidden rounded bg-black/60 p-0.5 border border-[#C5FA19]/30">
                <div className="h-full w-full rounded-sm bg-gradient-to-r from-[#86EFAC] via-[#C5FA19] to-[#00D4D4] shadow-[0_0_8px_#C5FA19]" />
              </div>
            </div>
          </div>

          {/* Right HUD: Gold Coins / Rate Badge */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-black/60 px-3.5 py-2 backdrop-blur-md shadow-lg">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 text-xs font-black text-amber-950 shadow">
              🪙
            </span>
            <div className="text-right">
              <span className="font-mono text-sm font-black text-yellow-300">
                ₹{pricePerHour}
              </span>
              <span className="font-mono text-[10px] font-bold text-gray-300">
                /hr
              </span>
            </div>
            <Link
              href="/book-turf"
              className="flex h-5 w-5 items-center justify-center rounded bg-[#C5FA19] text-[11px] font-black text-black hover:scale-110 active:scale-95 transition"
              title="Book Match Slot"
            >
              +
            </Link>
          </div>
        </div>

        {/* ── MIDDLE ROW: LEFT MENU & CENTER TITLE ── */}
        <div className="my-auto grid grid-cols-1 items-center gap-4 md:grid-cols-[160px_1fr_160px]">
          {/* Left Arcade Game Modes: Keep Cricket Only */}
          <div className="hidden flex-col gap-2 md:flex">
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#C5FA19] px-4 py-2.5 text-xs font-black text-[#0C021E] shadow-[0_0_24px_rgba(197,250,25,0.6)] w-fit border border-black/20">
              <span className="text-base">🏏</span> Cricket
            </div>
          </div>

          {/* Center 3D Arcade Title Banner */}
          <div className="text-center">
            {/* Corner Bracket Frame */}
            <div className="inline-block relative px-8 py-3">
              {/* Top-left corner bracket */}
              <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#C5FA19] shadow-[0_0_8px_#C5FA19]" />
              {/* Top-right corner bracket */}
              <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[#C5FA19] shadow-[0_0_8px_#C5FA19]" />
              {/* Bottom-left corner bracket */}
              <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#C5FA19] shadow-[0_0_8px_#C5FA19]" />
              {/* Bottom-right corner bracket */}
              <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#C5FA19] shadow-[0_0_8px_#C5FA19]" />

              {/* Subheading: CRICKET */}
              <p className="font-mono text-xs md:text-sm font-black uppercase tracking-[0.45em] text-[#C5FA19] drop-shadow-[0_0_12px_rgba(197,250,25,0.8)]">
                CRICKET
              </p>

              {/* Big 3D Chrome TURF Title */}
              <h3
                className="mt-1 font-black italic tracking-wider text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  background:
                    "linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 35%, #94A3B8 50%, #E2E8F0 55%, #64748B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 4px 0 #1E293B) drop-shadow(0 10px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 25px rgba(197,250,25,0.3))",
                }}
              >
                TURF
              </h3>

              {/* Tagline */}
              <p className="mt-2 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-gray-300">
                BOOK &middot; PLAY &middot; COMPETE
              </p>
            </div>
          </div>

          {/* Right Spacer for Grid Balance on Desktop */}
          <div className="hidden md:block" />
        </div>

        {/* ── BOTTOM ROW: CLICKABLE "PLAY NOW ▶" ARCADE BUTTON ── */}
        <div className="mt-4 flex flex-col items-center justify-center text-center">
          <Link
            href="/book-turf"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {/* 3D Button Bevel & Neon Glow Frame */}
            <div className="relative flex items-center justify-center gap-3 rounded-full border-2 border-black bg-[#C5FA19] px-10 py-3.5 sm:px-14 sm:py-4 shadow-[0_6px_0_#0F5117,0_12px_28px_rgba(197,250,25,0.55)] transition-all group-hover:bg-[#d6ff47] group-hover:shadow-[0_6px_0_#0F5117,0_16px_40px_rgba(197,250,25,0.8)] group-active:translate-y-1.5 group-active:shadow-[0_0_15px_rgba(197,250,25,0.6)]">
              {/* Button text */}
              <span className="font-mono text-base sm:text-xl font-black uppercase tracking-wider text-black">
                PLAY NOW
              </span>
              <span className="text-black text-sm sm:text-base font-black transition-transform duration-200 group-hover:translate-x-1">
                ▶
              </span>
            </div>
          </Link>

          {/* Subtext info moved downwards with dark backdrop pill */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/75 px-4 py-1.5 shadow-lg backdrop-blur">
            <span className="text-xs">⚡</span>
            <p className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-white">
              Instant Slot Confirmation &middot; <span className="text-[#C5FA19]">9 AM – 11 PM</span> Matches
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


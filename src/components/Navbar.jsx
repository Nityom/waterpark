"use client";

import { useState } from "react";
import Link from "next/link";
import ImageWithSkeleton from "./ImageWithSkeleton";

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div
        className={`bg-[#C5FA19] text-black px-4 md:px-10 flex items-center justify-between relative overflow-hidden transition-all duration-500 ease-in-out ${showBanner ? "py-3 md:py-5 opacity-100 max-h-20" : "py-0 opacity-0 max-h-0"
          }`}
      >
        <span className="text-xs md:text-sm font-bold">
          Open till 5:00 pm
        </span>

        <button
          className="text-xl md:text-2xl text-black hover:opacity-70"
          onClick={() => setShowBanner(false)}
        >
          ✕
        </button>
      </div>

      {/* Navbar */}
      <nav className="bg-[#461AA2] py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="relative block h-10 sm:h-12 md:h-16 lg:h-20 w-[105px] sm:w-[130px] md:w-[180px] z-50 flex-shrink-0">
            <ImageWithSkeleton
              src="/logo.png"
              alt="Waves Logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 lg:gap-10 flex-1 justify-center items-center">
            <Link href="/" className="text-white text-base font-medium hover:opacity-80">
              Home
            </Link>
            <Link href="/about-us" className="text-white text-base font-medium hover:opacity-80">
              About Us
            </Link>
            <Link href="/book-turf" className="text-[#C5FA19] font-bold text-base hover:opacity-80 flex items-center gap-1.5 relative group">
              <span>🏏 Cricket Turf</span>
              <span className="bg-[#FF1493] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-sm">
                NEW
              </span>
            </Link>
            <Link href="/gallery" className="text-white text-base font-medium hover:opacity-80">
              Gallery
            </Link>
            <Link href="/contact-us" className="text-white text-base font-medium hover:opacity-80">
              Contact Us
            </Link>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Turf Quick Action for Mobile Screens */}
            <Link
              href="/book-turf"
              className="md:hidden relative inline-flex items-center gap-1 bg-[#C5FA19] text-[#0C021E] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs font-black shadow-sm hover:bg-[#d6ff47] transition-all whitespace-nowrap active:scale-95"
            >
              <span>🏏</span>
              <span>Turf</span>
              <span className="absolute -top-2 -right-1 bg-[#FF1493] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider leading-none shadow-md border border-[#461AA2] animate-bounce">
                NEW
              </span>
            </Link>

            {/* Buy Tickets */}
            <Link
              href="/book-tickets"
              className="bg-white text-[#461AA2] py-1.5 sm:py-2 md:py-3 px-3.5 sm:px-5 md:px-7 rounded-full text-xs sm:text-sm md:text-base font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all whitespace-nowrap active:scale-95"
            >
              Buy Tickets
            </Link>

            {/* Hamburger */}
            <button
              aria-label="Toggle navigation menu"
              className="md:hidden flex flex-col justify-center gap-1.5 z-50 p-1.5 sm:p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-[#461AA2] z-40 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link
              href="/"
              className="text-white text-2xl font-medium hover:text-[#C5FA19]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className="text-white text-2xl font-medium hover:text-[#C5FA19]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/book-turf"
              className="text-[#C5FA19] text-2xl font-bold hover:text-white flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>🏏 Cricket Turf</span>
              <span className="bg-[#FF1493] text-white text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-md">
                NEW
              </span>
            </Link>

            <Link
              href="/gallery"
              className="text-white text-2xl font-medium hover:text-[#C5FA19]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>

            <Link
              href="/contact-us"
              className="text-white text-2xl font-medium hover:text-[#C5FA19]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            <Link
              href="/book-tickets"
              className="bg-[#C5FA19] text-[#461AA2] text-2xl font-bold px-8 py-3 rounded-full hover:scale-105 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Tickets 🎟️
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
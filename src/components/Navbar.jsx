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
      <nav className="bg-[#461AA2] py-4 md:py-5 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="relative block h-12 md:h-16 lg:h-20 w-[140px] md:w-[180px] z-50">
            <ImageWithSkeleton
              src="/logo.png"
              alt="Waves Logo"
              className="w-full h-full"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 flex-1 justify-center">
            <Link href="/" className="text-white text-base font-medium hover:opacity-80">
              Home
            </Link>
            <Link href="/about-us" className="text-white text-base font-medium hover:opacity-80">
              About Us
            </Link>
            <Link href="/gallery" className="text-white text-base font-medium hover:opacity-80">
              Gallery
            </Link>
            <Link href="/contact-us" className="text-white text-base font-medium hover:opacity-80">
              Contact Us
            </Link>
          </div>

          {/* Buy Tickets */}
          <a
            href="#tickets"
            className="bg-white text-[#461AA2] py-2 md:py-3 px-5 md:px-7 rounded-[25px] text-sm md:text-base font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all mr-12 md:mr-0"
          >
            Buy Tickets
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50 p-2 absolute right-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
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
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
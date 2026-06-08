"use client";

import { useState } from "react";
import Image from "next/image";
import { siteInfo } from "../constants/siteInfo";

function Tickets() {
  const [activeTab, setActiveTab] = useState("single");

  return (
    <section
      id="tickets"
      className="bg-[#461AA2] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 md:mb-3 px-2">
            Your ticket to adventure
          </h2>
          <p className="text-white text-sm md:text-base px-4">
            Pick your pass and enjoy all-day access to Wardha's biggest splash adventure.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center mb-6 px-4">
          <button
            onClick={() => setActiveTab("single")}
            className={`flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all ${activeTab === "single"
              ? "bg-white text-[#461AA2]"
              : "bg-[#5a2db3] text-white hover:bg-[#6835c4]"
              }`}
          >
            <span className="text-base md:text-lg">👤</span>
            Single Ticket
          </button>

          <button
            onClick={() => setActiveTab("group")}
            className={`flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all ${activeTab === "group"
              ? "bg-white text-[#461AA2]"
              : "bg-[#5a2db3] text-white hover:bg-[#6835c4]"
              }`}
          >
            <span className="text-base md:text-lg">👥</span>
            Group Events
          </button>
        </div>

        {/* Single Ticket */}
        {activeTab === "single" && (
          <div className="bg-white rounded-[20px] md:rounded-[30px] p-4 md:p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 relative">

            {/* Left Image */}
            <div className="relative">
              <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden min-h-[200px] md:min-h-[300px]">

                <Image
                  src="/hero.jpg"
                  alt="All day pass"
                  fill
                  className="object-cover"
                />

                {/* Pink Badge */}
                <div className="absolute top-3 left-3 md:top-6 md:left-6 bg-[#FF1493] text-white px-4 py-3 md:px-6 md:py-4 rounded-full transform -rotate-12 shadow-lg">
                  <div className="text-center font-bold">
                    <div className="text-lg md:text-2xl leading-tight">
                      All day
                    </div>
                    <div className="text-lg md:text-2xl leading-tight">
                      Ticket
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="flex flex-col justify-between">

              {/* Benefits */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-[#C5FA19] text-lg md:text-xl">✓</span>
                  <p className="text-gray-800 text-xs md:text-sm">
                    Unlimited all-day access to the entire park
                  </p>
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-[#C5FA19] text-lg md:text-xl">✓</span>
                  <p className="text-gray-800 text-xs md:text-sm">
                    Re-entry allowed throughout the same day
                  </p>
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-[#C5FA19] text-lg md:text-xl">✓</span>
                  <p className="text-gray-800 text-xs md:text-sm">
                    Includes life jackets, socks, and waterproof phone case
                  </p>
                </div>

                <div className="flex items-start gap-2 md:gap-3">
                  <span className="text-[#C5FA19] text-lg md:text-xl">✓</span>
                  <p className="text-gray-800 text-xs md:text-sm">
                    Safety briefing
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4 md:mb-6">
                <h4 className="text-lg md:text-xl font-bold text-[#461AA2] mb-3 md:mb-4">
                  Ticket Prices
                </h4>

                <div className="space-y-3">

                  {/* Free */}
                  <div className="flex items-center justify-between py-2 px-3 md:px-4 bg-[#C5FA19]/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl">👶</span>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          Below 3ft
                        </p>
                        <p className="text-xs text-gray-600">Height based</p>
                      </div>
                    </div>
                    <span className="text-lg md:text-xl font-bold text-[#00D4D4]">
                      FREE
                    </span>
                  </div>

                  {/* Child */}
                  <div className="flex items-center justify-between py-2 px-3 md:px-4 bg-[#00D4D4]/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl">🧒</span>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          Child Rate
                        </p>
                        <p className="text-xs text-gray-600">Till 4 feet</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg md:text-xl font-bold text-[#461AA2]">
                        ₹{siteInfo.pricing.regular.child}
                      </span>
                      <p className="text-xs text-gray-600">
                        ₹{siteInfo.pricing.sunday.child} on Sunday{siteInfo.carnival.active ? " / Carnival" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Adult */}
                  <div className="flex items-center justify-between py-2 px-3 md:px-4 bg-[#461AA2]/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl">👨</span>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          Adult Rate
                        </p>
                        <p className="text-xs text-gray-600">Above 4 feet</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg md:text-xl font-bold text-[#461AA2]">
                        ₹{siteInfo.pricing.regular.adult}
                      </span>
                      <p className="text-xs text-gray-600">
                        ₹{siteInfo.pricing.sunday.adult} on Sunday{siteInfo.carnival.active ? " / Carnival" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Food */}
                  <div className="flex items-center justify-between py-2 px-3 md:px-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xl md:text-2xl">🍽️</span>
                      <div>
                        <p className="font-semibold text-sm md:text-base">
                          Lunch Veg Thali
                        </p>
                        <p className="text-xs text-gray-600">Add-on (optional)</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg md:text-xl font-bold text-[#461AA2]">
                        ₹{siteInfo.addOns.lunchVegThali}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div>
                <a href="/book-tickets" className="bg-[#461AA2] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold hover:bg-[#5a2db3] transition-all shadow-lg w-full lg:w-auto inline-block">
                  Buy Your Tickets
                </a>

                <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3">
                  Guaranteed entry only when purchased on thewaves.co.in
                </p>
              </div>

              {/* Decoration */}
              <Image
                src="/icon-1.webp"
                alt="Life jacket"
                width={160}
                height={160}
                className="hidden md:block absolute right-6 object-contain"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Group Events */}
        {activeTab === "group" && (
          <div className="bg-white rounded-[20px] md:rounded-[30px] p-6 md:p-8 shadow-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-[#461AA2] mb-3">
              Group Events & Packages
            </h3>

            <p className="text-gray-700 text-sm md:text-base mb-6">
              Perfect for birthday parties, corporate events, and special occasions!
            </p>

            <button className="bg-[#461AA2] text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-[#5a2db3] transition-all shadow-lg">
              Contact Us for Group Bookings
            </button>
          </div>
        )}

        {/* Decorative Background */}
        <Image
          src="/icon-4.webp"
          alt="Decoration"
          width={200}
          height={200}
          className="hidden md:block absolute top-10 left-10 object-contain opacity-80"
          unoptimized
        />
      </div>
    </section>
  );
}

export default Tickets;
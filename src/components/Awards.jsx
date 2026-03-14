"use client";

import { useState } from "react";
import Image from "next/image";

function Awards() {
  const [openTransport, setOpenTransport] = useState("car");

  const toggleTransport = (type) => {
    setOpenTransport(openTransport === type ? null : type);
  };

  return (
    <section className="bg-[#DDFBFF] py-10 md:py-12 lg:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Awards Section */}
        <div className="mb-10 md:mb-12">

          {/* Header */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-2 md:mb-3">
              Fun is so good, it's record<br />
              breaking and award winning
            </h2>

            <p className="text-sm md:text-base text-gray-700">
              Thousands of visitors, a few awards — we're the real deal.
            </p>
          </div>

          {/* Awards Grid */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-4">

            {/* Award 1 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">Traveler's Choice</p>
              <p className="font-bold text-black text-sm">• 2024</p>
            </div>

            {/* Award 2 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">JustDial Awards</p>
              <p className="font-bold text-black text-sm">• 2023</p>
            </div>

            {/* Main JustDial Card */}
            <div className="bg-white rounded-[25px] p-6 md:p-8 text-center w-full md:w-72 h-40 md:h-48 flex flex-col items-center justify-center border-2 border-[#00D4D4] shadow-lg">
              <p className="font-bold text-black text-sm mb-2">The Waves</p>

              <div className="flex gap-1 mb-2">
                <span className="text-xl md:text-2xl">⭐⭐⭐⭐⭐</span>
              </div>

              <p className="text-xs text-gray-600 mb-2 md:mb-3">
                606 reviews
              </p>

              <div className="flex items-center gap-2">

                <Image
                  src="/jd.png"
                  alt="JustDial"
                  width={40}
                  height={40}
                  className="object-contain"
                />

                <p className="font-bold text-black text-base md:text-lg">
                  JustDial
                </p>

              </div>
            </div>

            {/* Award 3 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">JustDial Awards</p>
              <p className="font-bold text-black text-sm">• 2024</p>
            </div>

            {/* Starfish Decoration */}

            <Image
              src="/icon-3.webp"
              alt="Starfish decoration"
              width={180}
              height={180}
              className="hidden md:block absolute -top-16 right-0 object-contain z-10"
              unoptimized
            />

          </div>
        </div>

        {/* Transportation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left Text */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-4 md:mb-6">
              Cars, autos, or buses —<br />
              they all take you<br />
              to The Waves
            </h2>

            <Image
              src="/icon-5.webp"
              alt="Pool float decoration"
              width={220}
              height={220}
              className="hidden lg:block absolute -bottom-20 -left-10 object-contain opacity-50"
              unoptimized
            />
          </div>

          {/* Transport Options */}
          <div className="space-y-3">

            {/* By Car */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px]">
              <button
                onClick={() => toggleTransport("car")}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#461AA2] text-white font-bold text-base md:text-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">🚗</span>
                    <span>By car</span>
                  </div>

                  <span
                    className={`transform transition-transform ${openTransport === "car" ? "rotate-180" : ""
                      }`}
                  >
                    ▲
                  </span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${openTransport === "car"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="bg-[#461AA2] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Follow the directions to The Waves</li>
                    <li>• Parking available near the entrance</li>
                    <li>
                      • Get directions:{" "}
                      <a
                        href="https://www.google.com/maps/dir//The+Waves+Amusement+and+Water+Park+Seloo,+Maharashtra+442104/@20.8056463,78.6808138,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bd48136c3370ae5:0x40c3fe4a79592727"
                        className="underline"
                      >
                        Google Maps →
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Auto */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px]">
              <button
                onClick={() => toggleTransport("auto")}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#FF6B35] text-white font-bold text-base md:text-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">🛺</span>
                    <span>By auto</span>
                  </div>

                  <span
                    className={`transform transition-transform ${openTransport === "auto" ? "rotate-180" : ""
                      }`}
                  >
                    ▲
                  </span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${openTransport === "auto"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="bg-[#FF6B35] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Ask the driver to drop you at The Waves</li>
                    <li>• Entry is near the main gate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Bus */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px]">
              <button
                onClick={() => toggleTransport("bus")}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#FF1493] text-white font-bold text-base md:text-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl">🚌</span>
                    <span>By bus</span>
                  </div>

                  <span
                    className={`transform transition-transform ${openTransport === "bus" ? "rotate-180" : ""
                      }`}
                  >
                    ▲
                  </span>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${openTransport === "bus"
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="bg-[#FF1493] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Ask the local bus to stop at The Waves</li>
                    <li>• Entry is a short walk from the road</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
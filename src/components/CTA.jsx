"use client";

import Image from "next/image";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#461AA2] via-[#3A158F] to-[#2B0F6B] py-8 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,250,25,0.25),transparent_60%)]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center">

          {/* Left Text */}
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              1 park, 150+ <br />
              obstacles
            </h2>

            <h3 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mt-3 md:mt-6">
              countless <br />
              laughs
            </h3>
          </div>

          {/* Right CTA */}
          <div>
            <h3 className="text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-5 md:mb-10">
              <span className="text-white">just </span>
              <span className="text-[#C5FA19] drop-shadow-lg">
                waiting <br /> for you*
              </span>
            </h3>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mb-4 md:mb-8">

              <button className="bg-[#C5FA19] text-[#461AA2] px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:scale-105 hover:bg-white transition-all duration-300">
                Buy Your Day Pass
              </button>

              <button className="border-2 border-white text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-white hover:text-[#461AA2] hover:scale-105 transition-all duration-300">
                Plan Group Event
              </button>

            </div>

            <p className="text-white/80 text-xs md:text-sm max-w-md leading-relaxed">
              *Purchase tickets only via thewaves.co.in or at our counter. We don't accept
              3rd party tickets.
            </p>
          </div>
        </div>

        {/* Coral Decoration */}
        <div className="absolute -bottom-10 -left-10 w-20 sm:w-28 md:w-40 lg:w-[280px] opacity-40 pointer-events-none">
          <Image
            src="/icon-1.webp"
            alt="Coral decoration"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
            unoptimized
          />
        </div>

        {/* Smiley Decoration */}
        <div className="absolute -top-6 right-4 w-16 sm:w-24 md:w-40 lg:w-72 opacity-90 pointer-events-none animate-bounce-slow">
          <Image
            src="/icon-5.webp"
            alt="Smiley decoration"
            width={300}
            height={300}
            className="w-full h-auto object-contain"
            unoptimized
          />
        </div>

      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounceSlow 4s infinite ease-in-out;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

    </section>
  );
}

export default CTA;
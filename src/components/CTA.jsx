function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#461AA2] via-[#3A158F] to-[#2B0F6B] py-8 md:py-20 lg:py-24 px-4 md:px-8 lg:px-12">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(197,250,25,0.25),transparent_60%)]"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-16 items-center">
          
          {/* Left Side Text */}
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

          {/* Right Side CTA */}
          <div>
            <h3 className="text-2xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-5 md:mb-10">
              <span className="text-white">just </span>
              <span className="text-[#C5FA19] drop-shadow-lg">
                waiting <br /> for you*
              </span>
            </h3>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5 mb-4 md:mb-8">
              
              {/* Primary Button */}
              <button className="bg-[#C5FA19] text-[#461AA2] px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:scale-105 hover:bg-white transition-all duration-300">
                Buy Your Day Pass
              </button>

              {/* Secondary Button */}
              <button className="border-2 border-white text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-white hover:text-[#461AA2] hover:scale-105 transition-all duration-300">
                Plan Group Event
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-white/80 text-xs md:text-sm max-w-md leading-relaxed">
              *Purchase tickets only via thewaves.co.in or at our counter. We don't accept
              3rd party tickets.
            </p>
          </div>
        </div>

        {/* Decorations - hidden on small mobile */}
        {/* Coral */}
        <img
          src="/icon-1.webp"
          alt="Coral decoration"
          className="hidden sm:block absolute -bottom-20 -left-20 w-[120px] md:w-[180px] lg:w-[280px] opacity-40 pointer-events-none"
        />

        {/* Smiley */}
        <img
          src="/icon-5.webp"
          alt="Smiley decoration"
          className="hidden md:block absolute -top-10 right-10 w-32 md:w-52 lg:w-72 opacity-90 pointer-events-none animate-bounce-slow"
        />
      </div>

      {/* Custom Animation */}
      <style>
        {`
          .animate-bounce-slow {
            animation: bounceSlow 4s infinite ease-in-out;
          }

          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </section>
  );
}

export default CTA;

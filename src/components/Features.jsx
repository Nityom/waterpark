function Features() {
  return (
    <section className="bg-[#DDFBFF] py-20 px-10 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="mb-12 max-w-[600px]">
          <h2 className="text-5xl font-extrabold mb-6 text-black leading-tight">
            One of the top-rated attractions in Wardha
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            Fly down the slides, race through the obstacles, and splash around
            with the stunning backdrop of Wardha Marina.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative">
          
          {/* Large Pink Card - Left Side */}
          <div className="md:row-span-2 bg-[#FF1493] rounded-[30px] p-10 relative overflow-hidden min-h-[600px]">
            <h3 className="text-5xl font-extrabold text-white mb-6 leading-tight relative z-10">
              Splash! into <br /> happiness
            </h3>

            {/* Decorative pink blob circles */}
            <div className="absolute top-16 left-16 w-44 h-44 bg-[#E6007E] rounded-full"></div>
            <div className="absolute top-32 left-48 w-56 h-56 bg-[#E6007E] rounded-full"></div>
            <div className="absolute top-1/3 -left-20 w-64 h-64 bg-[#E6007E] rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-[#E6007E] rounded-full"></div>

            {/* Image */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] z-10">
              <div className="relative w-full h-full">
                
                {/* Blob shape mask */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    clipPath: "ellipse(70% 45% at 50% 75%)",
                  }}
                >
                  <div className="w-full h-full bg-[#E6007E] absolute top-0"></div>
                </div>

                {/* Actual image */}
                <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden rounded-t-[120px]">
                  <img
                    src="/hero-2.png"
                    alt="Water park fun"
                    className="w-full h-full object-cover scale-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jump & Splash Card - Top Right */}
          <div className="bg-[#00D4D4] rounded-[30px] p-8 flex flex-col justify-center min-h-[290px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">💧</span>
              <h3 className="text-2xl font-bold text-black">
                Jump & Splash
              </h3>
            </div>
            <p className="text-black text-base leading-relaxed">
              Conquer 150+ exciting obstacles and slide through 42,000 m² of pure
              fun
            </p>
          </div>

          {/* Relax & Shine Card - Middle Right */}
          <div className="bg-[#FF6B35] rounded-[30px] p-8 flex flex-col justify-center min-h-[290px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">☀️</span>
              <h3 className="text-2xl font-bold text-white">
                Relax & Shine
              </h3>
            </div>
            <p className="text-white text-base leading-relaxed">
              Sunbathe, relax, and capture your best moments with the JBR skyline
              in view
            </p>
          </div>

          {/* ✅ ICON-5 NOW IN CENTER OF GRID */}
     <img
  src="/icon-5.webp"
  alt="Inflatable decoration"
  className="absolute top-1/2 right-6 
             -translate-y-1/2
             w-36 h-36 object-contain
             z-40"
/>

        </div>

        {/* Bottom Full Width Card */}
        <div className="bg-[#C5FA19] rounded-[30px] p-8 relative overflow-visible">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🪸</span>
            <h3 className="text-2xl font-bold text-black">
              For children & adults
            </h3>
          </div>
          <p className="text-black text-base leading-relaxed max-w-[900px]">
            Fun and excitement for all ages – everyone can jump, slide, and laugh
            together all day long
          </p>
        </div>

        {/* Decorative Icons */}
        <img
          src="/icon-3.webp"
          alt="Coral decoration"
          className="absolute top-8 right-8 w-40 h-40 object-contain"
          style={{ zIndex: 20 }}
        />

        <img
          src="/icon-2.webp"
          alt="Socks decoration"
          className="absolute bottom-32 right-42 w-32 h-32 object-contain"
          style={{ zIndex: 20 }}
        />
      </div>
    </section>
  );
}

export default Features;

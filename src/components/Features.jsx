import ImageWithSkeleton from './ImageWithSkeleton';

function Features() {
  return (
    <section className="bg-[#DDFBFF] pb-10 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="mb-8 md:mb-12 max-w-[600px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 text-black leading-tight">
            One of the top-rated attractions in Wardha
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Fly down the slides, race through the obstacles, and splash around
            with the stunning backdrop of Wardha Marina.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6 relative">
          
          {/* Large Pink Card - Left Side */}
          <div className="md:row-span-2 bg-[#FF1493] rounded-[20px] md:rounded-[30px] p-6 md:p-10 relative overflow-hidden min-h-[400px] md:min-h-[600px]">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight relative z-10">
              Splash! into <br /> happiness
            </h3>

            {/* Decorative pink blob circles */}
            <div className="absolute top-8 md:top-16 left-8 md:left-16 w-24 md:w-44 h-24 md:h-44 bg-[#E6007E] rounded-full"></div>
            <div className="absolute top-16 md:top-32 left-24 md:left-48 w-32 md:w-56 h-32 md:h-56 bg-[#E6007E] rounded-full"></div>
            <div className="absolute top-1/3 -left-10 md:-left-20 w-40 md:w-64 h-40 md:h-64 bg-[#E6007E] rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 md:w-40 h-24 md:h-40 bg-[#E6007E] rounded-full"></div>

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
                <div className="absolute bottom-0 left-0 right-0 h-full overflow-hidden rounded-t-[60px] md:rounded-t-[120px]">
                  <ImageWithSkeleton
                    src="/hero-2.png"
                    alt="Water park fun"
                    className="w-full h-full object-cover scale-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jump & Splash Card - Top Right */}
          <div className="bg-[#00D4D4] rounded-[20px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-center min-h-[200px] md:min-h-[290px]">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl">💧</span>
              <h3 className="text-xl md:text-2xl font-bold text-black">
                Jump & Splash
              </h3>
            </div>
            <p className="text-black text-sm md:text-base leading-relaxed">
              Conquer 150+ exciting obstacles and slide through 42,000 m² of pure
              fun
            </p>
          </div>

          {/* Relax & Shine Card - Middle Right */}
          <div className="bg-[#FF6B35] rounded-[20px] md:rounded-[30px] p-6 md:p-8 flex flex-col justify-center min-h-[200px] md:min-h-[290px]">
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl">☀️</span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Relax & Shine
              </h3>
            </div>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Sunbathe, relax, and capture your best moments with the JBR skyline
              in view
            </p>
          </div>

          {/* Floating icon - hidden on mobile */}
     <img
  src="/icon-5.webp"
  alt="Inflatable decoration"
  className="hidden md:block absolute top-1/2 right-6 
             -translate-y-1/2
             w-24 lg:w-36 h-24 lg:h-36 object-contain
             z-40"
/>

        </div>

        {/* Bottom Full Width Card */}
        <div className="bg-[#C5FA19] rounded-[20px] md:rounded-[30px] p-6 md:p-8 relative overflow-visible">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <span className="text-2xl md:text-3xl">🪸</span>
            <h3 className="text-xl md:text-2xl font-bold text-black">
              For children & adults
            </h3>
          </div>
          <p className="text-black text-sm md:text-base leading-relaxed max-w-[900px]">
            Fun and excitement for all ages – everyone can jump, slide, and laugh
            together all day long
          </p>
        </div>

        {/* Decorative Icons - hidden on mobile */}
        <img
          src="/icon-3.webp"
          alt="Coral decoration"
          className="hidden md:block absolute top-8 right-8 w-24 md:w-32 lg:w-40 h-24 md:h-32 lg:h-40 object-contain"
          style={{ zIndex: 20 }}
        />

        <img
          src="/icon-2.webp"
          alt="Socks decoration"
          className="hidden md:block absolute bottom-32 right-42 w-20 md:w-24 lg:w-32 h-20 md:h-24 lg:h-32 object-contain"
          style={{ zIndex: 20 }}
        />
      </div>
    </section>
  );
}

export default Features;

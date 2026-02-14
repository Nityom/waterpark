function Essentials() {
  return (
    <section className="bg-[#DDFBFF] py-10 md:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Content Grid */}
        <div className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px]">
          {/* Center Text - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block text-center z-10 max-w-xl px-4 md:px-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-3 md:mb-4">
              Fun can wait...<br />
              but why should it?
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-black">
              You don't need much for a perfect day — check these essentials and join us.
            </p>
          </div>
          
          {/* Mobile Layout - Visible only on mobile */}
          <div className="lg:hidden relative w-full min-h-[500px]">
            {/* Coral decoration on left */}
            <img 
              src="/icon-3.webp" 
              alt="Coral decoration" 
              className="absolute left-0 top-8 w-[140px] h-auto opacity-90"
            />
            
            {/* Flamingo decoration on right */}
            <img 
              src="/icon-2.webp" 
              alt="Flamingo float" 
              className="absolute right-0 bottom-0 w-[140px] h-auto opacity-90"
            />
            
            {/* Essential items badges */}
            <div className="relative pt-20 space-y-4 px-4">
              <div className="bg-[#C5FA19] rounded-[20px] px-4 py-3 shadow-lg transform -rotate-2 ml-28 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <p className="text-black font-bold text-sm">Bring a towel</p>
                </div>
              </div>

              <div className="bg-[#C5FA19] rounded-[20px] px-4 py-3 shadow-lg transform rotate-2 ml-auto mr-4 max-w-[220px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">😄</span>
                  <p className="text-black font-bold text-sm">
                    Take your biggest smile
                  </p>
                </div>
              </div>

              <div className="bg-[#C5FA19] rounded-[20px] px-4 py-3 shadow-lg transform -rotate-1 ml-16 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🩱</span>
                  <p className="text-black font-bold text-sm">
                    Get your swimwear
                  </p>
                </div>
              </div>

              <div className="bg-[#C5FA19] rounded-[20px] px-4 py-3 shadow-lg transform rotate-1 ml-6 max-w-[240px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🧴</span>
                  <p className="text-black font-bold text-sm">
                    Sunscreen – we recommend SPF 30+
                  </p>
                </div>
              </div>

              <div className="bg-[#C5FA19] rounded-[20px] px-4 py-3 shadow-lg transform -rotate-2 ml-auto mr-8 max-w-[220px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏊</span>
                  <p className="text-black font-bold text-sm">
                    You should know how to swim
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Left Side - Coral/Starfish with items - Desktop only */}
          <div className="hidden lg:block absolute left-[2%] top-1/2 -translate-y-1/2 w-[300px] xl:w-[350px]">
            {/* Coral/Starfish Image */}
            <img 
              src="/icon-3.webp" 
              alt="Coral decoration" 
              className="w-full h-auto"
            />
            
            {/* Items positioned around coral */}
            <div className="absolute -top-8 left-24 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform -rotate-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏖️</span>
                <p className="text-black font-bold text-sm">Bring a towel</p>
              </div>
            </div>

            <div className="absolute top-20 -right-12 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform rotate-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎫</span>
                <p className="text-black font-bold text-sm">
                  Get your ticket<br />purchased on thewaves.co.in<br />or at our counter
                </p>
              </div>
            </div>

            <div className="absolute top-52 left-12 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform -rotate-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">😄</span>
                <p className="text-black font-bold text-sm">
                  Take your<br />biggest smile
                </p>
              </div>
            </div>

            <div className="absolute bottom-12 left-20 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform rotate-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🩱</span>
                <p className="text-black font-bold text-sm">
                  Get your<br />swimwear
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Flamingo with items - Desktop only */}
          <div className="hidden lg:block absolute right-[2%] top-1/2 -translate-y-1/2 w-[300px] xl:w-[350px]">
            {/* Flamingo Image */}
            <img 
              src="/icon-2.webp" 
              alt="Flamingo float" 
              className="w-full h-auto"
            />
            
            {/* Items positioned around flamingo */}
            <div className="absolute -top-4 right-0 bg-[#C5FA19] rounded-[20px] md:rounded-[30px] px-4 md:px-5 py-2 md:py-3 shadow-lg transform rotate-2">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl">🧴</span>
                <p className="text-black font-bold text-xs md:text-sm">
                  Sunscreen – we<br />recommend SPF 30+
                </p>
              </div>
            </div>

            <div className="absolute top-28 -left-8 bg-[#C5FA19] rounded-[20px] md:rounded-[30px] px-4 md:px-5 py-2 md:py-3 shadow-lg transform -rotate-1">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl">🏊</span>
                <p className="text-black font-bold text-xs md:text-sm">
                  You should know<br />how to swim
                </p>
              </div>
            </div>

            <div className="absolute bottom-16 right-16 bg-[#C5FA19] rounded-[20px] md:rounded-[30px] px-4 md:px-5 py-2 md:py-3 shadow-lg transform rotate-3">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl">🧦</span>
                <p className="text-black font-bold text-xs md:text-sm">
                  Take socks<br />or water shoes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Essentials;

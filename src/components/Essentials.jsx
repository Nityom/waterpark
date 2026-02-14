function Essentials() {
  return (
    <section className="bg-[#DDFBFF]  px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Content Grid */}
        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Center Text */}
          <div className="text-center z-10 max-w-xl px-8">
            <h2 className="text-6xl font-extrabold text-black leading-tight mb-4">
              Fun can wait...<br />
              but why should it?
            </h2>
            <p className="text-lg text-black">
              You don't need much for a perfect day — check these essentials and join us.
            </p>
          </div>
          {/* Left Side - Coral/Starfish with items */}
          <div className="absolute left-[2%] top-1/2 -translate-y-1/2 w-[350px]">
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

          {/* Right Side - Flamingo with items */}
          <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[350px]">
            {/* Flamingo Image */}
            <img 
              src="/icon-2.webp" 
              alt="Flamingo float" 
              className="w-full h-auto"
            />
            
            {/* Items positioned around flamingo */}
            <div className="absolute -top-4 right-0 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform rotate-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧴</span>
                <p className="text-black font-bold text-sm">
                  Sunscreen – we<br />recommend SPF 30+
                </p>
              </div>
            </div>

            <div className="absolute top-28 -left-8 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform -rotate-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏊</span>
                <p className="text-black font-bold text-sm">
                  You should know<br />how to swim
                </p>
              </div>
            </div>

            <div className="absolute bottom-16 right-16 bg-[#C5FA19] rounded-[30px] px-5 py-3 shadow-lg transform rotate-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧦</span>
                <p className="text-black font-bold text-sm">
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

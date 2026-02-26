import { useState } from 'react';
import ImageWithSkeleton from './ImageWithSkeleton';

function Awards() {
  const [openTransport, setOpenTransport] = useState('car');

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

          {/* Awards Grid - Stacked on mobile, horizontal on desktop */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-4">
            {/* Award 1 - Traveler's Choice */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">Traveler's Choice</p>
              <p className="font-bold text-black text-sm">• 2021</p>
            </div>

            {/* Award 2 - JustDial 2022 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">JustDial Awards</p>
              <p className="font-bold text-black text-sm">• 2022</p>
            </div>

            {/* Main JustDial Card */}
            <div className="bg-white rounded-[25px] p-6 md:p-8 text-center w-full md:w-72 h-40 md:h-48 flex flex-col items-center justify-center border-2 border-[#00D4D4] shadow-lg">
              <p className="font-bold text-black text-sm mb-2">Waves</p>
              <div className="flex gap-1 mb-2">
                <span className="text-xl md:text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-xs text-gray-600 mb-2 md:mb-3">606 reviews</p>
              <div className="flex items-center gap-2">
                <ImageWithSkeleton
                  src="/jd.png" 
                  alt="JustDial" 
                  className="w-8 md:w-10 h-8 md:h-10 object-contain"
                />
                <p className="font-bold text-black text-base md:text-lg">JustDial</p>
              </div>
            </div>

            {/* Award 3 - JustDial 2023 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-6 md:p-8 text-center w-full md:w-48 h-40 md:h-48 flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl mb-2 md:mb-3">🏆</div>
              <p className="font-bold text-black text-sm">JustDial Awards</p>
              <p className="font-bold text-black text-sm">• 2023</p>
            </div>

            {/* Award 4 - Guinness World Record
            <div className="bg-[#00D4D4] rounded-[25px] p-8 text-center w-48 h-48 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">🏅</div>
              <p className="font-bold text-black text-xs">Guinness World</p>
              <p className="font-bold text-black text-xs">Record Holder</p>
              <p className="font-bold text-black text-xs">• 2022</p>
            </div> */}

            {/* Starfish Decoration - hidden on mobile */}
            <img 
              src="/icon-3.webp" 
              alt="Starfish decoration" 
              className="hidden md:block absolute -top-16 right-0 w-32 lg:w-48 h-32 lg:h-48 object-contain z-10"
            />
          </div>
        </div>

        {/* Transportation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left - Heading */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-4 md:mb-6">
              Cars, autos, or buses —<br />
              they all take you<br />
              to Waves
            </h2>

            {/* Pool Float Decoration - hidden on mobile */}
            <img 
              src="/icon-5.webp" 
              alt="Pool float decoration" 
              className="hidden lg:block absolute -bottom-20 -left-10 w-48 lg:w-64 h-48 lg:h-64 object-contain opacity-50"
            />
          </div>

          {/* Right - Transport Options */}
          <div className="space-y-3">
            {/* By Car */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('car')}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#461AA2] text-white font-bold text-base md:text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">🚗</span>
                    <span>By car</span>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    openTransport === 'car' ? 'rotate-180' : ''
                  }`}>
                    ▲
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTransport === 'car' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-[#461AA2] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Follow the directions to Waves</li>
                    <li>• Parking available near the entrance</li>
                    <li>• Get directions: <a href="https://www.google.com/maps/dir//The+Waves+Amusement+and+Water+Park+Seloo,+Maharashtra+442104/@20.8056463,78.6808138,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3bd48136c3370ae5:0x40c3fe4a79592727" className="underline text-white hover:opacity-80 transition-opacity">Google Maps →</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Auto */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('auto')}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#FF6B35] text-white font-bold text-base md:text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">🛺</span>
                    <span>By auto</span>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    openTransport === 'auto' ? 'rotate-180' : ''
                  }`}>
                    ▲
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTransport === 'auto' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-[#FF6B35] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Ask the driver to drop you at Waves</li>
                    <li>• Entry is near the main gate</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Bus */}
            <div className="overflow-hidden rounded-[20px] md:rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('bus')}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 bg-[#FF1493] text-white font-bold text-base md:text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl">🚌</span>
                    <span>By bus</span>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    openTransport === 'bus' ? 'rotate-180' : ''
                  }`}>
                    ▲
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTransport === 'bus' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-[#FF1493] text-white px-4 md:px-6 pb-4">
                  <ul className="space-y-2 text-xs md:text-sm">
                    <li>• Ask the local bus to stop at Waves</li>
                    <li>• Entry is a short walk from the road</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Decorative Bubbles - hidden on mobile */}
            <div className="hidden md:block absolute -top-20 -right-16">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-[#C5FA19] rounded-full opacity-80"></div>
                <div className="w-20 h-20 bg-[#C5FA19] rounded-full opacity-70 -mt-6"></div>
                <div className="w-12 h-12 bg-[#C5FA19] rounded-full opacity-90 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;

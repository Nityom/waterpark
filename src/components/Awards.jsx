import { useState } from 'react';

function Awards() {
  const [openTransport, setOpenTransport] = useState('car');

  const toggleTransport = (type) => {
    setOpenTransport(openTransport === type ? null : type);
  };

  return (
    <section className="bg-[#DDFBFF]  px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Awards Section */}
        <div className="mb-12">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold text-black leading-tight mb-3">
              Fun is so good, it's record<br />
              breaking and award winning
            </h2>
            <p className="text-base text-gray-700">
              Thousands of visitors, a few awards — we're the real deal.
            </p>
          </div>

          {/* Awards Grid */}
          <div className="relative flex items-center justify-center gap-4">
            {/* Award 1 - Traveler's Choice */}
            <div className="bg-[#00D4D4] rounded-[25px] p-8 text-center w-48 h-48 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">🏆</div>
              <p className="font-bold text-black text-sm">Traveler's Choice</p>
              <p className="font-bold text-black text-sm">• 2021</p>
            </div>

            {/* Award 2 - JustDial 2022 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-8 text-center w-48 h-48 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">🏆</div>
              <p className="font-bold text-black text-sm">JustDial Awards</p>
              <p className="font-bold text-black text-sm">• 2022</p>
            </div>

            {/* Main JustDial Card */}
            <div className="bg-white rounded-[25px] p-8 text-center w-72 h-48 flex flex-col items-center justify-center border-2 border-[#00D4D4] shadow-lg">
              <p className="font-bold text-black text-sm mb-2">Waves</p>
              <div className="flex gap-1 mb-2">
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">606 reviews</p>
              <div className="flex items-center gap-2">
                <img 
                  src="/jd.png" 
                  alt="JustDial" 
                  className="w-10 h-10 object-contain"
                />
                <p className="font-bold text-black text-lg">JustDial</p>
              </div>
            </div>

            {/* Award 3 - JustDial 2023 */}
            <div className="bg-[#00D4D4] rounded-[25px] p-8 text-center w-48 h-48 flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">🏆</div>
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

            {/* Starfish Decoration */}
            <img 
              src="/icon-3.webp" 
              alt="Starfish decoration" 
              className="absolute -top-16 right-0 w-48 h-48 object-contain z-10"
            />
          </div>
        </div>

        {/* Transportation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Heading */}
          <div className="relative">
            <h2 className="text-5xl font-extrabold text-black leading-tight mb-6">
              Cars, metro, or taxis —<br />
              they all take you<br />
              to Waves
            </h2>

            {/* Pool Float Decoration */}
            <img 
              src="/icon-5.webp" 
              alt="Pool float decoration" 
              className="absolute -bottom-20 -left-10 w-64 h-64 object-contain opacity-50"
            />
          </div>

          {/* Right - Transport Options */}
          <div className="space-y-3">
            {/* By Car */}
            <div className="overflow-hidden rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('car')}
                className="w-full text-left px-6 py-4 bg-[#461AA2] text-white font-bold text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚗</span>
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
                <div className="bg-[#461AA2] text-white px-6 pb-4">
                  <ul className="space-y-2 text-sm">
                    <li>• Hit the map link to get directions</li>
                    <li>• Park at The Beach JBR or nearby public parking areas</li>
                    <li>• Follow the JBR beach signs and look for the giant Waves letters!</li>
                  </ul>
                  <div className="flex gap-4 mt-4">
                    <a href="#" className="text-white underline text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                      Google Maps →
                    </a>
                    <a href="#" className="text-white underline text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                      Apple Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* By Public Transport */}
            <div className="overflow-hidden rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('transit')}
                className="w-full text-left px-6 py-4 bg-[#FF6B35] text-white font-bold text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚌</span>
                    <span>By public transport</span>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    openTransport === 'transit' ? 'rotate-180' : ''
                  }`}>
                    ▲
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTransport === 'transit' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-[#FF6B35] text-white px-6 pb-4">
                  <ul className="space-y-2 text-sm">
                    <li>• Take the Wardha Metro to DMCC or JBR stations</li>
                    <li>• Walk to The Beach JBR</li>
                    <li>• Follow the beach signs to Waves</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* By Taxi */}
            <div className="overflow-hidden rounded-[25px] transition-all duration-300">
              <button
                onClick={() => toggleTransport('taxi')}
                className="w-full text-left px-6 py-4 bg-[#FF1493] text-white font-bold text-lg hover:opacity-90 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚕</span>
                    <span>By taxi</span>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    openTransport === 'taxi' ? 'rotate-180' : ''
                  }`}>
                    ▲
                  </span>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openTransport === 'taxi' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="bg-[#FF1493] text-white px-6 pb-4">
                  <ul className="space-y-2 text-sm">
                    <li>• Tell your driver "The Beach JBR - Waves"</li>
                    <li>• Drop-off point at The Beach parking area</li>
                    <li>• Walk to the beach to reach Waves</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Decorative Bubbles */}
            <div className="absolute -top-20 -right-16 flex gap-4">
              <div className="w-16 h-16 bg-[#C5FA19] rounded-full opacity-80"></div>
              <div className="w-20 h-20 bg-[#C5FA19] rounded-full opacity-70 -mt-6"></div>
              <div className="w-12 h-12 bg-[#C5FA19] rounded-full opacity-90 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;

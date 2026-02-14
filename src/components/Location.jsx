import { useState } from 'react';

function Location() {
  const [activeSection, setActiveSection] = useState('easy-access');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section className="bg-[#DDFBFF] py-8 px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Content */}
          <div className="relative">
            {/* Main Heading */}
            <h2 className="text-4xl font-extrabold text-black leading-tight mb-4">
              Where adventure meets the beach
            </h2>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              At Waves Wardha, fun and convenience come together — right in the heart of JBR, surrounded by breathtaking sea views.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              {/* Prime Location */}
              <div 
                className="pb-4 cursor-pointer transition-all"
                onClick={() => toggleSection('prime-location')}
              >
                <h3 className="text-xl font-bold text-black mb-2">Prime location</h3>
                <div className="mt-4">
                  {activeSection === 'prime-location' ? (
                    <svg 
                      width="300" 
                      height="20" 
                      viewBox="0 0 300 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[300px] animate-wave"
                    >
                      <path 
                        d="M0 10 Q 15 0, 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 T 270 10 T 300 10" 
                        stroke="#461AA2" 
                        strokeWidth="6" 
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="w-full border-b border-gray-300"></div>
                  )}
                </div>
              </div>

              {/* Easy Access */}
              <div 
                className="pb-4 cursor-pointer transition-all"
                onClick={() => toggleSection('easy-access')}
              >
                <h3 className="text-xl font-bold text-black mb-2">Easy access</h3>
                {activeSection === 'easy-access' && (
                  <div className="animate-slide-down mb-2">
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      Reach us by boat* or swim straight from The Beach (just 15 meters) — adventure starts at the moment you hit the water.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      *boat service is 100 AED/ per person for a round trip
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  {activeSection === 'easy-access' ? (
                    <svg 
                      width="300" 
                      height="20" 
                      viewBox="0 0 300 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[300px] animate-wave"
                    >
                      <path 
                        d="M0 10 Q 15 0, 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 T 270 10 T 300 10" 
                        stroke="#461AA2" 
                        strokeWidth="6" 
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="w-full border-b border-gray-300"></div>
                  )}
                </div>
              </div>

              {/* All Day Fun */}
              <div 
                className="pb-4 cursor-pointer"
                onClick={() => toggleSection('all-day-fun')}
              >
                <h3 className="text-xl font-bold text-black mb-2">All day fun</h3>
                {activeSection === 'all-day-fun' && (
                  <div className="animate-slide-down mb-2">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Spend the entire day on the water with unlimited access to all attractions, slides, and play zones from opening to closing time.
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  {activeSection === 'all-day-fun' ? (
                    <svg 
                      width="300" 
                      height="20" 
                      viewBox="0 0 300 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full max-w-[300px] animate-wave"
                    >
                      <path 
                        d="M0 10 Q 15 0, 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 T 270 10 T 300 10" 
                        stroke="#461AA2" 
                        strokeWidth="6" 
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div className="w-full border-b border-gray-300"></div>
                  )}
                </div>
              </div>
            </div>

           
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-[30px] overflow-hidden shadow-2xl">
              <img 
                src="/hero-3.png" 
                alt="Kid jumping at water park" 
                className="w-full h-full object-cover min-h-[350px]"
              />
            </div>

            {/* Cyan Splash Decoration */}
            <img 
              src="/icon-4.webp" 
              alt="Fun splash decoration" 
              className="absolute -top-12 -right-6 w-40 h-40 object-contain z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;

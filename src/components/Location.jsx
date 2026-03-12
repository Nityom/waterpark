"use client";
import { useState } from 'react';
import Image from "next/image";

function Location() {
  const [activeSection, setActiveSection] = useState('easy-access');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section className="bg-[#DDFBFF] py-8 md:py-12 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left Content */}
          <div className="relative">
            {/* Main Heading */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight mb-3 md:mb-4">
              Where adventure meets convenience
            </h2>

            {/* Subtitle */}
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-5 md:mb-6">
              At The Waves Wardha, fun and convenience come together — strategically located on Nagpur-Wardha Highway with easy access from major cities.
            </p>

            {/* Features List */}
            <div className="space-y-4 md:space-y-6">
              {/* Prime Location */}
              <div
                className="pb-3 md:pb-4 cursor-pointer transition-all"
                onClick={() => toggleSection('prime-location')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black mb-2">Prime location</h3>
                {activeSection === 'prime-location' && (
                  <div className="animate-slide-down mb-2">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">
                      Located just 10 km from Wardha on the Nagpur-Wardha Highway, between Pawnar and Selu. Stone's throw distance from the Nagpur Mumbai Samruddhi Mahamarg.
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Easily accessible from Wardha, Nagpur, and surrounding areas — your perfect weekend getaway destination!
                    </p>
                  </div>
                )}
                <div className="mt-3 md:mt-4">
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
                className="pb-3 md:pb-4 cursor-pointer transition-all"
                onClick={() => toggleSection('easy-access')}
              >
                <h3 className="text-lg md:text-xl font-bold text-black mb-2">Easy access</h3>
                {activeSection === 'easy-access' && (
                  <div className="animate-slide-down mb-2">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">
                      Ample parking space available for your convenience. Well-connected by road with clear signage from the highway.
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Perfect for family trips, school picnics, and corporate outings with hassle-free entry and parking facilities.
                    </p>
                  </div>
                )}
                <div className="mt-3 md:mt-4">
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
                className="pb-3 md:pb-4 cursor-pointer"
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
            <div className="relative w-full min-h-[350px]">
              <Image
                src="/hero-3.jpg"
                alt="Kid jumping at water park"
                fill
                className="object-cover"
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


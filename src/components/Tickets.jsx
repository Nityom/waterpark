import { useState } from 'react';

function Tickets() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <section className="bg-[#461AA2] py-8 px-10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-3">
            Your ticket to adventure
          </h2>
          <p className="text-white text-base">
            Pick your pass and enjoy all-day access to Wardha's biggest splash adventure.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 justify-center mb-6">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all ${
              activeTab === 'single'
                ? 'bg-white text-[#461AA2]'
                : 'bg-[#5a2db3] text-white hover:bg-[#6835c4]'
            }`}
          >
            <span className="text-lg">👤</span>
            Single Ticket
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold transition-all ${
              activeTab === 'group'
                ? 'bg-white text-[#461AA2]'
                : 'bg-[#5a2db3] text-white hover:bg-[#6835c4]'
            }`}
          >
            <span className="text-lg">👥</span>
            Group Events
          </button>
        </div>

        {/* Ticket Card */}
        {activeTab === 'single' && (
          <div className="bg-white rounded-[30px] p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="relative rounded-[30px] overflow-hidden">
                <img 
                  src="/hero.png" 
                  alt="All day pass" 
                  className="w-full h-full object-cover min-h-[300px]"
                />
                {/* Pink Star Badge */}
                <div className="absolute top-6 left-6 bg-[#FF1493] text-white px-6 py-4 rounded-full transform -rotate-12 shadow-lg">
                  <div className="text-center font-bold">
                    <div className="text-2xl leading-tight">All day</div>
                    <div className="text-2xl leading-tight">pass</div>
                  </div>
                  {/* Star Points */}
               
                </div>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex flex-col justify-between">
              {/* Benefits List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#C5FA19] text-xl">✓</span>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Unlimited all-day access to the entire park
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5FA19] text-xl">✓</span>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Re-entry allowed throughout the same day
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5FA19] text-xl">✓</span>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Includes life jackets, socks, and waterproof phone case
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#C5FA19] text-xl">✓</span>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    Safety briefing
                  </p>
                </div>
              </div>

              {/* Price and CTA */}
              <div>
                <div className="text-5xl font-extrabold text-black mb-4">
                 499 rs
                </div>
                <button className="bg-[#461AA2] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#5a2db3] transition-all shadow-lg w-full lg:w-auto">
                  Buy You Daily Pass
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Guaranteed entry only when purchased on thewaves.co.in
                </p>
              </div>

              {/* Life Jacket Image Decoration */}
              <img 
                src="/icon-1.webp" 
                alt="Life jacket" 
                className="absolute bottom-6 right-6 w-42 h-42 object-contain"
              />
            </div>
          </div>
        )}

        {activeTab === 'group' && (
          <div className="bg-white rounded-[30px] p-8 shadow-2xl text-center">
            <h3 className="text-3xl font-bold text-[#461AA2] mb-3">
              Group Events & Packages
            </h3>
            <p className="text-gray-700 text-base mb-6">
              Perfect for birthday parties, corporate events, and special occasions!
            </p>
            <button className="bg-[#461AA2] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#5a2db3] transition-all shadow-lg">
              Contact Us for Group Bookings
            </button>
          </div>
        )}

        {/* Decorative Floating Elements */}
        <img 
          src="/icon-4.webp" 
          alt="Decoration" 
          className="absolute top-10 left-10 w-52 h-52 object-contain opacity-80"
        />
        {/* <img 
          src="/icon-5.webp" 
          alt="Decoration" 
          className="absolute bottom-16 right-10 w-32 h-32 object-contain opacity-80"
        /> */}
      </div>
    </section>
  );
}

export default Tickets;

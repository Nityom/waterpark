function AboutUs() {
  return (
    <section id="about-us" className="bg-gradient-to-b from-[#DDFBFF] to-[#C5FA19]/30 py-10 md:py-16 px-4 md:px-10 relative overflow-hidden">

      {/* Floating Decorative Icons */}
      <img src="/icon-1.webp" alt="" className="hidden md:block absolute top-32 left-16 w-20 h-20 animate-bounce z-20" style={{ animationDuration: '3s' }} />
      <img src="/icon-2.webp" alt="" className="hidden md:block absolute top-20 right-12 w-24 h-24 z-20" />
      <img src="/icon-3.webp" alt="" className="hidden md:block absolute top-[500px] left-8 w-20 h-20 animate-bounce z-20" style={{ animationDuration: '4s' }} />
      <img src="/icon-4.webp" alt="" className="hidden md:block absolute top-[600px] right-16 w-32 h-32 z-20" />
      <img src="/icon-5.webp" alt="" className="hidden md:block absolute bottom-96 left-24 w-28 h-28 z-20" />
      <img src="/icon-6.webp" alt="" className="hidden md:block absolute bottom-64 right-20 w-22 h-22 animate-bounce z-20" style={{ animationDuration: '5s' }} />
      <img src="/icon-7.webp" alt="" className="hidden md:block absolute bottom-32 left-40 w-24 h-24 z-20" />
      <img src="/icon-8.webp" alt="" className="hidden md:block absolute top-[800px] right-32 w-18 h-18 z-20" />
      <img src="/icon-9.webp" alt="" className="hidden md:block absolute bottom-48 right-48 w-20 h-20 z-20" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#461AA2] leading-tight mb-4">
            About Us
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#00D4D4]">
            The Waves Water Park: A Perfect Family Getaway!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">

          {/* Story Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[30px] p-6 md:p-8 shadow-xl border-4 border-[#461AA2]/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl md:text-4xl">🌊</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#461AA2]">Our Story</h3>
            </div>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed mb-4">
              The Waves is the brain child of <strong>Dr. Vipeen Raut</strong>, a renowned Orthopaedic surgeon from Wardha. He envisioned a recreation and relaxation zone for people around Wardha & Seloo and came up with The Waves, a Water Park and Amusement Park close to them.
            </p>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed">
              Situated just 10 kms from Wardha on Nagpur highway and stone's throw distance from the Nagpur Mumbai Samruddhi Mahamarg, it is easily accessible for people of Wardha as well as Nagpur.
            </p>
          </div>

          {/* Facilities Card */}
          <div className="bg-[#461AA2] rounded-[30px] p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl md:text-4xl">⭐</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white">What We Offer</h3>
            </div>
            <p className="text-sm md:text-base text-white leading-relaxed mb-6">
              The Waves is decked with Water Park, Amusement Park, Food Court, Conference Room and a large open lawn. It is an ideal destination for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#C5FA19] rounded-xl p-3 text-center">
                <span className="text-2xl">🎉</span>
                <p className="text-sm font-bold text-[#461AA2] mt-1">Parties</p>
              </div>
              <div className="bg-[#00D4D4] rounded-xl p-3 text-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <p className="text-sm font-bold text-black mt-1">Family Get-togethers</p>
              </div>
              <div className="bg-[#FF6B35] rounded-xl p-3 text-center">
                <span className="text-2xl">🎂</span>
                <p className="text-sm font-bold text-white mt-1">Birthdays</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center">
                <span className="text-2xl">💼</span>
                <p className="text-sm font-bold text-[#461AA2] mt-1">Corporate Events</p>
              </div>
              <div className="bg-[#C5FA19] rounded-xl p-3 text-center">
                <span className="text-2xl">📸</span>
                <p className="text-sm font-bold text-[#461AA2] mt-1">Pre-Wedding Shoots</p>
              </div>
              <div className="bg-[#00D4D4] rounded-xl p-3 text-center">
                <span className="text-2xl">🚌</span>
                <p className="text-sm font-bold text-black mt-1">School Picnics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-gradient-to-r from-[#00D4D4] to-[#461AA2] rounded-[30px] p-6 md:p-8 shadow-2xl mb-6 md:mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 text-center">
            🎢 The Ultimate Water Adventure!
          </h3>
          <p className="text-sm md:text-base text-white leading-relaxed text-center max-w-4xl mx-auto mb-4">
            Dive into excitement and make a splash at The Waves Water Park in Wardha! This hidden gem is an absolute blast for families looking for a fun-filled day surrounded by water. With its newer and exhilarating slides, you're in for an adventure like no other. From twists and turns to heart-pounding drops, the adrenaline rush will leave you craving for more!
          </p>
          <p className="text-sm md:text-base text-white leading-relaxed text-center max-w-4xl mx-auto">
            The Waves is a hub of ultimate entertainment, suitable for people of all age groups.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">

          {/* Parking Card */}
          <div className="bg-[#C5FA19] rounded-[25px] p-4 md:p-6 shadow-lg">
            <div className="text-3xl md:text-4xl mb-3 text-center">🚗</div>
            <h4 className="text-lg md:text-xl font-bold text-[#461AA2] mb-2 text-center">Ample Parking</h4>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              Worried about parking? Fret not! The Waves offers ample parking space, ensuring a hassle-free arrival. Your vehicle is safe and secure!
            </p>
          </div>

          {/* Food Card */}
          <div className="bg-[#FF6B35] rounded-[25px] p-4 md:p-6 shadow-lg">
            <div className="text-3xl md:text-4xl mb-3 text-center">🍕</div>
            <h4 className="text-lg md:text-xl font-bold text-white mb-2 text-center">Delicious Food</h4>
            <p className="text-sm text-white leading-relaxed text-center">
              Treat yourself to mouthwatering burgers, cheesy pizzas, and refreshing ice creams that will tickle your taste buds and keep you energized!
            </p>
          </div>

          {/* Family Card */}
          <div className="bg-[#00D4D4] rounded-[25px] p-4 md:p-6 shadow-lg">
            <div className="text-3xl md:text-4xl mb-3 text-center">🌳</div>
            <h4 className="text-lg md:text-xl font-bold text-[#461AA2] mb-2 text-center">Perfect Picnic Spots</h4>
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              Spacious seating areas and perfectly maintained picnic spots surrounded by the beauty of nature. Perfect for family bonding!
            </p>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="bg-[#461AA2] rounded-[30px] p-6 md:p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,250,25,0.2),transparent_50%)]"></div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 relative z-10">
            Ready for an Unforgettable Adventure?
          </h3>
          <p className="text-lg md:text-xl text-[#C5FA19] font-bold mb-4 md:mb-6 relative z-10">
            📞 For Booking: +91 9699755795 / +91 9270175795<br />
            <span className="text-sm font-normal">Secondary: (+91) 89561185 71 / 72</span>
          </p>
          <p className="text-white text-base md:text-lg mb-4 md:mb-6 relative z-10 italic">
            "Life is more fun if you come to the water park"
          </p>
          <button className="bg-[#C5FA19] text-[#461AA2] px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:scale-105 hover:bg-white transition-all duration-300 relative z-10">
            Book Your Visit Now
          </button>
        </div>

        {/* Closing Statement */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-lg md:text-2xl font-bold text-[#461AA2] leading-relaxed">
            Pack your swimsuits, gather your loved ones, and embark on an unforgettable adventure at The Waves Water Park! 🌊✨
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;

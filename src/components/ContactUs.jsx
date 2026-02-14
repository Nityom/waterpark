function ContactUs() {
  return (
    <section className="bg-gradient-to-b from-[#DDFBFF] via-[#C5FA19]/20 to-[#DDFBFF] py-16 px-10 relative overflow-hidden">
      
      {/* Floating Decorative Icons */}
      <img src="/icon-1.webp" alt="" className="absolute top-20 left-10 w-24 h-24 animate-bounce z-20" style={{animationDuration: '3s'}} />
      <img src="/icon-2.webp" alt="" className="absolute top-40 right-20 w-28 h-28 animate-bounce z-20" style={{animationDuration: '4s'}} />
      <img src="/icon-3.webp" alt="" className="absolute bottom-40 left-32 w-20 h-20 z-20" />
      <img src="/icon-5.webp" alt="" className="absolute top-60 right-40 w-32 h-32 z-20" />
      <img src="/icon-6.webp" alt="" className="absolute bottom-32 right-24 w-24 h-24 animate-bounce z-20" style={{animationDuration: '5s'}} />
      {/* <img src="/icon-7.webp" alt="" className="absolute top-80 left-48 w-20 h-20 z-20" /> */}

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#461AA2] leading-tight mb-4">
            Contact Us
          </h2>
          <p className="text-xl font-semibold text-[#00D4D4]">
            Get in touch with us - We'd love to hear from you!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Contact Information Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-[30px] p-10 shadow-2xl border-4 border-[#00D4D4]/30 relative">
            
            {/* Small floating icons in card */}
            <img src="/icon-8.webp" alt="" className="absolute -top-6 -right-6 w-20 h-20" />
            <img src="/icon-9.webp" alt="" className="absolute -bottom-4 -left-4 w-16 h-16" />
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">📞</span>
              <h3 className="text-3xl font-extrabold text-[#461AA2]">Get In Touch</h3>
            </div>

            {/* Phone */}
            <div className="bg-[#C5FA19] rounded-2xl p-6 mb-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📱</span>
                <h4 className="text-xl font-bold text-[#461AA2]">Call Us</h4>
              </div>
              <p className="text-lg font-semibold text-gray-800 ml-11">
                (+91) 89561185 71 / 72 / 73 / 74 / 76
              </p>
            </div>

            {/* Email */}
            <div className="bg-[#00D4D4] rounded-2xl p-6 mb-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">✉️</span>
                <h4 className="text-xl font-bold text-white">Email Us</h4>
              </div>
              <p className="text-lg font-semibold text-white ml-11">
                customercare@thewaves.co.in
              </p>
            </div>

            {/* Address */}
            <div className="bg-[#461AA2] rounded-2xl p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">📍</span>
                <h4 className="text-xl font-bold text-white">Visit Us</h4>
              </div>
              <p className="text-lg font-semibold text-white ml-11">
                Nagpur Wardha Highway Between Pawnar and Selu, Wardha - 442104
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#461AA2] to-[#2B0F6B] rounded-[30px] p-10 shadow-2xl relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,250,25,0.2),transparent_60%)]"></div>
            
            {/* Small floating icons in form */}
            {/* <img src="/icon-4.webp" alt="" className="absolute top-4 right-4 w-24 h-24" /> */}
            <img src="/icon-10.webp" alt="" className="absolute bottom-8 left-8 w-20 h-20" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">💬</span>
                <h3 className="text-3xl font-extrabold text-white">Send Message</h3>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-white font-semibold mb-2 block">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#C5FA19] text-[#461AA2] px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:scale-105 hover:bg-white transition-all duration-300"
                >
                  Send Message 🚀
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Opening Hours Section */}
        <div className="bg-white/90 rounded-[30px] p-10 shadow-2xl mb-12 relative overflow-hidden">
          
          {/* Decorative icons */}
          <img src="/icon-11.webp" alt="" className="absolute top-0 right-0 w-28 h-28" />
          <img src="/icon-12.webp" alt="" className="absolute bottom-0 left-0 w-24 h-24" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-extrabold text-[#461AA2] mb-2">⏰ Opening Hours</h3>
              <p className="text-gray-600">Plan your visit accordingly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#C5FA19] rounded-2xl p-6 text-center">
                <p className="text-lg font-bold text-[#461AA2] mb-2">Regular Hours</p>
                <p className="text-2xl font-extrabold text-[#461AA2]">9:00 AM - 6:30 PM</p>
                <p className="text-sm text-gray-700 mt-2">7 days a week</p>
              </div>

              <div className="bg-[#FF6B35] rounded-2xl p-6 text-center">
                <p className="text-lg font-bold text-white mb-2">Summer Break</p>
                <p className="text-2xl font-extrabold text-white">12:00 PM - 3:00 PM</p>
                <p className="text-sm text-white/90 mt-2">Closed due to heat</p>
              </div>

              <div className="bg-[#00D4D4] rounded-2xl p-6 text-center">
                <p className="text-lg font-bold text-[#461AA2] mb-2">Booking</p>
                <p className="text-xl font-extrabold text-[#461AA2]">Available Daily</p>
                <p className="text-sm text-gray-700 mt-2">Call to reserve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map / Directions CTA */}
        <div className="bg-gradient-to-r from-[#461AA2] to-[#00D4D4] rounded-[30px] p-12 shadow-2xl text-center relative overflow-hidden">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(197,250,25,0.1),transparent_70%)]"></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-extrabold text-white mb-4">
              🗺️ Find Your Way to Fun!
            </h3>
            <p className="text-xl text-white/90 mb-6">
              Located on Nagpur-Wardha Highway, close to Nagpur Mumbai Samruddhi Mahamarg
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-[#C5FA19] text-[#461AA2] px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 hover:bg-white transition-all duration-300">
                Get Directions 📍
              </button>
              <button className="border-2 border-white text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-[#461AA2] hover:scale-105 transition-all duration-300">
                Book Your Visit 🎟️
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactUs;

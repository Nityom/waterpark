import { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Message:* ${formData.message}`;

    // WhatsApp number
    const phoneNumber = '919699755795';

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <section className="bg-gradient-to-b from-[#DDFBFF] via-[#C5FA19]/20 to-[#DDFBFF] py-10 md:py-16 px-4 md:px-10 relative overflow-hidden">

      {/* Floating Decorative Icons */}
      <img src="/icon-1.webp" alt="" className="hidden md:block absolute top-20 left-10 w-24 h-24 animate-bounce z-20" style={{ animationDuration: '3s' }} />
      <img src="/icon-2.webp" alt="" className="hidden md:block absolute top-40 right-20 w-28 h-28 animate-bounce z-20" style={{ animationDuration: '4s' }} />
      <img src="/icon-3.webp" alt="" className="hidden md:block absolute bottom-40 left-32 w-20 h-20 z-20" />
      <img src="/icon-5.webp" alt="" className="hidden md:block absolute top-60 right-40 w-32 h-32 z-20" />
      <img src="/icon-6.webp" alt="" className="hidden md:block absolute bottom-32 right-24 w-24 h-24 animate-bounce z-20" style={{ animationDuration: '5s' }} />
      {/* <img src="/icon-7.webp" alt="" className="absolute top-80 left-48 w-20 h-20 z-20" /> */}

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#461AA2] leading-tight mb-4">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl font-semibold text-[#00D4D4]">
            Get in touch with us - We'd love to hear from you!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">

          {/* Contact Information Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-[30px] p-6 md:p-10 shadow-2xl border-4 border-[#00D4D4]/30 relative">

            {/* Small floating icons in card */}
            <img src="/icon-8.webp" alt="" className="hidden md:block absolute -top-6 -right-6 w-20 h-20" />
            <img src="/icon-9.webp" alt="" className="hidden md:block absolute -bottom-4 -left-4 w-16 h-16" />

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl md:text-4xl">📞</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#461AA2]">Get In Touch</h3>
            </div>

            {/* Phone */}
            <div className="bg-[#C5FA19] rounded-2xl p-4 md:p-6 mb-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl">📱</span>
                <h4 className="text-lg md:text-xl font-bold text-[#461AA2]">Call Us</h4>
              </div>
              <div className="ml-0 md:ml-11">
                <p className="text-base md:text-lg font-bold text-gray-800">
                  +91 9699755795<br className="hidden md:block" /> / +91 9270175795
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-700 mt-1">
                  Alt: (+91) 89561185 71 / 72
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#00D4D4] rounded-2xl p-4 md:p-6 mb-4 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl">✉️</span>
                <h4 className="text-lg md:text-xl font-bold text-white">Email Us</h4>
              </div>
              <p className="text-sm md:text-lg font-semibold text-white ml-0 md:ml-11 break-all">
                customercare@thewaves.co.in
              </p>
            </div>

            {/* Address */}
            <div className="bg-[#461AA2] rounded-2xl p-4 md:p-6 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl md:text-3xl">📍</span>
                <h4 className="text-lg md:text-xl font-bold text-white">Visit Us</h4>
              </div>
              <p className="text-sm md:text-lg font-semibold text-white ml-0 md:ml-11">
                Nagpur Wardha Highway Between Pawnar and Selu, Wardha - 442104
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#461AA2] to-[#2B0F6B] rounded-[30px] p-6 md:p-10 shadow-2xl relative overflow-hidden">

            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(197,250,25,0.2),transparent_60%)]"></div>

            {/* Small floating icons in form */}
            {/* <img src="/icon-4.webp" alt="" className="absolute top-4 right-4 w-24 h-24" /> */}
            <img src="/icon-10.webp" alt="" className="hidden md:block absolute bottom-8 left-8 w-20 h-20" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl md:text-4xl">💬</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">Send Message</h3>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-white font-semibold mb-2 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors text-white placeholder:text-white/60"
                    required
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#C5FA19] focus:outline-none focus:border-[#00D4D4] transition-colors resize-none text-white placeholder:text-white/60"
                    required
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
        <div className="bg-white/90 rounded-[30px] p-6 md:p-10 shadow-2xl mb-8 md:mb-12 relative overflow-hidden">

          {/* Decorative icons */}
          <img src="/icon-11.webp" alt="" className="hidden md:block absolute top-0 right-0 w-28 h-28" />
          <img src="/icon-12.webp" alt="" className="hidden md:block absolute bottom-0 left-0 w-24 h-24" />

          <div className="relative z-10">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#461AA2] mb-2">⏰ Opening Hours</h3>
              <p className="text-gray-600">Plan your visit accordingly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-[#C5FA19] rounded-2xl p-4 md:p-6 text-center">
                <p className="text-base md:text-lg font-bold text-[#461AA2] mb-2">Regular Hours</p>
                <p className="text-xl md:text-2xl font-extrabold text-[#461AA2]">10:00 AM - 5:00 PM</p>
                <p className="text-xs md:text-sm text-gray-700 mt-2">7 days a week</p>
              </div>

              <div className="bg-[#FF6B35] rounded-2xl p-4 md:p-6 text-center">
                <p className="text-base md:text-lg font-bold text-white mb-2">Summer Break</p>
                <p className="text-xl md:text-2xl font-extrabold text-white">12:00 PM - 3:00 PM</p>
                <p className="text-xs md:text-sm text-white/90 mt-2">Closed due to heat</p>
              </div>

              <div className="bg-[#00D4D4] rounded-2xl p-4 md:p-6 text-center">
                <p className="text-base md:text-lg font-bold text-[#461AA2] mb-2">Booking</p>
                <p className="text-lg md:text-xl font-extrabold text-[#461AA2]">Available Daily</p>
                <p className="text-xs md:text-sm text-gray-700 mt-2">Call to reserve</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="bg-white rounded-[30px] p-4 md:p-6 shadow-2xl mb-8 md:mb-12 relative overflow-hidden">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#461AA2] mb-2">
              🗺️ Find Your Way to Fun!
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Located on Nagpur-Wardha Highway, close to Nagpur Mumbai Samruddhi Mahamarg
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="relative w-full h-[300px] md:h-[450px] rounded-[20px] overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2!2d78.6808138!3d20.8056463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd48136c3370ae5%3A0x40c3fe4a79592727!2sThe%20Waves%20Amusement%20and%20Water%20Park!5e0!3m2!1sen!2sin!4v1708704000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The Waves Water Park Location"
            ></iframe>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-4 md:mt-6">
            <a
              href="https://www.google.com/maps/place/The+Waves+Amusement+and+Water+Park/@20.8056463,78.6782389,814m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bd48136c3370ae5:0x40c3fe4a79592727!8m2!3d20.8056463!4d78.6808138!16s%2Fg%2F11t_mn13ph"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C5FA19] text-[#461AA2] px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold shadow-lg hover:scale-105 hover:bg-[#461AA2] hover:text-white transition-all duration-300 text-center no-underline"
            >
              Get Directions 📍
            </a>
            <a
              href="#tickets"
              className="bg-[#461AA2] text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-sm md:text-base font-bold shadow-lg hover:scale-105 hover:bg-[#00D4D4] transition-all duration-300 text-center no-underline"
            >
              Book Your Visit 🎟️
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactUs;

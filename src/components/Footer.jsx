import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#461AA2] py-10 md:py-14 lg:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section with Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-10 mb-10 md:mb-16 relative z-10">
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Contact info</h3>
            <div className="space-y-2 text-white text-xs md:text-sm">
              <p>customercare@thewaves.co.in</p>
              <p>📞Call: +91 9699755795 / +91 9270175795</p>
              <p>Secondary: (+91) 89561185 71 / 72</p>
              <p className="leading-relaxed">
                📍Nagpur Wardha Highway Between Pawnar and Selu, Wardha - 442104
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Navigation</h3>
            <div className="space-y-2 text-white text-xs md:text-sm">
              <p><Link to="/about-us" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About Us</Link></p>
              <p><Link to="/contact-us" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact Us</Link></p>
              <p><a href="#group-events" className="hover:text-[#C5FA19] transition-colors">Group Events</a></p>
              <p><a href="#faq" className="hover:text-[#C5FA19] transition-colors">FAQ</a></p>
            </div>
          </div>

          {/* Policies */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Our Policies</h3>
            <div className="space-y-2 text-white text-xs md:text-sm">
              <p><Link to="/privacy-policy" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Privacy Policy</Link></p>
              <p><Link to="/terms-and-conditions" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Terms & Conditions</Link></p>
              <p><Link to="/refund-and-cancellation" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Refund & Cancellation</Link></p>
              <p><Link to="/shipping-and-delivery" className="hover:text-[#C5FA19] transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Shipping & Delivery</Link></p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-base md:text-lg font-bold mb-3 md:mb-4">Social media</h3>
            <div className="space-y-2 text-white text-xs md:text-sm">
              <p><a href="https://www.instagram.com/thewaveswaterpark/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5FA19] transition-colors">Instagram</a></p>
              <p><a href="https://wa.me/919699755795" target="_blank" rel="noopener noreferrer" className="hover:text-[#C5FA19] transition-colors">Whatsapp</a></p>
            </div>
          </div>
        </div>


        {/* Large Waves Logo Text */}
        <div className="relative">
          <h2 className="text-7xl sm:text-8xl md:text-[180px] lg:text-[220px] xl:text-[280px] font-extrabold text-white leading-none tracking-tight opacity-90 text-center">
            Waves

          </h2>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/20 mt-6 md:mt-8 pt-4 md:pt-6 text-center text-white text-xs md:text-sm opacity-70">
          <p>© 2026 Waves Wardha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

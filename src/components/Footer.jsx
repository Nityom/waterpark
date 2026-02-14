import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#461AA2] py-16 px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section with Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact info</h3>
            <div className="space-y-2 text-white text-sm">
              <p>customercare@thewaves.co.in</p>
              <p>📞Call: (+91) 89561185 71 / 72 / 73 / 74 / 76</p>
              <p className="leading-relaxed">
                📍Nagpur Wardha Highway Between Pawnar and Selu, Wardha - 442104
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <h3 className="text-white text-lg font-bold mb-4">Navigation</h3>
            <div className="space-y-2 text-white text-sm">
              <p><Link to="/about-us" className="hover:text-[#C5FA19] transition-colors">About Us</Link></p>
              <p><Link to="/contact-us" className="hover:text-[#C5FA19] transition-colors">Contact Us</Link></p>
              <p><a href="#group-events" className="hover:text-[#C5FA19] transition-colors">Group Events</a></p>
              <p><a href="#faq" className="hover:text-[#C5FA19] transition-colors">FAQ</a></p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-right">
            <h3 className="text-white text-lg font-bold mb-4">Social media</h3>
            <div className="space-y-2 text-white text-sm">
              <p><a href="https://www.instagram.com/thewaveswaterpark/" className="hover:text-[#C5FA19] transition-colors">Instagram</a></p>
              <p><a href="#" className="hover:text-[#C5FA19] transition-colors">Whatsapp</a></p>
            </div>
          </div>
        </div>


        {/* Large Waves Logo Text */}
        <div className="relative">
          <h2 className="text-[180px] md:text-[220px] lg:text-[280px] font-extrabold text-white leading-none tracking-tight opacity-90 text-center">
            Waves
         
          </h2>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white text-sm opacity-70">
          <p>© 2026 Waves Wardha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

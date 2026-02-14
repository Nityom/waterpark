import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
{showBanner && (
  <div className="bg-[#C5FA19] text-black py-3 md:py-5 px-4 md:px-10 flex items-center justify-between relative">
    <span className="text-xs md:text-sm font-bold">
      Open till 6:30 pm
    </span>

    {/* Close Button */}
    <button 
      className="bg-transparent border-none text-xl md:text-2xl text-black cursor-pointer p-0 w-[25px] h-[25px] md:w-[30px] md:h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity"
      onClick={() => setShowBanner(false)}
    >
      ✕
    </button>
  </div>
)}

      {/* Main Navbar */}
      <nav className="bg-[#461AA2] py-4 md:py-5 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img src="/logo.png" alt="Waves Logo" className="h-12 md:h-16 lg:h-20" />
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex gap-10 flex-1 justify-center">
            <Link to="/" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link to="/about-us" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              About Us
            </Link>
            <Link to="/contact-us" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              Contact Us
            </Link>
          </div>

          {/* Buy Tickets Button */}
          <button className="bg-white text-[#461AA2] border-none py-2 md:py-3 px-5 md:px-7 rounded-[25px] text-sm md:text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all mr-12 md:mr-0">
            Buy Tickets
          </button>

          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            className="md:hidden flex flex-col gap-1.5 z-50 p-2 absolute right-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-[#461AA2] z-40 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link 
              to="/" 
              className="text-white no-underline text-2xl font-medium hover:text-[#C5FA19] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about-us" 
              className="text-white no-underline text-2xl font-medium hover:text-[#C5FA19] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              className="text-white no-underline text-2xl font-medium hover:text-[#C5FA19] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

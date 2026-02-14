import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {/* Top Banner */}
{showBanner && (
  <div className="bg-[#C5FA19] text-black py-5 px-10 flex items-center justify-between relative">
    <span className="text-sm font-bold">
      Open till 6:30 pm
    </span>

    {/* Close Button */}
    <button 
      className="bg-transparent border-none text-2xl text-black cursor-pointer p-0 w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity"
      onClick={() => setShowBanner(false)}
    >
      ✕
    </button>
  </div>
)}

      {/* Main Navbar */}
      <nav className="bg-[#461AA2] py-5 px-10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Waves Logo" className="h-20" />
          </Link>

          {/* Nav Links */}
          <div className="flex gap-10 flex-1 justify-center">
            <Link to="/" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link to="/about-us" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              About Us
            </Link>
            <Link to="/contact-us" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              Contact Us
            </Link>
            {/* <a href="#group-events" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              Group Events
            </a> */}
            {/* <a href="#faq" className="text-white no-underline text-base font-medium hover:opacity-80 transition-opacity">
              FAQ
            </a> */}
          </div>

          {/* Buy Tickets Button */}
          <button className="bg-white text-[#461AA2] border-none py-3 px-7 rounded-[25px] text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-all">
            Buy Tickets
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

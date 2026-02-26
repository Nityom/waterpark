import ImageWithSkeleton from './ImageWithSkeleton';

function Info() {
  return (
    <section className="bg-[#DDFBFF] py-8 md:py-12 lg:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-black leading-tight mb-2 md:mb-3">
            Make the most of your day out
          </h2>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            Everything you need to know before jumping in.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          
          {/* Opening Hours Card */}
          <div className="bg-[#C5FA19] rounded-[20px] md:rounded-[25px] p-4 md:p-5 min-h-[160px] md:min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="text-xl md:text-2xl">⏰</span>
              <h3 className="text-base md:text-lg font-bold text-black">
                Opening hours
              </h3>
            </div>
            <div className="text-black text-[10px] md:text-xs leading-relaxed space-y-1.5 md:space-y-2">
              <p className="font-semibold">Water Park</p>
              <p>Monday - Sunday: 10AM - 2PM</p>
              <p className="font-semibold mt-2 md:mt-3">Adventure Park</p>
              <p>Monday - Sunday: 2PM - 5PM</p>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-[#461AA2] rounded-[20px] md:rounded-[25px] p-4 md:p-5 min-h-[160px] md:min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="text-xl md:text-2xl">🎫</span>
              <h3 className="text-base md:text-lg font-bold text-white">
                Requirements
              </h3>
            </div>
            <div className="text-white text-[10px] md:text-xs leading-relaxed space-y-1 md:space-y-1.5">
              <p>• Age: 6 months to 100+ years</p>
              <p>• Height: Minimum 4 ft</p>
              <p>• Kids 6-12 need adult supervision</p>
              <p>• Valid ID required for entry</p>
              <p>• Pre-booking recommended</p>
            </div>
          </div>

          {/* Amenities Card */}
          <div className="bg-[#00D4D4] rounded-[20px] md:rounded-[25px] p-4 md:p-5 min-h-[160px] md:min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="text-xl md:text-2xl">📶</span>
              <h3 className="text-base md:text-lg font-bold text-black">
                Amenities
              </h3>
            </div>
            <div className="text-black text-[10px] md:text-xs leading-relaxed space-y-1 md:space-y-1.5">
              <p>• Clean restrooms & changing rooms</p>
              <p>• Shaded seating & relaxation zones</p>
              <p>• Secure lockers available</p>
              <p>• Food court with variety of meals</p>
              <p>• Green room / feeding room</p>
              <p>• Ample parking space</p>
              <p>• First aid station on-site</p>
            </div>
          </div>

          {/* Safety & Rules Card */}
          <div className="bg-[#FF6B35] rounded-[20px] md:rounded-[25px] p-4 md:p-5 min-h-[160px] md:min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="text-xl md:text-2xl">📢</span>
              <h3 className="text-base md:text-lg font-bold text-white">
                Safety & Rules
              </h3>
            </div>
            <div className="text-white text-[10px] md:text-xs leading-relaxed space-y-1 md:space-y-1.5">
              <p>• Trained lifeguards on duty</p>
              <p>• Life jackets provided (mandatory)</p>
              <p>• Safety briefing before entry</p>
              <p>• No outside food/drinks allowed</p>
              <p>• Follow lifeguard instructions</p>
              <p>• No sharp objects or jewelry</p>
            </div>
          </div>
        </div>

       
      
{/* Large Map Section */}
<div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl">

  {/* Background Image - Responsive */}
  <ImageWithSkeleton
    src="/hero-4.jpg"
    alt="Aerial view of water park"
    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover"
  />

  {/* Pink Blob Overlay */}
  <div className="absolute top-0 left-0 w-[55%] sm:w-[50%] md:w-[45%] h-full">
    <div className="relative w-full h-full">

      {/* Bigger Pink Shape */}
      <div
        className="absolute inset-0 bg-[#FF1493]"
        style={{
          clipPath: "ellipse(75% 60% at 30% 50%)",
        }}
      ></div>

      {/* Text - Responsive */}
      <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-10">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
          Unleash the Splash <br /> at the Ultimate Water Destination, Where Every Slide, Wave, and Drop Is Designed for Non-Stop Thrill and Family Fun.
        </h3>
      </div>
    </div>
  </div>

  {/* Decorative Elements - Responsive */}
  <img
    src="/icon-4.webp"
    alt="Life jacket"
    className="absolute bottom-0 left-0 w-24 sm:w-32 md:w-40 lg:w-50 h-24 sm:h-32 md:h-40 lg:h-50 object-contain z-20"
  />

  <img
    src="/icon-5.webp"
    alt="Unicorn float"
    className="hidden sm:block absolute top-0 right-0 w-20 sm:w-24 md:w-28 lg:w-36 h-20 sm:h-24 md:h-28 lg:h-36 object-contain z-20"
  />
</div>


      </div>
    </section>
  );
}

export default Info;

function Info() {
  return (
    <section className="bg-[#DDFBFF] py-8 px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-black leading-tight mb-3">
            Make the most of your day out
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Everything you need to know before jumping in.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          {/* Opening Hours Card */}
          <div className="bg-[#C5FA19] rounded-[25px] p-5 min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⏰</span>
              <h3 className="text-lg font-bold text-black">
                Opening hours
              </h3>
            </div>
            <div className="text-black text-xs leading-relaxed space-y-2">
              <p className="font-semibold">Water Park</p>
              <p>Monday - Sunday: 10AM - 2PM</p>
              <p className="font-semibold mt-3">Adventure Park</p>
              <p>Monday - Sunday: 2PM - 5PM</p>
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-[#461AA2] rounded-[25px] p-5 min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎫</span>
              <h3 className="text-lg font-bold text-white">
                Requirements
              </h3>
            </div>
            <p className="text-white text-xs leading-relaxed">
              Kids must be at least 6 years old and 115 cm tall. Ages 6-12 must
              be with an adult.
            </p>
          </div>

          {/* Amenities Card */}
          <div className="bg-[#00D4D4] rounded-[25px] p-5 min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📶</span>
              <h3 className="text-lg font-bold text-black">
                Amenities
              </h3>
            </div>
            <p className="text-black text-xs leading-relaxed">
              Restrooms available, free Wi-Fi provided
            </p>
          </div>

          {/* Safety & Rules Card */}
          <div className="bg-[#FF6B35] rounded-[25px] p-5 min-h-[180px] flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📢</span>
              <h3 className="text-lg font-bold text-white">
                Safety & Rules
              </h3>
            </div>
            <p className="text-white text-xs leading-relaxed">
              Supervised by trained lifeguards and equipped with life jackets for
              all ages.
            </p>
          </div>
        </div>

       
      
{/* Large Map Section */}
<div className="relative rounded-[30px] overflow-hidden shadow-2xl">

  {/* Background Image Height Increased More */}
  <img
    src="/hero-4.png"
    alt="Aerial view of water park"
    className="w-[1400px] h-[650px] object-cover"
  />

  {/* Pink Blob Overlay */}
  <div className="absolute top-0 left-0 w-[45%] h-full">
    <div className="relative w-full h-full">

      {/* Bigger Pink Shape */}
      <div
        className="absolute inset-0 bg-[#FF1493]"
        style={{
          clipPath: "ellipse(75% 60% at 30% 50%)",
        }}
      ></div>

      {/* Text Bigger */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10">
        <h3 className="text-4xl font-extrabold text-white leading-tight">
          Largest <br />
          inflatable park <br />
          in the world
        </h3>
      </div>
    </div>
  </div>

  {/* Decorative Elements Bigger */}
  <img
    src="/icon-4.webp"
    alt="Life jacket"
    className="absolute bottom-0 left-0 w-50 h-50 object-contain z-20"
  />

  <img
    src="/icon-5.webp"
    alt="Unicorn float"
    className="absolute top-0 right-0 w-36 h-36 object-contain z-20"
  />
</div>


      </div>
    </section>
  );
}

export default Info;

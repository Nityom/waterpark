function Facilities() {
  const facilities = [
    {
      name: "Water Slide",
      image: "/hero.png",
      color: "bg-[#00D4D4]"
    },
    {
      name: "Amusement Park",
      image: "/hero-3.png",
      color: "bg-[#461AA2]"
    },
    {
      name: "Family Pool",
      image: "/test-3.png",
      color: "bg-[#C5FA19]"
    },
    {
      name: "Rain Dance",
      image: "/rain_dance.png",
      color: "bg-[#FF6B35]"
    },
    {
      name: "School Picnic",
      image: "/picnic.png",
      color: "bg-[#00D4D4]"
    },
    {
      name: "Destination Wedding",
      image: "/wedding.png",
      color: "bg-[#461AA2]"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-[#DDFBFF]/50 to-white py-10 md:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header with Image Background */}
        <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden mb-8 md:mb-12 shadow-2xl">
          <img
            src="/hero.png"
            alt="Water Park"
            className="w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover"
          />
          
          {/* Overlay with Title */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#461AA2]/90 via-[#461AA2]/70 to-transparent flex flex-col justify-center px-6 md:px-12">
            <h3 className="text-base md:text-2xl lg:text-3xl font-bold text-[#C5FA19] mb-1 md:mb-2">
              The Waves - Amusement & Water Park
            </h3>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Facilities
            </h2>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group rounded-[20px] md:rounded-[30px] overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-[280px] md:h-[350px] overflow-hidden">
                {/* Image */}
                <img 
                  src={facility.image} 
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Text Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className={`${facility.color} rounded-[15px] md:rounded-[20px] px-4 md:px-6 py-3 md:py-4 text-center backdrop-blur-sm`}>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-extrabold ${
                      facility.color === 'bg-[#C5FA19]' ? 'text-[#461AA2]' : 'text-white'
                    }`}>
                      {facility.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Facilities;

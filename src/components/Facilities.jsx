import ImageWithSkeleton from './ImageWithSkeleton';

function Facilities() {
  const facilities = [
    {
      name: "Water Slide",
      image: "/hero.jpg",
      color: "bg-[#00D4D4]"
    },
    {
      name: "Amusement Park",
      image: "/hero-3.jpg",
      color: "bg-[#461AA2]"
    },
    {
      name: "Family Pool",
      image: "/test-3.jpg",
      color: "bg-[#C5FA19]"
    },
    {
      name: "Adventure Area",
      image: "/kids.jpg",
      color: "bg-[#FF6B35]"
    },
    {
      name: "Rain Dance",
      image: "/rain_dance.jpg",
      color: "bg-[#00D4D4]"
    },
    {
      name: "Accommodation",
      image: "/stay.jpeg",
      color: "bg-[#461AA2]"
    },
    {
      name: "School Picnic",
      image: "/picnic.jpg",
      color: "bg-[#C5FA19]"
    },
    {
      name: "Destination Wedding",
      image: "/wedding.jpg",
      color: "bg-[#00D4D4]"
    }
  ];

  return (
    <section id="facilities" className="bg-gradient-to-b from-white via-[#DDFBFF]/50 to-white py-10 md:py-16 lg:py-20 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header with Image Background */}
        <div className="relative rounded-[20px] md:rounded-[30px] overflow-hidden mb-10 md:mb-14 lg:mb-16 shadow-2xl max-w-[1200px] mx-auto">
          <ImageWithSkeleton
            src="/hero.jpg"
            alt="Water Park"
            className="w-full h-[220px] md:h-[300px] lg:h-[350px] object-cover"
          />
          
          {/* Overlay with Title */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#461AA2]/90 via-[#461AA2]/70 to-transparent flex flex-col justify-center px-6 md:px-10 lg:px-12">
            <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-[#C5FA19] mb-1 md:mb-2">
              The Waves - Amusement & Water Park
            </h3>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              Facilities
            </h2>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 place-items-center max-w-[1200px] mx-auto">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="group rounded-[20px] md:rounded-[25px] overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer w-full max-w-[350px]"
            >
              <div className="relative h-[240px] sm:h-[260px] md:h-[280px] overflow-hidden">
                {/* Image */}
                <img 
                  src={facility.image} 
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Text Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div className={`${facility.color} rounded-[12px] md:rounded-[15px] px-3 md:px-5 py-2.5 md:py-3 text-center backdrop-blur-sm`}>
                    <h3 className={`text-lg md:text-xl lg:text-2xl font-extrabold ${
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

"use client";

import Image from "next/image";

function Gallery() {
  const photos = [
    {
      src: "/test.jpg",
      caption: "Making a splash with the whole family!",
      rotation: "-rotate-3",
    },
    {
      src: "/test-1.jpg",
      caption: "Having a blast with friends at Waves. Best day ever!",
      rotation: "rotate-2",
    },
    {
      src: "/test-2.jpg",
      caption: "Wet, tired, sun-kissed, and incredibly happy!",
      rotation: "-rotate-1",
    },
    {
      src: "/test-3.jpg",
      caption: "Chasing thrills and catching waves all day long",
      rotation: "rotate-3",
    },
    {
      src: "/test-4.jpg",
      caption: "Floating down the lazy river, zero worries attached",
      rotation: "rotate-3",
    },
    {
      src: "/test-5.jpg",
      caption: "The perfect escape from the summer heat!",
      rotation: "rotate-3",
    },
  ];

  return (
    <section className="bg-[#DDFBFF] py-10 md:py-16 px-4 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-2 md:mb-3 px-2">
            Capturing fun moments since 2023
          </h2>

          <p className="text-sm md:text-base text-black mb-3 md:mb-4 px-4">
            Explore what our visitors sharing and tag your moments with{" "}
            <span className="font-bold">#havingWaves</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center">
            <a
              href="https://www.instagram.com/thewaveswaterpark/"
              className="text-black font-bold text-sm md:text-base hover:text-[#461AA2] transition-colors"
            >
              Instagram →
            </a>

            <a
              href="#"
              className="text-black font-bold text-sm md:text-base hover:text-[#461AA2] transition-colors"
            >
              Whatsapp →
            </a>
          </div>
        </div>

        {/* Gallery */}
        <div className="relative flex items-center justify-center min-h-[400px] mt-8 md:mt-16 overflow-x-auto md:overflow-visible pb-4">
          <div className="flex items-center justify-start md:justify-center gap-4 md:gap-0 px-4 md:px-0">

            {photos.map((photo, index) => (
              <div
                key={index}
                className={`relative bg-[#C5FA19] p-2 md:p-3 rounded-[15px] md:rounded-[20px] shadow-xl hover:scale-105 hover:z-10 transition-all duration-300 ${photo.rotation} w-48 md:w-64 flex-shrink-0 ${index > 0 ? "md:-ml-12" : ""
                  }`}
                style={{ zIndex: index }}
              >

                {/* Image */}
                <div className="relative w-full h-48 md:h-64 bg-white rounded-[12px] md:rounded-[15px] overflow-hidden mb-2 md:mb-3">

                  <Image
                    src={photo.src}
                    alt={`Gallery photo ${index + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />

                </div>

                {/* Caption */}
                <p className="text-black text-[10px] md:text-xs font-medium px-1 md:px-2 pb-1 leading-relaxed">
                  {photo.caption}
                </p>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Gallery;
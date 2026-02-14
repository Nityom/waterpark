function Hero() {
  return (
    <section className="bg-[#DDFBFF] py-8 md:py-12 lg:py-[60px] px-4 md:px-8 lg:px-10 min-h-[calc(100vh-120px)] relative">
      <div className="max-w-[1400px] mx-auto text-center relative">
        {/* Top Badge */}
        <div className="inline-block bg-[#C5FA19] text-black py-2 md:py-2.5 px-4 md:px-6 rounded-[25px] text-[10px] md:text-xs mb-6 md:mb-10 font-medium">
          Get official tickets exclusively at <strong className="font-bold">thewaves.co.in</strong>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.2] md:leading-[1.1] mx-auto mb-4 md:mb-[30px] max-w-[1200px] text-black px-2">
          Jump into the world's largest{' '} 
          <span className="text-[#461AA2]">inflatable water park</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm md:text-base leading-relaxed text-[#333] mx-auto mb-8 md:mb-[50px] max-w-[800px] px-4">
          A giant floating playground, with 150+ obstacles<br className="hidden md:block" />
          <span className="md:hidden"> </span>for families, kids and thrill-seekers right off Wardha's JBR Beach.
        </p>

        {/* Hero Image Container */}
        <div className="relative max-w-[1200px] mx-auto rounded-[20px] md:rounded-[30px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <img 
            src="/hero-5.png" 
            alt="Inflatable water park" 
            className="w-full h-auto block object-cover max-h-[350px] md:max-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;

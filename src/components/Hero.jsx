function Hero() {
  return (
    <section className="bg-[#DDFBFF] py-[60px] px-10 pb-20 min-h-[calc(100vh-120px)] relative">
      <div className="max-w-[1400px] mx-auto text-center relative">
        {/* Top Badge */}
        <div className="inline-block bg-[#C5FA19] text-black py-2.5 px-6 rounded-[25px] text-xs mb-10 font-medium">
          Get official tickets exclusively at <strong className="font-bold">thewaves.co.in</strong>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mx-auto mb-[30px] max-w-[1200px] text-black">
          Jump into the world's largest{' '} <br />
          <span className="text-[#461AA2]">inflatable water park</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base leading-relaxed text-[#333] mx-auto mb-[50px] max-w-[800px]">
          A giant floating playground, with 150+ obstacles<br />
          for families, kids and thrill-seekers right off Wardha's JBR Beach.
        </p>

        {/* Hero Image Container */}
        <div className="relative max-w-[1200px] mx-auto rounded-[30px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <img 
            src="/hero.png" 
            alt="Inflatable water park" 
            className="w-full h-auto block object-cover max-h-[600px]"
          />
          {/* <button className="absolute top-1/2 right-[8%] -translate-y-1/2 bg-[#461AA2] text-white border-none p-10 rounded-full text-xl font-bold cursor-pointer flex flex-col items-center justify-center gap-1 shadow-[0_8px_24px_rgba(70,26,162,0.4)] hover:scale-105 hover:shadow-[0_12px_32px_rgba(70,26,162,0.5)] transition-all w-40 h-40" style={{clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}>
            Buy Tickets
            <span className="text-[28px] font-normal">→</span>
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;

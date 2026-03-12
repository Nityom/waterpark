"use client";

function Loader() {
  return (
    <div className="fixed inset-0 bg-[#DDFBFF] flex items-center justify-center z-[9999]">
      <div className="text-center">
        {/* Wave Animation */}
        <div className="flex gap-2 mb-6 justify-center">
          <div className="w-4 h-4 bg-[#461AA2] rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '600ms' }}></div>
          <div className="w-4 h-4 bg-[#00D4D4] rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '600ms' }}></div>
          <div className="w-4 h-4 bg-[#FF6B35] rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '600ms' }}></div>
          <div className="w-4 h-4 bg-[#C5FA19] rounded-full animate-bounce" style={{ animationDelay: '450ms', animationDuration: '600ms' }}></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-[#461AA2] mb-2">Loading The Waves...</h2>
        <p className="text-gray-600 text-sm">Get ready for fun!</p>
      </div>
    </div>
  );
}

export default Loader;

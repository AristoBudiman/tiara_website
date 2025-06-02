const HeroSection = () => {
  return (
    <div className="bg-[#F0BB78] rounded-xl p-6 flex justify-between items-center w-full max-w-7xl mx-auto mt-8 relative">
      {/* Text Section */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-black">WEEKEND SPECIAL</h2>
        <p className="text-sm text-black mt-1">GOT 20% DISCOUNT FOR PRODUCT 1</p>
        <button className="mt-4 bg-[#FFFFFF] text-[#F0BB78] font-semibold px-5 py-2 rounded-full shadow hover:bg-[#F0BB78] transition">
          BUY NOW
        </button>
      </div>

      {/* Image Placeholder */}
      <div className="flex-1 flex justify-center">
        <div className="bg-[#D9D9D9] w-52 h-52 rounded-md"></div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]"></div>
        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]"></div>
        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]"></div>
      </div>
    </div>
  );
};

export default HeroSection;
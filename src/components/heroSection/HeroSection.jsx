import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

const HeroSection = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const docRef = doc(fireDB, "data", "banner");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const urls = docSnap.data().urls || [];
        setBanners(urls);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        className="rounded-xl overflow-hidden"
      >
        {banners.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative bg-[#F0BB78] p-6 flex flex-col sm:flex-row items-center rounded-xl">
              {/* Image */}
              <div className="flex-1 flex justify-center">
                <img
                  src={url}
                  alt={`Banner ${index + 1}`}
                  className="aspect-[3/4] w-64 object-cover rounded-md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
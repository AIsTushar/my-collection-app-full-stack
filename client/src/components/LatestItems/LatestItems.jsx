import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { sliderSettings } from "../../utils/sliderSettings";

import "swiper/swiper-bundle.css";
import Card from "../Card";

function LatestItems({ latestItems }) {
  return (
    <section className="px-6 py-4 relative overflow-hidden">
      <h1 className="text-3xl text-black font-medium">Latest Items</h1>
      <p className="mt-2 mb-12 text-lg text-gray-700">
        Explore the latest items from the collection.
      </p>

      <Swiper {...sliderSettings}>
        <SliderButtons />
        {latestItems.map((item, i) => (
          <SwiperSlide key={i}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default LatestItems;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex gap-4 absolute top-[-2rem] right-0 md:top-[-4rem]  ">
      <button
        className="px-3 py-1 text-xl rounded-md text-blue-700 bg-[#eeeeff]"
        onClick={() => swiper.slidePrev()}
      >
        &lt;
      </button>
      <button
        className="px-3 py-1 text-xl rounded-md bg-white text-blue-700 shadow-custom"
        onClick={() => swiper.slideNext()}
      >
        &gt;
      </button>
    </div>
  );
};

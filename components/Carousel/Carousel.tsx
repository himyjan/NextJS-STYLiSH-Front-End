import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Dot from "./Dot";
import Story from "./Story";

interface Carousel {
  id: number;
  picture: string;
  product_id: number;
  story: string;
}

const CAROUSEL_IMAGE_CLASS_NAME =
  "w-full h-[185px] bg-center absolute bg-cover transition duration-1000 ";

const CAROUSEL_TIME = 5000;

const Carousel = () => {
  const [carouselData, setCarouselData] = useState<Carousel[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const carouselStopHandler = () => {
    setIsPlaying(false);
  };

  const carouselRestartHandler = () => {
    setIsPlaying(true);
  };

  const selectCarouselHandler = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchDataHandler = async () => {
      const response = await api.getCampaigns();
      const data = response.data as Carousel[];
      setCarouselData(data);
    };

    fetchDataHandler();
  }, []);

  useEffect(() => {
    const carouselPlayHandler = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === carouselData.length ? 1 : prevIndex + 1
        );
      }, CAROUSEL_TIME);
    };

    if (isPlaying) {
      carouselPlayHandler();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselData, isPlaying]);

  console.log(activeIndex);

  return (
    <div className="w-full h-[185px] bg-light-grey relative">
      {carouselData?.map((item) => {
        return (
          <Link
            href={`/product/${item.product_id}`}
            key={`carousel-${item.product_id}`}
          >
            <div
              className={
                activeIndex === item.id
                  ? `${CAROUSEL_IMAGE_CLASS_NAME} z-10 `
                  : `${CAROUSEL_IMAGE_CLASS_NAME} opacity-0`
              }
              style={{ backgroundImage: `url(${item.picture})` }}
            >
              <Story story={item.story} />
            </div>
          </Link>
        );
      })}
      <div className="absolute flex z-20 w-[55.2px] justify-between bottom-[18px] left-1/2 -translate-x-1/2 cursor-pointer">
        {carouselData?.map((item) => {
          return (
            <Dot
              key={`dot-${item.product_id}`}
              index={item.id}
              activeIndex={activeIndex}
              onClick={() => {
                selectCarouselHandler(item.id);
              }}
              onMouseOver={carouselStopHandler}
              onMouseLeave={carouselRestartHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

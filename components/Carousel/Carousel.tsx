import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Dot from './Dot';
import Story from './Story';

interface Carousel {
  id: number;
  picture: string;
  product_id: number;
  story: string;
}

const CAROUSEL_IMAGE_CLASS_NAME =
  'w-full h-[185px] flex justify-center bg-center absolute bg-cover ease transition duration-1000 xl:h-[500px]';

const CAROUSEL_TIME = 5000;

const Carousel = ({ carouselData }: { carouselData: Carousel[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
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
    const carouselPlayHandler = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1,
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

  return (
    <div className="relative flex h-[185px] w-full justify-center xl:h-[500px]">
      {carouselData?.map((item) => {
        return (
          <Link
            href={`/product/${item.product_id}`}
            key={`carousel-${item.product_id}`}
            className={
              activeIndex === item.id - 1
                ? `${CAROUSEL_IMAGE_CLASS_NAME}`
                : `${CAROUSEL_IMAGE_CLASS_NAME} opacity-0`
            }
            style={{ backgroundImage: `url(${item.picture})` }}
            onMouseOver={carouselStopHandler}
            onMouseLeave={carouselRestartHandler}
          >
            <Story story={item.story} />
          </Link>
        );
      })}
      <div className="z-2 mx-auto absolute bottom-[18px] flex cursor-pointer xl:bottom-[34px]">
        {carouselData?.map((item, index) => {
          return (
            <Dot
              key={`dot-${item.product_id}`}
              index={index}
              $isActive={activeIndex === index}
              onClick={() => {
                selectCarouselHandler(item.id - 1);
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

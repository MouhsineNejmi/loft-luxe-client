import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === images.length;

  const handlePrevClick = () => {
    if (isFirstImage) return;

    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    if (isLastImage) return;

    setCurrentImageIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='relative w-full h-full aspect-square w-full relative overflow-hidden rounded-xl'>
      <img
        className='object-cover h-full w-full z-0 group-hover:scale-110 transition'
        src={images[currentImageIndex]}
        alt={`Listing ${currentImageIndex + 1}`}
      />

      {images.length > 1 && (
        <>
          <div
            className={`
              flex justify-center items-center w-6 h-6 bg-white rounded-full shadow-md absolute left-2 top-1/2 -translate-y-1/2 z-50
              ${isFirstImage ? 'opacity-50' : 'opacity-100'}
            `}
            onClick={handlePrevClick}
          >
            <IoIosArrowBack />
          </div>

          <div
            className={`
              flex justify-center items-center w-6 h-6 bg-white rounded-full shadow-md absolute right-2 top-1/2 -translate-y-1/2 z-50
              ${isLastImage ? 'opacity-50' : 'opacity-100'}
            `}
            onClick={handleNextClick}
          >
            <IoIosArrowForward />
          </div>
        </>
      )}

      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full bg-white transition ${
              index === currentImageIndex ? 'w-4' : 'w-2'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;

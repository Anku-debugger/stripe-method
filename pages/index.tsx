import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...sliderSettings}>
        <div>
          <Image src="/images/img1.webp" alt="banner-img" width={100} height={0} layout='responsive' className="w-full" />
        </div>
        <div>
          <Image src="/images/img2.webp" alt="banner-img" width={100} height={0} layout='responsive' className="w-full" />
        </div>
        <div>
          <Image src="/images/img3.webp" alt="banner-img" width={100} height={0} layout='responsive' className="w-full" />
        </div>
      </Slider>
    </>
  );
};

export default Home;

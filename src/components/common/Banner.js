import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // Tự động chạy
    autoplaySpeed: 4000,    // 4 giây
  };

  return (
    <div className="w-full image-slider ">
      <Slider {...settings}>
        <div>
          <img
            src="https://img.freepik.com/premium-vector/online-shopping-mobile-application-with-global-network-modern-marketing-digital-marketing-concept-web-page-design-website-banner-mobile-website-3d-vector-illustration_473922-255.jpg?w=2000"
            alt="Banner 1"
            className="h-[400px] w-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://digital-world-store.myshopify.com/cdn/shop/files/slideshow4_800x.png?v=1613565623"
            alt="Banner 2"
            className="h-[400px] w-full object-cover"
          />
        </div>
        <div>
          <img
            src="https://digital-world-store.myshopify.com/cdn/shop/files/moto-360-2nd-gen-official_800x.png?v=1613565244"
            alt="Banner 3"
            className="h-[400px] w-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;

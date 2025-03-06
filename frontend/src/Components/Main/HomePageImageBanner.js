import React, { useState, useEffect } from 'react';
import SliderComponent from 'react-slick'; // Renamed import
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { fetchHomePageBannerCarouselImages } from '../../services/api';

// Sample images for the banner
// const bannerImages = [
//   'https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
//   'https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner-1280x720.jpg',
//   'https://static.vecteezy.com/system/resources/previews/006/828/785/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-pink-backgroud-for-banner-market-ecommerce-women-concept-free-vector.jpg',
// ];

const HomePageImageBanner = () => {

  const [bannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    fetchBannerImages();
  }, []);

  const fetchBannerImages = async () => {
    try {
      const response = await fetchHomePageBannerCarouselImages();
      if(!response.data){
        setBannerImages([]);
        return;
      }
      setBannerImages(response.data[0].imageUrls);
    } catch (error) {
      console.error('Error fetching banner images:', error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="relative">
      {/* Slider */}
      <SliderComponent {...sliderSettings} className="relative">
        {bannerImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover"
            />
            {/* Newsletter subscription on the first slide */}
            {index === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6">
                <h2 className="text-4xl font-bold mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-lg mb-6">
                  Get the latest updates and exclusive offers.
                </p>
                <form className="flex space-x-3 w-full max-w-lg">
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </SliderComponent>

      {/* Custom styling for the dots */}
      <style>
        {`
          .slick-dots li button:before {
            font-size: 12px;
            color: white;
          }
          .slick-dots li.slick-active button:before {
            color: blue;
          }
        `}
      </style>
    </div>
  );
};

export default HomePageImageBanner;
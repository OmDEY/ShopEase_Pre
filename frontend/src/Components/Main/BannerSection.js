import React from 'react';

const bannerData = [
    {
        id: 1,
        title: 'New Arrivals',
        description: 'Discover the latest trends in fashion with our new arrivals!',
        image: 'https://www.bullionknot.com/cdn/shop/files/Georgiamin_7.jpg?v=1715410709',
        buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
        id: 2,
        title: 'Exclusive Deals',
        description: 'Don’t miss out on our special offers just for you!',
        image: 'https://assets.ajio.com/medias/sys_master/root/20240406/as1C/6610dc7216fd2c6e6aa179c4/-473Wx593H-466410399-white-MODEL.jpg',
        buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
        id: 3,
        title: 'Summer Collection',
        description: 'Get ready for summer with our vibrant and stylish collection.',
        image: 'https://outcasts.in/cdn/shop/products/4.png?v=1672548064&width=1080',
        buttonColor: 'bg-green-500 hover:bg-green-600',
    },
];

const BannerSection = () => {
    return (
        <div className="container mx-auto my-12">
            <div className="flex space-x-6">
                {bannerData.map((banner) => (
                    <div
                        key={banner.id}
                        className="relative w-1/3 h-64 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    >
                        {/* Background Image */}
                        <div className="relative w-full h-full overflow-hidden">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Overlay for text */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
                            <p className="text-lg mb-6">{banner.description}</p>
                            <button
                                className={`${banner.buttonColor} text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105`}
                            >
                                Shop Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerSection;

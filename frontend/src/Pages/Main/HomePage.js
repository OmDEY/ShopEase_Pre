import React from 'react'
import HomePageImageBanner from '../../Components/Main/HomePageImageBanner'
import FeaturedCategories from '../../Components/Main/FeaturedCategories'
import BannerSection from '../../Components/Main/BannerSection'
import PopularProduct from '../../Components/Main/PopularProduct'
import DailyBestSales from '../../Components/Main/DailyBestSales'
import DealOfTheDay from '../../Components/Main/DealOfTheDay'
import CategoryProducts from '../../Components/Main/CategoryProducts'
import BigCard from '../../Components/Main/Common/BigCard'

const HomePage = () => {
  return (
    <div>
      <HomePageImageBanner />
      <FeaturedCategories />
      <BannerSection />
      <PopularProduct />
      <DailyBestSales />
      <DealOfTheDay />
      <CategoryProducts />
      <BigCard />
    </div>
  )
}

export default HomePage
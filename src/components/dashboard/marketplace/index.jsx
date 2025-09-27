import React from 'react'
import DashboardLayout from '../dashboard-layout'
import MarketplaceSlider from '@/components/shared/MarketplaceSlider'
import Button from '@/components/shared/Button'
import filterIcon from "@/assets/icons/filter.svg"
import vegetablesCategory from '@/assets/ProductImages/categories/vegetables.png'
import fruitsCategory from '@/assets/ProductImages/categories/fruits.png'
import grainsCategory from '@/assets/ProductImages/categories/grains.png'
import proteinCategory from '@/assets/ProductImages/categories/protein.png'
import ProductsList from './product-list'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const categories = [
  { id: 1, name: "Vegetables", image: vegetablesCategory },
  { id: 2, name: "Fruits", image: fruitsCategory },
  { id: 3, name: "Grains", image: grainsCategory },
  { id: 4, name: "Protein", image: proteinCategory },
];

const Marketplace = () => {
  return (
    <div>
      {/* sliders  */}
      <section className="gap-5">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.4}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full lg:w-full"
        >
          {/* First Slide */}
          <SwiperSlide>
            <div className="relative w-full bg-[#9AFFA1] h-[300px] rounded-lg px-20 py-10 flex justify-start items-center">
              <div className="font-inter flex flex-col gap-3">
                <h4 className="text-4xl font-bold text-[--color-neutral-dark]">Up to 10% offer</h4>
                <p className="text-xl">Enjoy our big offer.</p>
                <button className="font-semibold bg-[var(--color-primary)] text-white py-3 px-10 rounded-lg w-fit cursor-pointer">
                  Buy Now
                </button>
              </div>
              <img src="/marketplaceSlider/1_.png" alt="image" className="absolute right-10" />
            </div>
          </SwiperSlide>

          {/* Second Slide */}
          <SwiperSlide>
            <div className="relative w-full bg-[#003F1F] h-[300px] rounded-lg px-20 py-10 flex justify-start items-center">
              <div className="font-inter flex flex-col gap-3">
                <h4 className="text-4xl font-bold text-white">Up to 5% offer</h4>
                <p className="text-xl text-white">On first buyers.</p>
                <button className="font-semibold bg-white text-[var(--color-neutral-dark)] py-3 px-10 rounded-lg w-fit cursor-pointer">
                  Buy Now
                </button>
              </div>
              <img src="/marketplaceSlider/2_.png" alt="image" className="absolute right-10" />
            </div>
          </SwiperSlide>

          {/* Third Slide */}
          <SwiperSlide>
            <div className="relative w-full bg-[#FFA725] h-[300px] rounded-lg px-20 py-10 flex justify-start items-center">
              <div className="font-inter flex flex-col gap-3">
                <h4 className="text-4xl font-bold text-[--color-neutral-dark]">Up to 15% offer</h4>
                <p className="text-xl text-[var(--color-primary)]">Enjoy our big offer.</p>
                <button className="font-semibold bg-[var(--color-primary)] text-white py-3 px-10 rounded-lg w-fit cursor-pointer">
                  Buy Now
                </button>
              </div>
              <img src="/marketplaceSlider/3_.png" alt="image" className="absolute right-10" />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      {/* <MarketplaceSlider /> */}

      {/* explore categories  */}
      <div className="flex justify-between items-center my-8">
        <h4 className="font-semibold text-black text-xl">Explore Categories</h4>
        <Button
          text="Filter"
          variant="ghost"
          className="text-[var(--color-primary)] border-2 border-[var(--color-primary)] px-6"
        >
          <img src={filterIcon} alt="filter" />
          <p>Filter</p>
        </Button>
      </div>

      {/* categories  */}
      <section className="w-full grid grid-cols-2 lg:grid-cols-4 justify-between items-center gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="py-2 h-22 cursor-pointer w-full lg:w-[1fr] px-5 rounded-lg bg-white shadow"
          >
            <div className="flex gap-10 justify-start items-center">
              <img
                src={category.image}
                className=" rounded-lg overflow-hidden"
              />
              <p className="md:text-lg">{category.name}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-between items-center mt-12">
        <h4 className="font-semibold text-black text-xl">Top Products</h4>
        <Link to={""} className="text-[var(--color-primary)] px-6">
          View all
        </Link>
      </div>
      {/* product list  */}
      <section className=" mt-5 mb-10">
        <ProductsList />
      </section>
    </div>
  );
}

export default Marketplace;

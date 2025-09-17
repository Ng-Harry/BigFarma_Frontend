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


const categories = [
  { id: 1, name: "Vegetables", image: vegetablesCategory },
  { id: 2, name: "Fruits", image: fruitsCategory },
  { id: 3, name: "Grains", image: grainsCategory },
  { id: 4, name: "Protein", image: proteinCategory },
];

const MarketplacePage = () => {
  return (
    <div>
      {/* sliders  */}
      <MarketplaceSlider />

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

export default MarketplacePage;

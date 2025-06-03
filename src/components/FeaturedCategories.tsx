"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "restaurants",
    title: "RESTAURANTS",
    image: "/images/restaurants.jpg",
    href: "/services/restaurants",
  },
  {
    id: "jewelry-stores",
    title: "JEWELRY STORES",
    image: "/images/jewelry-stores.jpg",
    href: "/services/jewelry-stores",
  },
  {
    id: "fast-food",
    title: "FAST FOOD",
    image: "/images/fast-food.jpg",
    href: "/services/fast-food",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-primary">
          Featured Post Construction Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.id} className="group">
              <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4 sm:p-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

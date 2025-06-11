import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

import { Product } from "@/generated/prisma";

import db from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HomePage = async () => {
  return (
    <main className="container">
      {/* Newest Products */}
      <ProductSection title={"Newest"} productFetcher={getNewestProducts} />
      <br />

      {/* Most Popular Products */}
      <ProductSection
        title={"Most Popular"}
        productFetcher={getPopularProducts}
      />
      <br />

      {/* All Products */}
      <ProductSection title={"All Products"} productFetcher={getAllProducts} />
    </main>
  );
};

// Products

// Cards


//

type productSectionType = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};

const ProductSection = async ({
  title,
  productFetcher,
}: productSectionType) => {
  const Products = await productFetcher();
  return (
    <section>
      {/* header */}
      <div className="flex gap-4 items-center mb-5">
        <h2 className="text-4xl font-bold mb-1">{title}</h2>
        <Button variant="outline" className="w-fit"> {/* //? asChild doesn't work here */}
          <Link href="/products" className="flex gap-1 items-center">
            <span>View All</span>
            <ArrowRight/>
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {Products.map((product) => (
          <ProductCard key={product.id} {...product}/>
        ))}
      </div>
    </section>
  );
};

//

// Get-Products Functions
const getNewestProducts = async () => {
  return await db.product.findMany({
    where: { isAvailable: true },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPopularProducts = async () => {
  return await db.product.findMany({
    where: { isAvailable: true },
    take: 3,
    orderBy: {
      order: { _count: "desc" },
    },
  });
};

const getAllProducts = async () => {
  return await db.product.findMany({
    where: { isAvailable: true },
    take: 5,
    orderBy: { name: "asc" },
  });
};

export default HomePage;
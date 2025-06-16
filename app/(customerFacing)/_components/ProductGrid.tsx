import { Suspense } from "react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductList from "./ProductList";
import { Product } from "@/generated/prisma";

const ProductGrid = ({
    productFetcher,
  }: {
    productFetcher: () => Promise<Product[]>;
  }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    <Suspense
      fallback={Array.from({ length: 7 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    >
      <ProductList productFetcher={productFetcher} />
    </Suspense>
  </div>
);

export default ProductGrid;

import { Product } from "@/generated/prisma";
import ProductCard from "./ProductCard";

const ProductList = async ({
    productFetcher,
  }: {
    productFetcher: () => Promise<Product[]>;
  }) =>
    (await productFetcher()).map((product) => (
      <ProductCard key={product.id} {...product} />
    ));

export default ProductList;
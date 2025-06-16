import { Product } from "@/generated/prisma";
import ProductGrid from "./ProductGrid";
import ProductSectionHeader from "./ProductSectionHeader";

type productSectionType = {
  title: string;
  productFetcher: () => Promise<Product[]>;
};

const ProductSection = ({ title, productFetcher }: productSectionType) => (
  <section>
    <ProductSectionHeader title={title} />
    <ProductGrid productFetcher={productFetcher} />
  </section>
);

export default ProductSection;

import ProductSection from "@/app/(customerFacing)/_components/ProductSection";
import {
  getNewestProducts,
  getPopularProducts,
  getAllProducts,
} from "./service";

const HomePage = async () => (
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

export default HomePage;

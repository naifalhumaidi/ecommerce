import ProductSection from "@/app/(customerFacing)/_components/ProductSection";
import {
  getFiveProducts,
  getNewestFiveProducts,
  getMostPopularFiveProducts
} from "./service";

const HomePage = async () => (
  <main className="container">
    {/* Newest Products */}
    <ProductSection title={"Newest"} productFetcher={getNewestFiveProducts} />
    <br />

    {/* Most Popular Products */}
    <ProductSection
      title={"Most Popular"}
      productFetcher={getMostPopularFiveProducts}
    />
    <br />

    {/* All Products */}
    <ProductSection title={"All Products"} productFetcher={getFiveProducts} />
  </main>
);

export default HomePage;

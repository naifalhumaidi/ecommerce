import ProductSection from "@/app/(customerFacing)/_components/ProductSection";
import {
  getNewestProducts,
  getPopularProducts,
  getAllProducts,
} from ".././service";

const ProductsPage = async () => (
    <main className="container">
      <ProductSection title={"All Products"} productFetcher={getAllProducts} />
    </main>
  );

export default ProductsPage;


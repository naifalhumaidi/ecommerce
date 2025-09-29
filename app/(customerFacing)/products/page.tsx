import { getAllProducts } from ".././service";
import ProductGrid from "../_components/ProductGrid";

const ProductsPage = async () => (
  <main className="container">
    <ProductGrid productFetcher={getAllProducts} />
  </main>
);

export default ProductsPage;
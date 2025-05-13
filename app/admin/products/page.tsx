import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import ProductsTable from "./_components/ProductsTable";

const AdminProductsPage = () => (
  <>
    <div className="flex justify-between items-center mb-3">
      <PageHeader>Products</PageHeader>
      <Button>
        <Link href="/admin/products/new">Add Product</Link>
      </Button>
    </div>
    <ProductsTable/>
  </>
);

export default AdminProductsPage;
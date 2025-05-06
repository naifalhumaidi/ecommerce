import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminProductsPage = () => (
  <>
    <div className="flex justify-between items-center mb-3">
      <PageHeader>Products</PageHeader>
      <Button><Link href="/admin/products/new">Add Product</Link></Button>
    </div>
    <ProductsTable/>
  </> 
)

export default AdminProductsPage;


const ProductsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-0"><span className="sr-only">Available for Purchase</span></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Orders</TableHead>
        <TableHead className="w-0"><span className="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
  </Table>
);
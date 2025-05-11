import { Button } from "@/components/ui/button";
import PageHeader from "../_components/pageHeader";
import Link from "next/link";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/prisma";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const AdminProductsPage = () => (
  <>
    <div className="flex justify-between items-center mb-3">
      <PageHeader>Products</PageHeader>
      <Button>
        <Link href="/admin/products/new">Add Product</Link>
      </Button>
    </div>
    <ProductsTable />
  </>
);

export default AdminProductsPage;

const ProductsTable = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailable: true,
      _count: { select: { order: true } },
    },
    orderBy: { name: "asc" },
  });

  if (products.length === 0) return <strong>No Products Found</strong>;

  // useState(false);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailable ? (
                <>
                  <CheckCircle2 />
                  <p className="sr-only">Available</p>
                </>
              ) : (
                <>
                  <XCircle />
                <p className="sr-only">Unavailable</p>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents/100)}</TableCell>
            {/* ? why used "formatNumber()" */}
            <TableCell>{formatNumber(product._count.order)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <MoreVertical/>
                  <p className="sr-only">Actions</p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    {
                      product.isAvailable ? "Deactivate" : "Activate"
                    }
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={"/admin/products/edit"}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href={"/admin/products/delete"}>Delete</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <a download href={`/admin/products/${product.id}/download`}>Download</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>  
            </TableCell>
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
};

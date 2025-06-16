import db from "@/lib/prisma";
import { CheckCircle2, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatter";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import ProductDropdownMenu from "./DropdownMenu";

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

  if (products.length === 0)
    return (
      <div className="absolute w-full h-full flex justify-center items-center top-[-1] left-[-1] z-[-1]">
        <strong>No Products Found</strong>
      </div>
    );

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
      </TableHeader>

      <TableBody>
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
                  <XCircle className="stroke-destructive" />
                  <p className="sr-only">Unavailable</p>
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(Number(product.priceInCents) / 100)}</TableCell>
            <TableCell>{formatNumber(product._count.order)}</TableCell>
            <TableCell>
              <ProductDropdownMenu product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;

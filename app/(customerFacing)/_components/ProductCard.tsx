import { formatCurrency } from "@/lib/formatter";
import { Product } from "@/generated/prisma";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
// ? is using the "Product" prisma type ok here or I should've created a new Type for just needed props(id, name,..)?
const ProductCard = ({
  id,
  name,
  description,
  priceInCents,
  imagePath,
}: Product) => {
  return (
    <Card key={id} className="gap-3 overflow-hidden pt-0">
      <div className="relative aspect-video">
        <Image fill alt={name}
          src="/products/Screenshot_20250602_101242.png"
          //! src={imagePath}
        />
      </div>
      <CardHeader>
        <CardTitle>
          <h3 className="text-2xl">{name}</h3>
          <p className="text-sm">{formatCurrency(Number(priceInCents) / 100)}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardDescription>
          <p className="line-clamp-3">{description}</p>
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button size="lg" className="w-full">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>{" "}
        {/* //? asChild doesn't work here */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
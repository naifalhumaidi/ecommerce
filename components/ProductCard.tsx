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
import { Button } from "./ui/button";
import Link from "next/link";

const ProductCard = ({ id, name, description, priceInCents, imagePath }: Product) => {
  return (
    <Card key={id} className="flex flex-col overflow-hidden pt-0">
      <CardHeader className="relative h-auto w-full aspect-video">
        <Image
          fill
          src="/products/Screenshot_20250602_101242.png"
          //!
          // src={imagePath}
          alt={name}
        />
        <CardTitle>
          <h3 className="text-2xl">{name}</h3>
          <p>{formatCurrency(priceInCents / 100)}</p>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardDescription>
          <p className="line-clamp-3">{description}</p>
        </CardDescription>
      </CardContent>

      <CardFooter>
        <Button className="w-full py-6">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button> {/* //? asChild doesn't work here */}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

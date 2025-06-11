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

const ProductCard = ({ id, name, description, priceInCents }: Product ) => {
    return (
      <Card key={id} className="flex flex-col overflow-hidden">
        <CardHeader>
          <Image
            src="/products/Screenshot_20250602_101242.png"
            //!
            // src={product.imagePath}
            alt="Product Image"
            width={400}
            height={400}
          />
          <CardTitle>
            <h3 className="text-2xl">{name}</h3>
            <p>{formatCurrency(priceInCents / 100)}</p>
          </CardTitle>
        </CardHeader>
  
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>

        <CardFooter>
          <Button className="w-full py-6"><Link href={`/products/${id}/purchase`}>Purchase</Link></Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default ProductCard;
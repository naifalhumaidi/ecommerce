import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ProductSectionHeader = ({title}:{title: string}) => (
  <header className="flex gap-4 items-center mb-5">
    <h2 className="text-4xl font-bold mb-1">{title}</h2>
    <Button variant="outline" className="w-fit">
      {/* //? asChild doesn't work here */}
      <Link href="/products" className="flex gap-1 items-center">
        <span>View All</span>
        <ArrowRight />
      </Link>
    </Button>
  </header>
);

export default ProductSectionHeader;

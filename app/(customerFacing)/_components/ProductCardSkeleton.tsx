import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

const ProductCardSkeleton = () => (
  <Card className="flex gap-3 overflow-hidden pt-0 animate-pulse">
    <div className="bg-gray-300 relative aspect-video"></div>
    <CardHeader>
      <CardTitle className="space-y-0.5">
        <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        <div className="w-1/5 h-4 rounded-full bg-gray-300"></div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="space-y-1">
        <div className="h-4 rounded-full bg-gray-300"></div>
        <div className="h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
      </CardDescription>
    </CardContent>
    <CardFooter>
      <Button disabled size="lg" className="w-full"></Button>
    </CardFooter>
  </Card>
);

export default ProductCardSkeleton;

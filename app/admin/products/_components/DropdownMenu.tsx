import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { DownloadItem, ToggleActivationItem, EditItem, DeleteItem } from "./_ui/dropdown-menu-items";
type product = {
    name: string;
    id: string;
    priceInCents: number;
    isAvailable: boolean;
    _count: {
        order: number;
    };
};

const ProductDropdownMenu = ({product}:{product:product}) => {
  return (
    <DropdownMenu>
        {/* Trigger */}
      <DropdownMenuTrigger className="cursor-pointer">
        <MoreVertical />
        <p className="sr-only">Actions</p>
      </DropdownMenuTrigger>
        {/* Content */}
      <DropdownMenuContent className="**:cursor-pointer">
        <DownloadItem id={product.id}/>
        <ToggleActivationItem id={product.id} isAvailable={product.isAvailable}/>
        <EditItem id={product.id}/>
        <DeleteItem id={product.id} ordersCount={product._count.order}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropdownMenu;


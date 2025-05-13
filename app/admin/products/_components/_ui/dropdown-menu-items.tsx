import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ProductActivationToggleTrigger,
  ProductDeletionTrigger,
} from "./product-action-triggers";
import Link from "next/link";

const DownloadItem = ({id}:{ id: string; }) => (
  <DropdownMenuItem>
    <a download href={`/admin/products/${id}/download`}>
      Download
    </a>
  </DropdownMenuItem>
);

const ToggleActivationItem = ({id, isAvailable}:{ id: string, isAvailable:boolean }) => (
    <DropdownMenuItem>
    <ProductActivationToggleTrigger
      id={id}
      isAvailable={isAvailable}
    />
  </DropdownMenuItem>
);

const EditItem = () => (
  <DropdownMenuItem>
    <Link href={"/admin/products/edit"}>Edit</Link>
  </DropdownMenuItem>
);

const DeleteItem = ({id, ordersCount}:{ id: string, ordersCount: number }) => (
  <DropdownMenuItem>
    <ProductDeletionTrigger
      id={id}
      isDisabled={ordersCount > 0}
    />
  </DropdownMenuItem>
);

export {
    DownloadItem,
    ToggleActivationItem,
    EditItem,
    DeleteItem
}
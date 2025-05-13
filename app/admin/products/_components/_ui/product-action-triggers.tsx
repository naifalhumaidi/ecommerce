"use client"
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../../_actions/products";
import { useRouter } from "next/navigation";

// Toggle Activation
const ProductActivationToggleTrigger = ({id, isAvailable}:{id:string, isAvailable:boolean}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <button 
            disabled={isPending}
            onClick={()=> {
                startTransition( async () => {
                    await toggleProductAvailability(id,isAvailable);
                    router.refresh();
                });
            }} >
            {isAvailable ? "Deactivate" : "Activate"}
        </button>
)}

// Delete Product
const ProductDeletionTrigger = ({id, isDisabled}:{id:string, isDisabled:boolean}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    return (
        <button className="w-full text-left rounded-sm px-2 py-1.5 left-[-8px] relative text-destructive hover:text-primary-foreground hover:bg-destructive" 
            disabled={isPending || isDisabled}
            onClick={()=> {
                // ? Do I really need "async" here, the functionlity work without it and i have it inside the function "deleteProdcut". Won't it cause the site to be slower due to using 2 awaits?
                startTransition( async () => {
                    await deleteProduct(id);
                    router.refresh();
                });
            }} >
            Delete
        </button>
)}

export { 
    ProductActivationToggleTrigger,
    ProductDeletionTrigger,
}
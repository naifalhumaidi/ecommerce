import { Loader2 } from "lucide-react";

export default function AdminLoading(){
    return (
        <div className="absolute w-full h-full flex justify-center items-center top-[-1] left-[-1] z-[-1]">
             <Loader2 className="size-24 animate-spin"/>
        </div>
)}
"use server"
import db from "@/lib/prisma";
import { redirect } from "next/navigation";
import { coerce, number, string, z } from "zod";

const fileSchema= z.instanceof(File,{message:"Required"});
// ? Study more about how this line works
const imageSchema= fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"));


const addSchema = z.object({
    name:string().min(1).max(150),
    description:string().min(1).max(1000),
    priceInCents:coerce.number().int().min(1),
    //? do i realy need to validate the size while i set the file input required?
    image:fileSchema.refine(file => file.size > 0,"Required"),
    // ? why used refine and the size codition here too?
    file:imageSchema.refine(file => file.size > 0, "Required"),
})

export const addProduct = async (formData:FormData) => {
    // ? Study more about how this line works
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!result.success) 
        return result.error?.formErrors.fieldErrors;
    const data = result.data;

    await db.product.create({
        data:{
            name:data.name,
            priceInCents:data.priceInCents,
            description:data.description,
            imagePath:"",
            filePath:""
        }
    })
    redirect("http://localhost:3000/admin/products");
}
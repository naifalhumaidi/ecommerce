"use server"
import db from "@/lib/prisma";
import { redirect } from "next/navigation";
import { coerce, number, string, z } from "zod";
import fs from "fs/promises";
import { PathLike } from "fs";

const fileSchema= z.instanceof(File,{message:"Required"});
// ? Study this
const imageSchema= fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"));


const addSchema = z.object({
    name:string().min(1).max(150),
    description:string().min(1).max(1000),
    priceInCents:coerce.number().int().min(1),
    //? do i really need to validate the size while i set the file input required?
    image:fileSchema.refine(file => file.size > 0,"Required"),
    // ? why used refine and the size codition here too?
    file:imageSchema.refine(file => file.size > 0, "Required"),
})

// * make a better name
const createFileAndGetPath = async (file:File, dirPath:PathLike) => {
    await fs.mkdir(dirPath,{recursive:true}); //? {recursive:true}
    const filePath = `${dirPath}/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(filePath,Buffer.from(await file.arrayBuffer()))
    return filePath;
}

// ? Study this
export const addProductAction = async ( prevState: unknown, formData:FormData) => {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!result.success) 
        return result.error?.formErrors.fieldErrors;
    const data = result.data;
    const filePath: string = await createFileAndGetPath(data.file, "products");
    const imagePath: string = await createFileAndGetPath(data.image, "public/products");

    await db.product.create({
        data:{
            isAvailable:false,
            name:data.name,
            priceInCents:data.priceInCents,
            description:data.description,
            imagePath,
            filePath,
        }
    })
    redirect("http://localhost:3000/admin/products");
}
"use server";
import db from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { coerce, number, string, z } from "zod";
import fs from "fs/promises";
import { PathLike } from "fs";
// ? Study this page again

// Schemas -------------------------------------------------------------------
const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

// Action Schemas -------------------------------------------------------------------
const createSchema = z.object({
  name: string().min(1).max(150),
  description: string().min(1).max(1000),
  priceInCents: coerce.number().int().min(1),
  //? do i really need to validate the size while i set the file input required?
  image: fileSchema.refine((file) => file.size > 0, "Required"),
  // ? why used refine and the size codition here too?
  file: imageSchema.refine((file) => file.size > 0, "Required"),
});

const updateSchema = createSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional(),
});

// Functions -------------------------------------------------------------------
const createFormDataSchema = (formData: FormData) => {
  return createSchema.safeParse(Object.fromEntries(formData.entries()));
};

const updateFormDataSchema = (formData: FormData) => {
  return updateSchema.safeParse(Object.fromEntries(formData.entries()));
};

const createDirectory = async (dirPath: PathLike) => {
  await fs.mkdir(dirPath, { recursive: true }); //? {recursive:true}
};

const getFilePath = (name: string, dirPath: PathLike) => {
  return `${dirPath}/${crypto.randomUUID()}-${name}`;
};

const createFile = async (file: File, dirPath: PathLike) => {
  const filePath = getFilePath(file.name, dirPath);
  await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
  return filePath;
};

const createImage = async (file: File, dirPath: PathLike) => {
  return (await createFile(file, dirPath)).replace(/public/, "");
};

const deleteFile = async (filePath: string) => {
  await fs.unlink(filePath);
};

const updateFile = async (
  newFile: File,
  dirPath: PathLike,
  oldFilePath: string
) => {
  if (newFile?.size > 0) {
    //? is the performance bad here? i used 2 awaits one by one, or not?, I used the second one after "return"
    await deleteFile(oldFilePath);
    return await createFile(newFile, dirPath);
  }
  return oldFilePath;
};

const updateImage = async (
  newFile: File,
  dirPath: PathLike,
  oldFilePath: string
) => {
  return (await updateFile(newFile, dirPath, `public${oldFilePath}`)).replace(
    /public/,
    ""
  );
};

// Actions -------------------------------------------------------------------
export const createProduct = async (prevState: unknown, formData: FormData) => {
  // getFormData
  const parsedFormData = createFormDataSchema(formData);
  if (parsedFormData.success === false)
    return parsedFormData.error?.formErrors.fieldErrors;
  const data = parsedFormData.data;

  // Make a file and get its path
  createDirectory("products");
  const filePath = await createFile(data.file, "products");

  // Make an image and get its path
  createDirectory("public/products");
  const imagePath = await createImage(data.image, "public/products");

  // Create the product
  await db.product.create({
    data: {
      isAvailable: false,
      name: data.name,
      priceInCents: data.priceInCents,
      description: data.description,
      imagePath,
      filePath,
    },
  });
  redirect("/admin/products");
};

export const updateProduct = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  // getFormData
  const parsedFormData = updateFormDataSchema(formData);
  if (!parsedFormData.success)
    return parsedFormData.error?.formErrors.fieldErrors;
  const data = parsedFormData.data;

  // Get the old data
  const prevData = await db.product.findUnique({ where: { id } });
  if (prevData == null) return notFound();

  // Update files
  const filePath = await updateFile(data.file!, "products", prevData?.filePath);
  const imagePath = await updateImage(
    data.image!,
    "public/products",
    prevData?.imagePath
  );

  // Update the database
  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      priceInCents: data.priceInCents,
      description: data.description,
      imagePath,
      filePath,
    },
  });
  redirect("/admin/products");
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: { id },
  });
  if (product == null) return notFound();

  Promise.all([
    await deleteFile(product.filePath),
    await deleteFile(`public${product.imagePath}`),
  ]);
};

export const toggleProductAvailability = async (
  id: string,
  isAvailable: boolean
) => {
  await db.product.update({
    where: { id },
    data: { isAvailable: !isAvailable },
  });
};

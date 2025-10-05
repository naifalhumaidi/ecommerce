import PageHeader from "../../../_components/pageHeader";
import ProductForm from "../../_components/ProductForm";
import db from "@/lib/prisma";

const EditProductPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const {id} = await params;
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};
export default EditProductPage;

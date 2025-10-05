import db from "@/lib/prisma";

const getAllProducts = async (count?: number) =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: count,
    orderBy: { name: "asc" },
  });

const getNewestProducts = async (count?: number) =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: count,
    orderBy: {
      createdAt: "desc",
    },
  });

const getMostPopularProducts = async (count?: number) =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: count,
    orderBy: {
      order: { _count: "desc" },
    },
  });

// Main Page Products Count for each Category
const ProductsCount = 5;
const getFiveProducts = () => getAllProducts(ProductsCount);
const getNewestFiveProducts = () => getNewestProducts(ProductsCount);
const getMostPopularFiveProducts = () => getMostPopularProducts(ProductsCount);

export {
  getAllProducts,
  getFiveProducts,
  getNewestProducts,
  getNewestFiveProducts,
  getMostPopularProducts,
  getMostPopularFiveProducts,
};

import db from "@/lib/prisma";

const getNewestProducts = async () =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

const getPopularProducts = async () =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: 5,
    orderBy: {
      order: { _count: "desc" },
    },
  });

const getAllProducts = async () =>
  await db.product.findMany({
    where: { isAvailable: true },
    take: 5,
    orderBy: { name: "asc" },
  });

export { getNewestProducts, getPopularProducts, getAllProducts };

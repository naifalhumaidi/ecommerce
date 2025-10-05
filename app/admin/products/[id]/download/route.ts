import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"
import { notFound } from "next/navigation";

const getProduct = async (id: string) => {
    const product = await db.product.findUnique({
        where: { id },
        select: {
            name: true,
            filePath: true
        }
    })
    if (product == null) return notFound();
    return product;
}

const getFileInfo = async (id: string) => {
    const product = await getProduct(id);
    return {
        file: (await fs.readFile(product.filePath)),
        size: (await fs.stat(product.filePath)).size,
        name: product?.name,
        extension: product?.filePath.split(".").pop()
    }
}

const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const { file, size, name, extension } = await getFileInfo(id);
    return new NextResponse(new Uint8Array(file), {
        headers: {
            "Content-Disposition": `attachment; filename="${name}.${extension}"`,
            "Content-Length": size.toString()
        }
    });
};

export { GET };

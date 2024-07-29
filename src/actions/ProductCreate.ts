"use server"

import prisma from "@/db"

interface ProductParams {
    name: string;
    price: number;
    description: string;
    imageurl: string;
}

export async function ProductCreate(params: ProductParams) {
    try {
        const addedProduct = await prisma.product.create({
            data: {
                name: params.name,
                price: Number(params.price),
                description: params.description,
                imageurl: params.imageurl,
            },
        });
        return addedProduct;
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while creating the product", error: e };
    }
}

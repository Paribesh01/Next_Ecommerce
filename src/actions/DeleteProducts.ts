"use server"

import prisma from "@/db"

export async function DeleteProduct(id:string) {
    try {
        const products = await prisma.product.delete({where:{
            id
        }});
        return products 
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}

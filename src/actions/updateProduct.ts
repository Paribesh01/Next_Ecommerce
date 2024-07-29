"use server"

import prisma from "@/db"

export async function UpdateProduct(data:any,id:string) {
    try {
        const products = await prisma.product.update({where:{
            id
        },
        data:{
            name:data.number,
            price:Number(data.price),
            imageurl:data.imageurl,
            description:data.description
        }
    });
        return products 
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}

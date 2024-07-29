"use server"

import prisma from "@/db"

export async function GetAllProducts() {
    try {
        const products = await prisma.product.findMany({});
        return products 
    } catch (e) {
        console.log(e);
        return { message: "An error occurred while retrieving the products", error: e };
    }
}


export async function GetProductById(id:string) {
        try{
            const product = await prisma.product.findUnique({where:{
                id
            }})
            return product
        }catch(e){
            console.log(e)
        }
}

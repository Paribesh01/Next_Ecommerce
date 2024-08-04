"use server"

import prisma from "@/db";

interface OrderDetails {
  email: string;
  address: string;
  landmark?: string;
  city: string;
  fullName?: string;
  phone?: string;
  orderNote?: string;
  paymentMethod?:string
}

export async function createOrderFromCart(details: OrderDetails,userEmail:string) {
  try {
    const { email, address, landmark, city, fullName, phone, orderNote ,paymentMethod} = details;

    // Validate user and retrieve the cart
    const user = await prisma.user.findUnique({ where: { email:userEmail } });
    if (!user) {
      throw new Error("User not found");
    }

    const userId = user.id;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });

    if (!cart) {
      throw new Error("Cart not found for the user");
    }

    if (cart.cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    // Calculate the total price
    const totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalPrice: totalPrice,
        address: address,
        landmark: landmark,
        city: city,
        fullName: fullName,
        email: email,
        phone: phone,
        orderNote: orderNote,
        paymentMethod:paymentMethod,
        orderItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    // Optionally, clear the cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
    console.log(order)
    console.log(`Order created successfully from cart for user ${userId}`);
    return order
  } catch (error) {
    console.error("Error creating order from cart:", error);
  } 
}

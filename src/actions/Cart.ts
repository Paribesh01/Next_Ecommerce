"use server"

import prisma from "@/db"
export async function getCartByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return { cartItems: [], subtotal: 0 };
    }

    const subtotal = cart.cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    return { ...cart, subtotal };
  } catch (e) {
    console.log(e);
    return { message: "An error occurred while retrieving the products", error: e };
  }
}




export async function AddToCart(email: string, productId: string, quantity: number = 1) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email:email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if the cart exists for the user
    let cart = await prisma.cart.findUnique({ where: { userId: user.id} });
    if (!cart) {
      // Create a cart for the user if it doesn't exist
      cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Check if the product is already in the cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (existingCartItem) {
      // Update the quantity if the item already exists in the cart
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
      return { message: "Item quantity updated", cartItem: updatedCartItem };
    } else {
      // Create a new cart item if it doesn't exist
      const cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        },
      });
      return  cartItem 
      console.log(cartItem);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}


export async function removeFromCart(email: string, productId: string) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the cart exists for the user
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Check if the product is in the cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (!existingCartItem) {
      throw new Error("Product not found in cart");
    }

    // Remove the product from the cart
    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    return { message: "Item removed from cart" };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}


export async function decreaseCartItemQuantity(email: string, productId: string) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the cart exists for the user
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (!cart) {
      throw new Error("Cart not found");
    }

    // Check if the product is in the cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (!existingCartItem) {
      throw new Error("Product not found in cart");
    }

    if (existingCartItem.quantity > 1) {
      // Decrease the quantity by 1
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 },
      });
      return { message: "Item quantity decreased", cartItem: updatedCartItem };
    } else {
      // If the quantity is 1, remove the item from the cart
      await prisma.cartItem.delete({
        where: { id: existingCartItem.id },
      });
      return { message: "Item removed from cart" };
    }
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    throw error;
  }
}


"use client";

import { AddToCart, getCartByEmail } from "@/actions/Cart";
import { cartItemState, subtotal } from "@/app/recoil/atom";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

export default function ProductOverviews(params: any) {
  const product = params.product;
  const { data: session } = useSession();
  const [cartProducts, setCartProducts] = useRecoilState(cartItemState);
  const [total, setTotal] = useRecoilState(subtotal);

  const handleCartAdd = async () => {
    if (session?.user?.email) {
      try {
        const addedProduct = await AddToCart(session.user.email, product.id);
        console.log(addedProduct);
        // setCartProduct(previous + added Product ) do this
        toast.success("Product is added to the cart.");
        const data: any = await getCartByEmail(session.user.email);
        setCartProducts(data.cartItems);
        setTotal(data.subtotal);
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    } else {
      console.log("User is not logged in");
    }
  };

  return (
    <div className="lg:flex lg:items-start lg:justify-center lg:gap-x-12 m-10">
      <div className="lg:w-1/3 h-96">
        <img
          alt={product.imageurl}
          src={product.imageurl}
          className="h-full w-full object-cover object-center rounded-lg"
        />
      </div>

      <div className="mt-6 lg:mt-0 lg:w-1/3">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {product.name}
        </h1>

        <div className="mt-4">
          <p className="text-3xl tracking-tight text-gray-900">
            Rs.{product.price}
          </p>
        </div>

        <div className="mt-10">
          <h3 className="sr-only">Description</h3>
          <div className="space-y-6">
            <p className="text-base text-gray-900">{product.description}</p>
          </div>
        </div>

        <button
          onClick={handleCartAdd}
          type="submit"
          className="flex mt-10 w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}

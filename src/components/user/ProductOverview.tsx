"use client";

import { AddToCart, getCartByEmail } from "@/actions/Cart";
import { cartItemState, subtotal } from "@/app/recoil/atom";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

export default function ProductOverview(params: any) {
  const product = params.product;
  const { data: session } = useSession();
  const [cartProducts, setCartProducts] = useRecoilState(cartItemState);
  const [total, setTotal] = useRecoilState(subtotal);

  const handleCartAdd = async () => {
    if (session?.user?.email) {
      try {
        const addedProduct = await AddToCart(session.user.email, product.id);
        console.log(addedProduct);
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
    <div>
      {session?.user?.email ? "yes" : "NO"}
      <div>
        <h2>{product.name}</h2>
        <img src={product.imageurl} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <button onClick={handleCartAdd}>Add to Cart</button>
      </div>
    </div>
  );
}

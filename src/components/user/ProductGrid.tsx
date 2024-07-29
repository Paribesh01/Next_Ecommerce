"use client";

import { GetAllProducts } from "@/actions/GetProduct";
import { productsState } from "@/app/recoil/atom";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function ProductGrid() {
  const [products, setProducts] = useRecoilState<any>(productsState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await GetAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
      }}
    >
      {products.map((product: any) => (
        <Link href={`/product/${product.id}`}>
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h1 className=" uppercase font-bold text-xl">{product.name}</h1>
            <img src={product.imageurl} alt={product.imageurl} />
            <p>
              <strong>Price:</strong> ${product.price}
              <button className=" ml-20">Buy</button>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

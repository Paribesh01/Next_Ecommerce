"use client";
import React, { useEffect, useState } from "react";
import ProductRow from "./ProductRow";
import { GetAllProducts } from "@/actions/GetProduct";
import { useRecoilState } from "recoil";
import { productsState } from "@/app/recoil/atom";

interface Product {
  id: number;
  name: string;
  price: number;
  imageurl: string;
  description: string;
}

const ProductTable = () => {
  const [products, setProducts] = useRecoilState<any>(productsState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: any = await GetAllProducts();
        setProducts(data);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 text-left">
            <th className="px-4 py-2">S.N</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index: any) => (
            <ProductRow key={product.id} product={product} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

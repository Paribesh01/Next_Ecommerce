"use client";
import { DeleteProduct } from "@/actions/DeleteProducts";
import { GetAllProducts } from "@/actions/GetProduct";
import { UpdateProduct } from "@/actions/updateProduct";
import { productsState } from "@/app/recoil/atom";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const ProductRow = ({ product, index }: any) => {
  const [products, setProducts] = useRecoilState<any>(productsState);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState({ ...product });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await UpdateProduct(editProduct, product.id);
    const data: any = await GetAllProducts();
    setProducts(data);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditProduct({ ...product });
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    await DeleteProduct(product.id);
    const data: any = await GetAllProducts();
    setProducts(data);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{index}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={editProduct.name}
            onChange={handleChange}
            className="border"
          />
        ) : (
          product.name
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="number"
            name="price"
            value={editProduct.price}
            onChange={handleChange}
            className="border"
          />
        ) : (
          product.price
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            name="imageurl"
            value={editProduct.imageurl}
            onChange={handleChange}
            className="border"
          />
        ) : (
          <img
            src={product.imageurl}
            alt={product.name}
            className="w-12 h-12"
          />
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <textarea
            name="description"
            placeholder="Description"
            value={editProduct.description}
            onChange={handleChange}
            className="border"
          />
        ) : product.description.length > 30 ? (
          `${product.description.substring(0, 30)} ...`
        ) : (
          product.description
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;

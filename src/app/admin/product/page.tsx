"use client";

import React, { useState } from "react";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";

const AdminProductControlPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Product Control</h1>
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Product
      </button>
      <ProductTable />
      <AddProductModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default AdminProductControlPage;

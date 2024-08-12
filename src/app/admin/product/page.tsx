"use client";

import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import AddProductModal from "@/components/AddProductModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use this for redirection

const AdminProductControlPage = () => {
  const { data: session, status }: any = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "loading" || !isClient) {
      return;
    }

    if (!session || session.user.role !== "admin") {
      router.push("/"); // Use router.push for client-side redirection
    }
  }, [status, session, isClient, router]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  if (status === "loading" || !isClient) {
    return <div>Loading...</div>;
  }

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

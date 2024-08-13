"use client";

import { createOrderFromCart } from "@/actions/order";
import { cartItemState, subtotal } from "@/app/recoil/atom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: session } = useSession();

  const router = useRouter();

  const [products, setProducts] = useRecoilState<any>(cartItemState);
  const [total, setTotal] = useRecoilState(subtotal);

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");

  const handelSumbit = async (event: any) => {
    event.preventDefault(); // Prevent form from reloading the page

    const orderDetails = {
      email,
      address,
      landmark,
      city,
      fullName,
      phone,
      orderNote,
      paymentMethod,
    };

    try {
      if (session?.user?.email) {
        const order = await createOrderFromCart(
          orderDetails,
          session.user.email
        );
        console.log(order);
        if (order) {
          router.push("/");
          setFullName("");
          setEmail("");
          setPhone("");
          setOrderNote("");
          setAddress("");
          setLandmark("");
          setCity("");

          toast.success("Order is Created");
        }
      }
      // Optionally show a success message
    } catch (error) {
      console.error("Error creating order:", error);
      // Optionally show an error message
    }
  };

  const handlePaymentMethodChange = (value: any) => {
    setPaymentMethod(value);
  };

  return (
    <form className="p-4 max-w-5xl mx-auto" onSubmit={handelSumbit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checkout Details */}
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="5" y1="12" x2="11" y2="18" />
                  <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
              </button>
              <p className="text-lg font-semibold">Checkout</p>
            </div>
            <p className="text-sm font-bold mb-4">1. General Information</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="full-name"
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="full-name"
                  placeholder="e.g. Ram Bahadur"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="email"
                  placeholder="e.g. john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-4">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="phone"
                  placeholder="e.g. 9862200000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="order-note"
                >
                  Order Note (any message for us)
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="order-note"
                  placeholder="e.g. I was searching for this product for so long."
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm font-bold mb-4">2. Delivery Address</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="address"
                >
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="address"
                  placeholder="e.g. Kathmandu, Tinkune"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="landmark"
                >
                  Landmark
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded"
                  id="landmark"
                  placeholder="e.g. Madan Bhandari Park"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="city">
                City / District<span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded"
                id="city"
                placeholder="e.g. Kathmandu"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">Order Summary</p>
            {products.length > 0 ? (
              products.map((product: any) => (
                <a
                  key={product.product.id}
                  href={`/product${product.product.id}`}
                  className="group flex items-center mb-4"
                >
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gray-200">
                    <img
                      alt={product.product.imageurl}
                      src={product.product.imageurl}
                      className="w-full h-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm text-gray-700">
                      {product.product.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      Rs. {product.product.price}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p>No items in cart</p>
            )}
            <div className="border-t border-gray-200 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <p>Sub-total</p>
                <p>रू {total}</p>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <p>Delivery Charge</p>
                <p>FREE</p>
              </div>
              <div className="flex justify-between text-sm font-semibold mb-4">
                <p>Total</p>
                <p>रू {total}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold mb-2">Payment Method</p>
                <div className="flex gap-4">
                  <div
                    className={`cursor-pointer p-4 rounded border border-gray-300 ${
                      paymentMethod === "cod"
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handlePaymentMethodChange("cod")}
                  >
                    <img
                      src="https://i.pinimg.com/736x/ab/b5/2c/abb52c0ac3fb3c96ebde3207c8992a02.jpg"
                      alt="COD"
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div
                    className={`cursor-pointer p-4 rounded border border-gray-300 ${
                      paymentMethod === "esewa"
                        ? "bg-blue-100 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handlePaymentMethodChange("esewa")}
                  >
                    <img
                      src="https://play-lh.googleusercontent.com/MRzMmiJAe0-xaEkDKB0MKwv1a3kjDieSfNuaIlRo750_EgqxjRFWKKF7xQyRSb4O95Y"
                      alt="eSewa"
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;

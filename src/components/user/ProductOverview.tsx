"use client";

export default function ProductOverview(params: any) {
  const product = params.product;

  return (
    <div>
      this is the product overview: Name: {product.name}
      <img src={product.imageurl} alt={product.imageurl} />
      Des: {product.description}
      Price: {product.price}
    </div>
  );
}

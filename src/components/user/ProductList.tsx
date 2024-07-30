import { GetAllProducts } from "@/actions/GetProduct";
import { productsState } from "@/app/recoil/atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default async function ProductList() {
  const products: any = await GetAllProducts();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: any) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={product.imageurl}
                  src={product.imageurl}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                Rs. {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

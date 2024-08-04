import { GetProductById } from "@/actions/GetProduct";
import ProductOverviews from "@/components/user/ProductOverviews";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await GetProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductOverviews product={product} />
    </div>
  );
}

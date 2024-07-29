import { GetProductById } from "@/actions/GetProduct";
import ProductOverview from "@/components/user/ProductOverview";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";

export default async function Page({ params }: { params: { id: string } }) {
  const product = await GetProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <p>
      <ProductOverview product={product} />
    </p>
  );
}

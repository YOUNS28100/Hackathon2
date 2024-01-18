import { useLoaderData } from "react-router-dom";
import Products from "../components/Products";

function ProductsPage() {
  const product = useLoaderData();
  return (
    <div className="mt-32">
      <Products product={product} />
    </div>
  );
}

export default ProductsPage;

import { getProductsData } from "@/lib/getData";
import { ProductData } from "../../types";
import ProductCard from "@/components/ProductCard";

const ProductList = async () => {
  const products: ProductData[] = await getProductsData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:px-4 px-2">
      {products?.map((product) => (
        <ProductCard key={product?._id} product={product} />
      ))}
    </div>
  );
};
export default ProductList;

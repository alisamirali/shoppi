import Container from "@/components/Container";
import ProductList from "@/components/ProductList";

const ShopPage = () => {
  return (
    <Container className="py-8">
      <h2 className="text-2xl font-semibold mb-5">All Available Products</h2>

      <ProductList />
    </Container>
  );
};
export default ShopPage;

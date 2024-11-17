import Container from "@/components/Container";
import Orders from "@/components/Orders";

const OrdersPage = () => {
  return (
    <Container className="py-8">
      <h2 className="text-2xl font-semibold mb-5">Your Orders</h2>

      <Orders />
    </Container>
  );
};
export default OrdersPage;

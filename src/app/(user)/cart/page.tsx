import { auth } from "@/auth";
import CartContainer from "@/components/CartContainer";
import Container from "@/components/Container";

const CartPage = async () => {
  const session = await auth();

  return (
    <Container className="py-8">
      <CartContainer session={session} />
    </Container>
  );
};
export default CartPage;

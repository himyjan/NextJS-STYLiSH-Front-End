import Cart from "@/components/Cart/Cart";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  return (
    <div className="px-[24px] block">
      <Cart />
      <CheckoutForm />
    </div>
  );
};

export default Checkout;

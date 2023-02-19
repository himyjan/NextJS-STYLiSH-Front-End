import Cart from "@/components/Cart/Cart";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  return (
    <div className="px-[24px] block xl:px-[0px] xl:flex xl:flex-col xl:items-center ">
      <Cart />
      <CheckoutForm />
    </div>
  );
};

export default Checkout;

import Cart from '@/components/Cart/Cart';
import CheckoutForm from '@/components/CheckoutForm/CheckoutForm';

const Checkout = () => {
  return (
    <div className="block px-[24px] xl:flex xl:flex-col xl:items-center xl:px-[0px] ">
      <Cart />
      <CheckoutForm />
    </div>
  );
};

export default Checkout;

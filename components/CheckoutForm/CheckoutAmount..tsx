import { useSelector } from "react-redux";
import { RootState } from "@/store";

const FREIGHT = 30;

const CheckoutAmount = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>總金額</div>
        <div>NT.</div>
        <div>{cart.amount}</div>
      </div>
    </div>
  );
};

export default CheckoutAmount;

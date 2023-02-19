import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ThankYou = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  if (!cart.orderNumber) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center">
      <div>{`訂單編號:${cart.orderNumber}已成立`}</div>
    </div>
  );
};

export default ThankYou;

import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CheckoutAmount = ({ freight }: { freight: number }) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="flex flex-col items-end gap-[20px] mb-[36px]">
      <div className="flex items-center w-[240px]">
        <div className="text-[16px] leading-[19px] text-light-black flex-1">
          總金額
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {cart.amount}
        </div>
      </div>
      <div className="flex items-center w-[240px]">
        <div className="text-[16px] leading-[19px] text-light-black flex-1">
          運費
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {freight}
        </div>
      </div>
      <div className="border-b border-light-black w-[240px]" />
      <div className="flex items-center w-[240px]">
        <div className="text-[16px] leading-[19px] text-light-black flex-1">
          運費
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {cart.amount + freight}
        </div>
      </div>
    </div>
  );
};

export default CheckoutAmount;

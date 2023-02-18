import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartItem from "./CartItem";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="pt-[20px] px-[24px]">
      <div className="flex flex-col">
        <div className="flex mb-[10px]">
          <div className="text-1 leading-[19px] font-bold">{`購物車(${cart.totalQuantity})`}</div>
          <div className="hidden">數量</div>
          <div className="hidden">單價</div>
          <div className="hidden">小計</div>
        </div>
        <div className="flex flex-col">
          {cart.items.map((item) => (
            <CartItem
              key={`cart-item-${item.id}-${item.colorCode}-${item.size}`}
              data={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { storeCartDataHandler } from "@/store/cart-actions";

let isInitial = false;

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (isInitial) {
      isInitial = true;
      return;
    }

    if (cart.changed) {
      storeCartDataHandler(cart);
    }
  }, [cart]);

  return (
    <div className="pt-[20px] xl:w-[1160px] xl:pt-[51px] xl:mb-[50px]">
      <div className="flex flex-col">
        <div className="flex mb-[10px]">
          <div className="text-1 leading-[19px] font-bold xl:flex-1">{`購物車(${cart.totalQuantity})`}</div>
          <div className="hidden text-[16px] leading-[19px] w-[192px] xl:block">
            數量
          </div>
          <div className="hidden text-[16px] leading-[19px] w-[192px] xl:block">
            單價
          </div>
          <div className="hidden text-[16px] leading-[19px] w-[192px] xl:block">
            小計
          </div>
          <div className="hidden xl:block xl:ml-[52px]" />
        </div>
        <div className="flex flex-col xl:border xl:border-light-grey-4 xl:px-[30px] xl:py-[40px]">
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

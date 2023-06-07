import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CartItem from './CartItem';
import { useEffect } from 'react';
import { storeCartDataHandler } from '@/store/cart-actions';

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
    <div className="pt-[20px] xl:mb-[50px] xl:w-[1160px] xl:pt-[51px]">
      <div className="flex flex-col">
        <div className="mb-[10px] flex">
          <div className="text-1 font-bold leading-[19px] xl:flex-1">{`購物車(${cart.totalQuantity})`}</div>
          <div className="hidden w-[192px] text-[16px] leading-[19px] xl:block">
            數量
          </div>
          <div className="hidden w-[192px] text-[16px] leading-[19px] xl:block">
            單價
          </div>
          <div className="hidden w-[192px] text-[16px] leading-[19px] xl:block">
            小計
          </div>
          <div className="hidden xl:ml-[52px] xl:block" />
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

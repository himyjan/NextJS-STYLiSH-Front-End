import type { AppDispatch } from '@/store';
import { cartActions } from '@/store/cart-slice';
import type { Cart } from '@/types/types';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const CartItem = ({ data }: { data: Cart }) => {
  const dispatch = useDispatch<AppDispatch>();

  const quantityHandler = (newQuantity: string) => {
    const newQuantityNum = Number(newQuantity);
    if (newQuantityNum === data.quantity) return;
    const newItem = { ...data, quantity: newQuantityNum };
    dispatch(cartActions.editQuantity(newItem));
  };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(data));
  };

  return (
    <div className="relative border-t border-light-black pb-[20px] pt-[10px] xl:flex xl:items-center xl:border-none xl:p-[0px]">
      <div className="mb-[20px] flex gap-x-[10px] xl:flex-1">
        <div className="relative h-[152px] w-[114px] flex-shrink-0">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="h-full w-full"
            src={data.main_image}
            alt={data.title}
            loading="lazy"
          />
        </div>
        <div>
          <div className="mb-[20px] text-[14px] leading-[17px] text-black xl:mb-[18px] xl:text-[16px] xl:leading-[19px]">
            {data.title}
          </div>
          <div className="mb-[24px] text-[14px] leading-[17px] text-light-black xl:mb-[22px] xl:text-[16px] xl:leading-[19px]">
            {data.id}
          </div>
          <div className="mb-[12px] flex h-[17px] items-center xl:mb-[10px]">
            <div className="mr-[8px] border-r border-light-black pr-[8px] text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              顏色
            </div>
            <div className="text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              {data.colorName}
            </div>
          </div>
          <div className="flex h-[17px] items-center">
            <div className="mr-[8px] border-r border-light-black pr-[8px] text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              尺寸
            </div>
            <div className="text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              {data.size}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-[12px]">
        <div className="flex w-full items-center justify-center xl:hidden">
          <div className="flex-1 text-center text-[14px] leading-[17px]">
            數量
          </div>
          <div className="flex-1 text-center text-[14px] leading-[17px]">
            單價
          </div>
          <div className="flex-1 text-center text-[14px] leading-[17px]">
            小計
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex-1 text-center text-[14px] leading-[17px]  xl:w-[192px] xl:text-[16px] xl:leading-[19px]">
            <select
              className="h-[30px] w-[80px] rounded border border-light-grey-3 bg-light-grey-5 px-[10px] text-light-black"
              value={data.quantity}
              onChange={(e) => {
                quantityHandler(e.target.value);
              }}
            >
              {Array.from({ length: data.curStock }, (num, i) => i + 1).map(
                (num) => {
                  return (
                    <option
                      key={`${data.id}-${data.colorCode}-${data.size}-option-${num}`}
                      value={num}
                    >
                      {num}
                    </option>
                  );
                },
              )}
            </select>
          </div>
          <div className="flex-1 text-center text-[14px] leading-[17px] xl:w-[192px] xl:text-[16px] xl:leading-[19px]">{`TWD.${data.price}`}</div>
          <div className="flex-1 text-center text-[14px] leading-[17px] xl:w-[192px] xl:text-[16px] xl:leading-[19px]">{`TWD.${
            data.price * data.quantity
          }`}</div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-[44px] w-[44px] xl:relative xl:ml-[52px]">
        <button
          className="h-[44px] w-[44px] bg-cart-remove bg-cover bg-center hover:bg-cart-remove-hover"
          onClick={removeItemHandler}
        />
      </div>
    </div>
  );
};

export default CartItem;

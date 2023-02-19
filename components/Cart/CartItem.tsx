import { AppDispatch } from "@/store";
import { cartActions } from "@/store/cart-slice";
import { Cart } from "@/types/types";
import Image from "next/image";
import { useDispatch } from "react-redux";

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
    <div className="pt-[10px] pb-[20px] border-t border-light-black relative xl:flex xl:items-center xl:p-[0px] xl:border-none">
      <div className="flex gap-x-[10px] mb-[20px] xl:flex-1">
        <div className="w-[114px] h-[152px] relative flex-shrink-0">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full"
            src={data.main_image}
            alt={data.title}
            loading="lazy"
          />
        </div>
        <div>
          <div className="text-[14px] leading-[17px] text-black mb-[20px] xl:text-[16px] xl:leading-[19px] xl:mb-[18px]">
            {data.title}
          </div>
          <div className="text-[14px] leading-[17px] text-light-black mb-[24px] xl:text-[16px] xl:leading-[19px] xl:mb-[22px]">
            {data.id}
          </div>
          <div className="flex h-[17px] items-center mb-[12px] xl:mb-[10px]">
            <div className="text-[14px] leading-[17px] text-light-black pr-[8px] mr-[8px] border-r border-light-black xl:text-[16px] xl:leading-[19px]">
              顏色
            </div>
            <div className="text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              {data.colorName}
            </div>
          </div>
          <div className="flex h-[17px] items-center">
            <div className="text-[14px] leading-[17px] text-light-black pr-[8px] mr-[8px] border-r border-light-black xl:text-[16px] xl:leading-[19px]">
              尺寸
            </div>
            <div className="text-[14px] leading-[17px] text-light-black xl:text-[16px] xl:leading-[19px]">
              {data.size}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-[12px]">
        <div className="flex items-center justify-center w-full xl:hidden">
          <div className="text-[14px] leading-[17px] text-center flex-1">
            數量
          </div>
          <div className="text-[14px] leading-[17px] text-center flex-1">
            單價
          </div>
          <div className="text-[14px] leading-[17px] text-center flex-1">
            小計
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="text-[14px] leading-[17px] text-center flex-1  xl:w-[192px] xl:text-[16px] xl:leading-[19px]">
            <select
              className="text-light-black bg-light-grey-5 w-[80px] h-[30px] px-[10px] border border-light-grey-3 rounded"
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
                }
              )}
            </select>
          </div>
          <div className="text-[14px] leading-[17px] text-center flex-1 xl:w-[192px] xl:text-[16px] xl:leading-[19px]">{`TWD.${data.price}`}</div>
          <div className="text-[14px] leading-[17px] text-center flex-1 xl:w-[192px] xl:text-[16px] xl:leading-[19px]">{`TWD.${
            data.price * data.quantity
          }`}</div>
        </div>
      </div>
      <div className="w-[44px] h-[44px] absolute top-0 right-0 xl:relative xl:ml-[52px]">
        <button
          className="bg-cart-remove w-[44px] h-[44px] bg-cover bg-center hover:bg-cart-remove-hover"
          onClick={removeItemHandler}
        />
      </div>
    </div>
  );
};

export default CartItem;

import { Colors, Variants } from "@/types/types";
import { useState } from "react";

const ProductVariants = ({
  variants,
  colors,
  sizes,
}: {
  variants: Variants[];
  colors: Colors[];
  sizes: string[];
}) => {
  const [selectedVariants, setSelectVariants] = useState({});
  //   console.log(variants);

  //   console.log(colors);
  return (
    <div className="flex flex-col mb-[28px]">
      <div className="flex justify-start items-center mb-[28px]">
        <div className="text-[14px] leading-[17px] tracking-product-var-sm pr-[8px] border-r border-light-black">
          顏色
        </div>
        {colors?.length > 0 &&
          colors?.map((item) => {
            return (
              <div
                key={`color-${item.code}`}
                className="w-[36px] h-[36px] flex justify-center items-center border border-light-grey-3 ml-[15px]"
              >
                <button
                  className="w-[24px] h-[24px] border border-light-grey "
                  style={{ backgroundColor: `#${item.code}` }}
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-start items-center mb-[38px]">
        <div className="text-[14px] leading-[17px] tracking-product-var-sm pr-[8px] border-r border-light-black">
          尺寸
        </div>
        {sizes?.length > 0 &&
          sizes?.map((item) => {
            return (
              <button
                key={`size-${item}`}
                className="w-[36px] h-[36px] flex justify-center items-center rounded-full bg-black text-white ml-[15px]"
              >
                {item}
              </button>
            );
          })}
      </div>
      <div className="w-full h-[44px] flex justify-between items-center px-[35px] mb-[10px] border border-light-grey-3">
        <button className="text-[16px]">-</button>
        <div className="text-[20px] leading-[22px] text-brown">1</div>
        <button className="text-[16px]">+</button>
      </div>
      <button className="w-full h-[44px] bg-black text-white">
        加入購物車
      </button>
    </div>
  );
};

export default ProductVariants;

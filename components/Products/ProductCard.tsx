import { ProductData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }: { data: ProductData }) => {
  return (
    <div className="w-img-w-sm flex-shrink-0 flex flex-col h-fit relative xl:w-[360px]">
      <Link href={`/product/${data.id}`} className="cursor-pointer">
        <div className="w-full h-img-h-sm overflow-hidden relative xl:w-[360px] xl:h-[480px]">
          <Image fill sizes="100%" src={data.main_image} alt={data.title} />
        </div>
      </Link>
      <div className="flex pt-[10px] gap-x-[6px] xl:pt-[20px] xl:gap-x-[10px]">
        {data.colors.length > 0 &&
          data.colors.map((color) => {
            return (
              <div
                key={`${data.id}-${color.code}`}
                className="w-[12px] h-[12px] border border-light-grey xl:w-[24px] xl:h-[24px]"
                style={{ backgroundColor: `#${color.code}` }}
              />
            );
          })}
      </div>
      <div className="pt-[10px] tracking-product-text-sm text-xs leading-[14px] xl:text-[20px] xl:leading-[24px] xl:pt-[20px]">
        {data.title}
      </div>
      <div className="pt-[8px] pb-[24px] tracking-product-text-sm text-xs leading-[14px] xl:text-[20px] xl:leading-[24px] xl:pt-[10px]">{`NT.${data.price}`}</div>
    </div>
  );
};

export default ProductCard;

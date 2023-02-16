import { ProductData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ data }: { data: ProductData }) => {
  return (
    <div className="w-img-w-sm flex-shrink-0 flex flex-col h-fit relative">
      <Link href={`/product/${data.id}`}>
        <div className="w-full h-img-h-sm overflow-hidden relative">
          <Image fill sizes="100%" src={data.main_image} alt={data.title} />
        </div>
      </Link>
      <div className="flex pt-[10px] gap-x-[6px]">
        {data.colors.length > 0 &&
          data.colors.map((color) => {
            return (
              <div
                key={`${data.id}-${color.code}`}
                className="w-[12px] h-[12px] border border-light-grey"
                style={{ backgroundColor: `#${color.code}` }}
              />
            );
          })}
      </div>
      <div className="pt-[10px] tracking-product-text-sm text-xs leading-[14px]">
        {data.title}
      </div>
      <div className="pt-[8px] pb-[24px] tracking-product-text-sm text-xs leading-[14px]">{`NT.${data.price}`}</div>
    </div>
  );
};

export default ProductCard;

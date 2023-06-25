import type { ProductData } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ data }: { data: ProductData }) => {
  return (
    <Link
      href={`/product/${data.id}`}
      className="mx-[3px] w-[calc(50%-6px)] xl:mx-[20px] xl:mb-[50px] xl:w-[360px]"
    >
      <Image
        width="0"
        height="0"
        sizes="100vw"
        className="w-full align-middle"
        src={data.main_image}
        alt={data.title}
        loading="lazy"
      />
      <div className="flex gap-x-[6px] pt-[10px] xl:gap-x-[10px] xl:pt-[20px]">
        {data.colors.length > 0 &&
          data.colors.map((color) => {
            return (
              <div
                key={`${data.id}-${color.code}`}
                className="h-[12px] w-[12px] border border-light-grey xl:h-[24px] xl:w-[24px]"
                style={{ backgroundColor: `#${color.code}` }}
              />
            );
          })}
      </div>
      <div className="pt-[10px] text-[12px] leading-[14px] tracking-product-text-sm xl:pt-[20px] xl:text-[20px] xl:leading-[24px]">
        {data.title}
      </div>
      <div className="pb-[24px] pt-[8px] text-xs leading-[14px] tracking-product-text-sm xl:pt-[10px] xl:text-[20px] xl:leading-[24px]">{`NT.${data.price}`}</div>
    </Link>
  );
};

export default ProductCard;

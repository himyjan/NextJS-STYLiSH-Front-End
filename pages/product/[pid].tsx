import api from '../../utils/api';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { useEffect, useState } from 'react';
import type { ProductData } from '@/types/types';
import Image from 'next/image';
import ProductVariants from '@/components/Product/ProductVariants';
import { storeCartDataHandler } from '@/store/cart-actions';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

let isInitial = false;

const Product = ({ productData }: { productData: ProductData | null }) => {
  const [error, setError] = useState<string>('');
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (productData === null) {
      setError('商品不存在');
    }
  }, [productData]);

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
    <>
      {productData && !error && (
        <div className="xl:flex xl:flex-col xl:items-center xl:pt-[65px]">
          <div className="flex w-full flex-col xl:w-[960px]">
            <div className="xl:flex xl:w-full">
              <div className="relative mb-[17px] w-full xl:h-[746.67px] xl:w-[560px]">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={productData.main_image}
                  alt={productData.title}
                  className="h-auto w-full"
                  priority
                />
              </div>
              <div className="mb-[28px] px-[24px] xl:mb-[50.33px] xl:flex-1 xl:pl-[40px] xl:pr-[0px]">
                <div className="xl:tracking-product-title-xl mb-[10px] text-[20px] leading-[24px] tracking-product-title-sm text-light-black xl:mb-[16px] xl:text-[32px] xl:leading-[38px]">
                  {productData.title}
                </div>
                <div className="mb-[20px] text-[16px] leading-[19px] tracking-product-id-sm text-light-grey-2 xl:mb-[40px] xl:text-[20px] xl:leading-[24px]">
                  {productData.id}
                </div>
                <div className="mb-[30px] border-b border-light-black pb-[10px] text-[20px] leading-[24px] text-light-black xl:pb-[20px] xl:text-[30px] xl:leading-[36px]">
                  TWD.{productData.price}
                </div>
                <ProductVariants
                  variants={productData.variants}
                  colors={productData.colors}
                  sizes={productData.sizes}
                  id={String(productData.id)}
                  title={productData.title}
                  price={productData.price}
                  mainImage={productData.main_image}
                />
                <div className="mb-[24px] text-[14px] leading-[24px] xl:mb-[30px] xl:text-[20px] xl:leading-[30px]">
                  實品顏色依單品照為主
                </div>
                <div className="text-[14px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                  {productData.texture}
                </div>
                <div className="mb-[24px] whitespace-pre text-[14px] leading-[24px] xl:mb-[30px] xl:text-[20px] xl:leading-[30px]">
                  {productData.description}
                </div>
                <div className="text-[14px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                  {productData.wash}
                </div>
                <div className="text-[14px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                  {productData.place}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col px-[24px] xl:px-[0px]">
              <div className="mb-[12px] flex items-center xl:mb-[28px]">
                <div className="pr-[35px] text-[16px] leading-[30px] text-brown xl:pr-[65px] xl:text-[20px] xl:leading-[30px]">
                  更多產品資訊
                </div>
                <div className="flex-1 border-b border-light-black" />
              </div>
              <div className="mb-[20px] text-[14px] leading-[25px] text-light-black xl:mb-[30px] xl:text-[20px] xl:leading-[30px]">
                {productData.story}
              </div>
              <div className="mb-[32px] flex w-full flex-col gap-y-[20px] xl:mb-[49px] xl:gap-y-[30px]">
                {productData.images.map((image, index) => {
                  return (
                    <div
                      className="relative block w-full"
                      key={`image-${index + 1}`}
                    >
                      <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        src={image}
                        alt={productData.title}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full p-[50px] text-center text-[30px]">{error}</div>
      )}
    </>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const url = (params as ParsedUrlQuery).pid as string;

  const fetchProductHandler = async () => {
    const response = await api.getProduct(url);
    const data = response.data as ProductData | null;
    return data;
  };
  const data = await fetchProductHandler();

  return {
    props: { productData: data },
  };
};

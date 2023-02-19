import api from "../../utils/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductData } from "@/types/types";
import Image from "next/image";
import ProductVariants from "@/components/Product/ProductVariants";
import { storeCartDataHandler } from "@/store/cart-actions";

let isInitial = false;

const Product = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string>("");
  const [id, setId] = useState<string>("");
  const router = useRouter();
  const { pid } = router.query;
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchProductHandler = async () => {
      if (typeof pid !== "string") return;
      setId(pid);

      try {
        const response = await api.getProduct(pid);
        const data = response.data as ProductData | null;
        if (data === null) {
          throw new Error("invalid id");
        }
        setProductData(data);
      } catch (err) {
        setError("Something went wrong!");
        console.log(err);
      }
    };

    fetchProductHandler();
  }, [pid, router.isReady]);

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
          <div className="w-full flex flex-col xl:w-[960px]">
            <div className="xl:flex xl:w-full">
              <div className="w-full relative mb-[17px] xl:w-[560px] xl:h-[746.67px]">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  src={productData.main_image}
                  alt={productData.title}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="mb-[28px] px-[24px] xl:pr-[0px] xl:pl-[40px] xl:flex-1 xl:mb-[50.33px]">
                <div className="text-[20px] leading-[24px] text-light-black mb-[10px] tracking-product-title-sm xl:text-[32px] xl:leading-[38px] xl:mb-[16px] xl:tracking-product-title-xl">
                  {productData.title}
                </div>
                <div className="text-[16px] leading-[19px] text-light-grey-2 mb-[20px] tracking-product-id-sm xl:text-[20px] xl:leading-[24px] xl:mb-[40px]">
                  {productData.id}
                </div>
                <div className="text-[20px] leading-[24px] text-light-black pb-[10px] border-b border-light-black mb-[30px] xl:text-[30px] xl:leading-[36px] xl:pb-[20px]">
                  TWD.{productData.price}
                </div>
                <ProductVariants
                  variants={productData.variants}
                  colors={productData.colors}
                  sizes={productData.sizes}
                  id={id}
                  title={productData.title}
                  price={productData.price}
                  mainImage={productData.main_image}
                />
                <div className="text-[14px] leading-[24px] mb-[24px] xl:text-[20px] xl:leading-[30px] xl:mb-[30px]">
                  實品顏色依單品照為主
                </div>
                <div className="text-[14px] leading-[24px] xl:text-[20px] xl:leading-[30px]">
                  {productData.texture}
                </div>
                <div className="text-[14px] leading-[24px] mb-[24px] whitespace-pre xl:text-[20px] xl:leading-[30px] xl:mb-[30px]">
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
            <div className="w-full flex flex-col px-[24px] xl:px-[0px]">
              <div className="flex items-center mb-[12px] xl:mb-[28px]">
                <div className="text-[16px] leading-[30px] text-brown pr-[35px] xl:text-[20px] xl:leading-[30px] xl:pr-[65px]">
                  更多產品資訊
                </div>
                <div className="border-b border-light-black flex-1" />
              </div>
              <div className="text-[14px] leading-[25px] text-light-black mb-[20px] xl:text-[20px] xl:leading-[30px] xl:mb-[30px]">
                {productData.story}
              </div>
              <div className="flex flex-col w-full gap-y-[20px] mb-[32px] xl:gap-y-[30px] xl:mb-[49px]">
                {productData.images.map((image, index) => {
                  return (
                    <div
                      className="w-full block relative"
                      key={`image-${index + 1}`}
                    >
                      <Image
                        width="0"
                        height="0"
                        sizes="100vw"
                        src={image}
                        alt={productData.title}
                        className="w-full h-auto"
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
    </>
  );
};

export default Product;

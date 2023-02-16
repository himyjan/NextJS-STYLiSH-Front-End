import api from "../../utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductData } from "@/types/types";
import Image from "next/image";
import ProductVariants from "@/components/Product/ProductVariants";

const Product = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    if (!router.isReady) return;

    const fetchProductHandler = async () => {
      if (typeof pid !== "string") return;

      try {
        const response = await api.getProduct(pid);
        const data = response.data as ProductData | null;
        if (data === null) {
          throw new Error("invalid id");
        }
        setProductData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProductHandler();
  }, [pid, router.isReady]);

  return (
    <>
      {productData && !isLoading && !error && (
        <div className="w-full flex flex-col">
          <div className="w-full relative mb-[17px]">
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
          <div className="px-[24px]">
            <div className="text-[20px] leading-[24px] text-light-black mb-[10px] tracking-product-title-sm">
              {productData.title}
            </div>
            <div className="text-[16px] leading-[19px] text-light-grey-2 mb-[20px] tracking-product-id-sm">
              {productData.id}
            </div>
            <div className="text-[20px] leading-[24px] text-light-black pb-[10px] border-b border-light-black mb-[30px]">
              TWD.{productData.price}
            </div>
            <ProductVariants />
            <div className="text-[14px] leading-[24px] mb-[24px]">
              實品顏色依單品照為主
            </div>
            <div className="text-[14px] leading-[24px]">
              {productData.texture}
            </div>
            <div className="text-[14px] leading-[24px] mb-[24px] whitespace-pre">
              {productData.description}
            </div>
            <div className="text-[14px] leading-[24px]">{productData.wash}</div>
            <div className="text-[14px] leading-[24px] mb-[28px]">
              {productData.place}
            </div>
            <div className="flex items-center mb-[12px]">
              <div className="text-[16px] leading-[30px] text-brown pr-[35px]">
                更多產品資訊
              </div>
              <div className="border-b border-light-black flex-1" />
            </div>
            <div className="text-[14px] leading-[25px] text-light-black mb-[20px]">
              {productData.story}
            </div>
            <div className="flex flex-col w-full gap-y-[20px] mb-[32px]">
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
      )}
    </>
  );
};

export default Product;

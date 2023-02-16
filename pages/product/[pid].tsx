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
    console.log(pid);

    const fetchProductHandler = async () => {
      if (typeof pid !== "string") return;

      try {
        const response = await api.getProduct(pid);
        console.log(response.data);
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
          <div className="w-full h-img-product-h-sm relative">
            <Image fill src={productData.main_image} alt={productData.title} />
          </div>
          <div className="px-[24px]">
            <div>{productData.title}</div>
            <div>{productData.id}</div>
            <div>TWD.{productData.price}</div>
            <ProductVariants />
            <div>實品顏色依單品照為主</div>
            <div>{productData.texture}</div>
            <div>{productData.description}</div>
            <div>{productData.wash}</div>
            <div>{productData.place}</div>
            <div>
              <div>更多產品資訊</div>
              <div />
            </div>
            <div>{productData.story}</div>
            {productData.images.map((image, index) => {
              return (
                <div
                  className="w-full h-img-product-h-sm relative"
                  key={`image-${index + 1}`}
                >
                  <Image fill src={image} alt={productData.title} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;

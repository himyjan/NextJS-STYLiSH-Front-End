import { ProductData } from "@/types/types";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const Products = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [paging, setPaging] = useState<number | undefined>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<IntersectionObserver | null>(null);

  const router = useRouter();
  const fetchProductsHandler = async () => {
    if (isLoading || router.query.category) return;
    const category = router.query.category || "all";
    console.log(category);
    if (typeof category !== "string" || typeof paging !== "number") return;
    try {
      setIsLoading(true);
      const response = await api.getProducts(category, paging);
      const data = response.data as ProductData[];
      const nextPaging = response.next_paging as number | undefined;
      setProductData(data);
      setPaging(nextPaging);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  //   const observerHandler=(entries)=>{
  //     entries.forEach(entry=>{
  //         if(entry.isIn)
  //     })
  //   }

  useEffect(() => {
    fetchProductsHandler();
  }, []);

  return (
    <div className="flex flex-wrap gap-x-img-container-gap-sm justify-center items- mx-auto -mb-img-container-mb-sm pt-img-container-pt-sm pb-img-container-pb-sm">
      {productData?.map((product) => {
        return <ProductCard key={`product-${product.id}`} data={product} />;
      })}
      {/* <div ref={containerRef} /> */}
    </div>
  );
};

export default Products;

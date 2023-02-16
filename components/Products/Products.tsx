import { ProductData } from "@/types/types";
import api from "@/utils/api";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

const Products = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [paging, setPaging] = useState<number | undefined>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const fetchProductsHandler = useCallback(async () => {
    if (isLoading || !router.isReady) return;
    if (!category || paging === undefined) return;

    try {
      setIsLoading(true);
      const response = await api.getProducts(category, paging);
      const data = response.data as ProductData[];
      const nextPaging = response.next_paging as number | undefined;
      setProductData((prev) => [...prev, ...data]);
      setPaging(nextPaging);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [category, isLoading, paging, router.isReady]);

  useEffect(() => {
    const categoryHandler = () => {
      if (!router.isReady) return;
      if (
        typeof router.query.category !== "string" &&
        typeof router.query.category !== "undefined"
      )
        return;
      setProductData([]);
      setCategory(router.query.category || "all");
      setPaging(0);
    };

    categoryHandler();
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    const observerHandler = (entries: { isIntersecting: boolean }[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProductsHandler();
        }
      });
    };
    let observerRefValue: HTMLDivElement | null = null;

    const observer = new IntersectionObserver(observerHandler, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRefValue = containerRef.current;
    }

    return () => {
      if (observerRefValue) observer.unobserve(observerRefValue);
    };
  }, [category, fetchProductsHandler]);

  return (
    <div className="flex flex-wrap gap-x-img-container-gap-sm justify-between mx-auto -mb-img-container-mb-sm px-img-container-px-sm pt-img-container-pt-sm pb-img-container-pb-sm">
      {productData?.map((product) => {
        return <ProductCard key={`product-${product.id}`} data={product} />;
      })}
      <div className="w-full" ref={containerRef} />
    </div>
  );
};

export default Products;

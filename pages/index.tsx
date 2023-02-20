import Carousel from "@/components/Carousel/Carousel";
import Products from "@/components/Products/Products";
import Head from "next/head";
import api from "@/utils/api";
import { GetServerSideProps } from "next";
import { ProductData } from "@/types/types";
import { ParsedUrlQuery } from "querystring";

export default function Home({
  carouselData,
  productsData,
}: {
  carouselData: Carousel[];
  productsData: { data: ProductData[]; nextPaging: number | null };
}) {
  return (
    <>
      <Carousel carouselData={carouselData} />
      <Products firstPageData={productsData} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const url = query as ParsedUrlQuery;

  const fetchCarouselDataHandler = async () => {
    const response = await api.getCampaigns();
    const data = response.data as Carousel[];
    return data;
  };

  const fetchFirstPageDataHandler = async () => {
    const category = url.category || "all";
    const response = await api.getProducts(category as string, 0);
    const data = response.data as ProductData[];
    const nextPaging = response.next_paging as number | undefined;
    if (nextPaging === undefined) {
      return { data, nextPaging: null };
    }
    return { data, nextPaging };
  };

  const carouselData = await fetchCarouselDataHandler();
  const productsData = await fetchFirstPageDataHandler();

  return {
    props: { carouselData, productsData },
  };
};

import { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import LogoImage from "@/assets/images/logo.png";
import Category from "./Category";

export const CATEGORY_DATA = [
  { type: "category", text: "女裝", id: "women" },
  { type: "category", text: "男裝", id: "men" },
  { type: "category", text: "配件", id: "accessories" },
];

const Header = () => {
  const [curCategory, setCurCategory] = useState<string>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);

  const categoryHandler = (category: string) => {
    setCurCategory(category);
  };

  const searchKeywordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const searchHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchKeyword) return;
    if (e.key === "Enter") {
      router.push(`/?keyword=${searchKeyword}`);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (
      typeof router.query.category !== "string" &&
      typeof router.query.category !== "undefined"
    )
      return;
    setCurCategory(router.query.category || "all");
  }, [router.isReady, router.query.category]);

  return (
    <header className="sticky top-0 w-screen z-50 bg-white">
      <div className="w-full xl:flex xl:justify-start xl:items-center xl:h-[140px] xl:border-b-[40px] xl:border-dark-grey xl:pl-[60px] xl:pr-[54px]">
        <div
          className="w-full flex justify-center items-center h-[52px] xl:max-w-fit xl:mr-[57px]"
          onClick={() => {
            categoryHandler("all");
          }}
        >
          <div className="mx-auto w-[129px] h-[24px] xl:w-[256px] xl:h-[48px] xl:m-0 xl:flex-grow-0">
            <Link href={{ pathname: "/" }}>
              <Image
                className="w-fill"
                priority
                src={LogoImage}
                alt="STYLiSH Logo"
              />
            </Link>
          </div>
        </div>
        <div className="w-full flex justify-center items-center h-[50px] bg-dark-grey xl:bg-white xl:flex-1 xl:justify-start">
          {CATEGORY_DATA.map((item, index, arr) => {
            return (
              <Category
                key={item.id}
                hasNext={index === arr.length - 1 ? false : true}
                id={item.id}
                curCategory={curCategory}
                onClick={categoryHandler}
                text={item.text}
              />
            );
          })}
        </div>
        <div>
          <input
            type="text"
            className="rounded-[22px] text-[0px] focus:text-[20px] bg-white w-[40px] xl:w-[214px] h-[40px] focus:w-[calc(100vw-20px)] mx-[10px] absolute top-[6px] right-[6px] xl:h-[44px] focus:border xl:border xl:relative border-light-grey-3 xl:text-[20px] text-brown leading-[24px] pl-[20px] bg-search bg-no-repeat bg-right hover:bg-search-hover xl:focus:w-[214px]"
            onKeyDown={searchHandler}
            onChange={searchKeywordHandler}
            value={searchKeyword}
          />
        </div>
        <div className="flex justify-center items-center absolute w-full top-[calc(100vh-60px)] h-[60px] bg-dark-grey xl:relative xl:top-0 xl:bg-white xl:max-w-fit">
          <Link href="/checkout">
            <div className="flex justify-center items-center w-[calc((100vw-1px)/2)] cursor-pointer relative group xl:w-[44px] xl:h-[44px] xl:ml-[42px]">
              <div className="h-[24px] w-[24px] rounded-full text-center text-light-grey absolute bottom-0 -ml-[24px] bg-brown xl:right-0">
                {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
              </div>
              <div className="bg-cart-mobile w-[44px] h-[44px] bg-no-repeat bg-center bg-cover group-hover:bg-cart-hover xl:bg-cart" />
              <div className="text-base leading-4 text-grey group-hover:text-brown xl:hidden">
                購物車
              </div>
            </div>
          </Link>
          <div className="border-l border-grey h-[24px] xl:hidden" />
          <Link href="/member">
            <div className="flex justify-center items-center w-[calc((100vw-1px)/2)] cursor-pointer relative group xl:w-[44px] xl:h-[44px] xl:ml-[42px]">
              <div className="bg-member-mobile w-[44px] h-[44px] bg-no-repeat bg-center bg-cover group-hover:bg-member-hover xl:bg-member" />
              <div className="text-base leading-4 text-grey group-hover:text-brown xl:hidden">
                會員
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

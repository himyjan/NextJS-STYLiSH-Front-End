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
  const [curCategory, setCurCategory] = useState("all");
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);

  const categoryHandler = (category: string) => {
    setCurCategory(category);
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
      <div className="w-full">
        <div
          className="w-full flex justify-center items-center h-[52px]"
          onClick={() => {
            categoryHandler("all");
          }}
        >
          <div className="mx-auto w-[129px] h-[24px]">
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
        <div className="w-full flex justify-center items-center h-[50px] bg-dark-grey">
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
        <div className="flex justify-center items-center absolute w-full top-[calc(100vh-60px)] h-[60px] bg-dark-grey">
          <Link href="/checkout">
            <div className="flex justify-center items-center w-[calc((100vw-1px)/2)] cursor-pointer relative group">
              <div className="h-[24px] w-[24px] rounded-full text-center text-light-grey absolute bottom-0 -ml-[24px] bg-brown">
                {cart.totalQuantity > 99 ? "99+" : cart.totalQuantity}
              </div>
              <div className="bg-cart-mobile w-[44px] h-[44px] bg-no-repeat bg-center bg-cover group-hover:bg-cart-hover" />
              <div className="text-base leading-4 text-grey group-hover:text-brown">
                購物車
              </div>
            </div>
          </Link>
          <div className="border-l border-grey h-[24px]" />
          <Link href="/member">
            <div className="flex justify-center items-center w-[calc((100vw-1px)/2)] cursor-pointer relative group">
              <div className="bg-member-mobile w-[44px] h-[44px] bg-no-repeat bg-center bg-cover group-hover:bg-member-hover" />
              <div className="text-base leading-4 text-grey group-hover:text-brown">
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

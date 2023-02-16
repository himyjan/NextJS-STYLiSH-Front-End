import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import LogoImage from "../../../assets/images/logo.png";
import Category from "./Category";

export const CATEGORY_DATA = [
  { type: "category", text: "女裝", id: "women" },
  { type: "category", text: "男裝", id: "men" },
  { type: "category", text: "配件", id: "accessories" },
];

const Header = () => {
  const [curCategory, setCurCategory] = useState("all");
  const router = useRouter();

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
                onClick={() => {
                  categoryHandler(item.id);
                }}
                text={item.text}
              />
            );
          })}
        </div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;

import Image from "next/image";

import { useState } from "react";
import LogoImage from "../../../assets/images/logo.png";
import Category from "./Category";

export const CATEGORY_DATA = [
  { type: "category", text: "女裝", id: "women" },
  { type: "category", text: "男裝", id: "men" },
  { type: "category", text: "配件", id: "accessories" },
];

const Header = () => {
  const [curCategory, setCurCategory] = useState("all");

  const categoryHandler = (category: string) => {
    setCurCategory(category);
  };

  return (
    <header className="sticky w-screen">
      <div className="w-full">
        <div className="w-full flex justify-center items-center h-[52px]">
          <div className="mx-auto w-[129px] h-[24px]">
            <Image className="w-fill" src={LogoImage} alt="STYLiSH Logo" />
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

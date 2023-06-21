import { ChangeEvent, KeyboardEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import LogoImage from '@/assets/images/logo.png';
import Category from './Category';

export const CATEGORY_DATA = [
  { type: 'category', text: '女裝', id: 'women' },
  { type: 'category', text: '男裝', id: 'men' },
  { type: 'category', text: '配件', id: 'accessories' },
];

const Header = () => {
  const [curCategory, setCurCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
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
    if (e.key === 'Enter') {
      router.push(`/?keyword=${searchKeyword}`);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (typeof router.query.keyword === 'string') {
      setSearchKeyword(router.query.keyword);
      return;
    }

    if (
      typeof router.query.category !== 'string' &&
      typeof router.query.category !== 'undefined'
    )
      return;
    setCurCategory(router.query.category || 'all');
  }, [router.isReady, router.query.category, router.query.keyword]);

  return (
    <header className="w-screen sticky top-0 z-50 bg-white">
      <Script
        src="https://js.tappaysdk.com/sdk/tpdirect/v5.15.0"
        data-nscript="afterInteractive"
      ></Script>
      <div className="w-full xl:flex xl:h-[140px] xl:items-center xl:justify-start xl:border-b-[40px] xl:border-dark-grey xl:pl-[60px] xl:pr-[54px]">
        <div
          className="flex h-[52px] w-full items-center justify-center xl:mr-[57px] xl:max-w-fit"
          onClick={() => {
            categoryHandler('all');
          }}
        >
          <div className="mx-auto xl:m-0 h-[24px] w-[129px] xl:h-[48px] xl:w-[256px] xl:flex-grow-0">
            <Link href={{ pathname: '/' }}>
              <Image
                className="w-fill"
                priority
                src={LogoImage}
                alt="STYLiSH Logo"
              />
            </Link>
          </div>
        </div>
        <div className="flex h-[50px] w-full items-center justify-center bg-dark-grey xl:flex-1 xl:justify-start xl:bg-white">
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
            className="absolute right-[6px] top-[6px] mx-[10px] h-[40px] w-[40px] rounded-[22px] border-light-grey-3 bg-white bg-search bg-right bg-no-repeat pl-[20px] text-[0px] leading-[24px] text-brown hover:bg-search-hover focus:w-[calc(100vw-20px)] focus:border focus:text-[20px] xl:relative xl:h-[44px] xl:w-[214px] xl:border xl:text-[20px] xl:focus:w-[214px]"
            onKeyDown={searchHandler}
            onChange={searchKeywordHandler}
            value={searchKeyword}
          />
        </div>
        <div className="absolute top-[calc(100vh-60px)] flex h-[60px] w-full items-center justify-center bg-dark-grey xl:relative xl:top-0 xl:max-w-fit xl:bg-white">
          <Link
            href="/checkout"
            className="group relative flex w-[50%] cursor-pointer items-center justify-center border-r-[1px] border-solid border-[#828282] xl:ml-[42px] xl:h-[44px] xl:w-[44px] xl:border-none"
          >
            <div className="absolute bottom-0 -ml-[24px] h-[24px] w-[24px] rounded-full bg-brown text-center text-light-grey xl:right-0">
              {cart.totalQuantity > 99 ? '99+' : cart.totalQuantity}
            </div>
            <div className="h-[44px] w-[44px] bg-cart-mobile bg-cover bg-center bg-no-repeat group-hover:bg-cart-hover xl:bg-cart" />
            <div className="text-base leading-4 text-grey group-hover:text-brown xl:hidden">
              購物車
            </div>
          </Link>
          <Link
            href="/member"
            className="group relative flex w-[50%] cursor-pointer items-center justify-center xl:ml-[42px] xl:h-[44px] xl:w-[44px]"
          >
            <div className="h-[44px] w-[44px] bg-member-mobile bg-cover bg-center bg-no-repeat group-hover:bg-member-hover xl:bg-member" />
            <div className="text-base leading-4 text-grey group-hover:text-brown xl:hidden">
              會員
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

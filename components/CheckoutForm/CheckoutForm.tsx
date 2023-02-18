import tappay from "@/utils/tappay";
import { useEffect, useRef, useState } from "react";
import CheckoutAmount from "./CheckoutAmount.";


const CheckoutForm = () => {
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpirationDateRef = useRef<HTMLDivElement>(null);
  const cardCCVRef = useRef<HTMLDivElement>(null);

  const checkOutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("checkout");
  };

  useEffect(() => {
    const setupTappay = async () => {
      await tappay.setupSDK();
      tappay.setupCard(
        cardNumberRef.current,
        cardExpirationDateRef.current,
        cardCCVRef.current
      );
    };

    setupTappay();
  }, []);

  return (
    <div className="w-full flex flex-col pb-[35px]">
      <form onSubmit={checkOutHandler}>
        <div className="w-full text-[16px] leading-[19px] font-bold pb-[10px] mb-[20px] border-b border-light-black">
          訂購資料
        </div>
        <div className="w-full flex flex-col">
          <div className="cart-form-input-container">
            <label htmlFor="card-number" className="cart-form-input-label">
              信用卡號碼
            </label>
            <div className="tpfield" id="card-number" ref={cardNumberRef} />
          </div>
          <div className="cart-form-input-container">
            <label
              htmlFor="card-expiration-date"
              className="cart-form-input-label"
            >
              有效期限
            </label>
            <div
              className="tpfield"
              id="card-expiration-date"
              ref={cardExpirationDateRef}
            />
          </div>
          <div className="cart-form-input-container">
            <label htmlFor="card-ccv" className="cart-form-input-label">
              安全碼
            </label>
            <div className="tpfield" id="card-ccv" ref={cardCCVRef} />
          </div>
        </div>
        <CheckoutAmount />
        <button className="bg-black text-white w-full h-[44px] text-center text-[16px]leading-[30px]">
          確認付款
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

import tappay from "@/utils/tappay";
import { useEffect, useRef, useState } from "react";
import CheckoutAmount from "./CheckoutAmount.";
const APP_ID = process.env.NEXT_PUBLIC_TAPPAY_ID;
const APP_KEY = process.env.NEXT_PUBLIC_TAPPAY_KEY;

let isInitial = true;

const CheckoutForm = () => {
  const [ready, setReady] = useState(false);
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpirationDateRef = useRef<HTMLDivElement>(null);
  const cardCCVRef = useRef<HTMLDivElement>(null);

  // const TPDSetupHandler = () => [
  //   window.TPDirect.card.setup({
  //     // Display ccv field
  //     fields: {
  //       number: {
  //         // css selector
  //         element: "#card-number",
  //         placeholder: "**** **** **** ****",
  //       },
  //       expirationDate: {
  //         // DOM object
  //         element: document.getElementById("card-expiration-date"),
  //         placeholder: "MM / YY",
  //       },
  //       ccv: {
  //         element: "#card-ccv",
  //         placeholder: "ccv",
  //       },
  //     },

  //     styles: {
  //       // Style all elements
  //       input: {
  //         color: "gray",
  //       },
  //       // style valid state
  //       ".valid": {
  //         color: "green",
  //       },
  //       // style invalid state
  //       ".invalid": {
  //         color: "red",
  //       },
  //       // Media queries
  //       // Note that these apply to the iframe, not the root window.
  //       "@media screen and (max-width: 400px)": {
  //         input: {
  //           color: "orange",
  //         },
  //       },
  //     },
  //     // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
  //     isMaskCreditCardNumber: true,
  //     maskCreditCardNumberRange: {
  //       beginIndex: 6,
  //       endIndex: 11,
  //     },
  //   }),
  // ];

  // const tapPayHandler = () => {
  //   const tapPayState = window.TPDirect.card.getTappayFieldsStatus();
  //   return tapPayState.canGetPrime;
  // };

  const checkOutHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("checkout");
  };

  // useEffect(() => {
  //   if (isInitial) {
  //     window.TPDirect.setupSDK(APP_ID, APP_KEY, "sandbox");
  //     TPDSetupHandler();
  //     isInitial = false;
  //     console.log("setup");
  //   }
  // }, []);

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

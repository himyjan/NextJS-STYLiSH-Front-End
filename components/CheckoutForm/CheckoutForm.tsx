import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store";
import api from "@/utils/api";
import tappay from "@/utils/tappay";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CheckoutAmount from "./CheckoutAmount.";

const FREIGHT = 30;

const CheckoutForm = () => {
  const [recipient, setRecipient] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    time: "",
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpirationDateRef = useRef<HTMLDivElement>(null);
  const cardCCVRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { jwtToken, isLogin, login } = useAuth();
  const cart = useSelector((state: RootState) => state.cart);

  const checkOutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("checkout");
    if (!formRef.current) return;
    const cartItems = cart.items.map((item) => {
      return {
        id: item.id,
        name: item.title,
        price: item.price,
        color: {
          code: item.colorCode,
          name: item.colorName,
        },
        size: item.size,
        qty: item.quantity,
      };
    });

    try {
      setLoading(true);

      const token = isLogin ? jwtToken : await login();

      if (!token) {
        window.alert("請登入會員");
        return;
      }

      if (cartItems.length === 0) {
        window.alert("尚未選購商品");
        return;
      }

      if (Object.values(recipient).some((value) => !value)) {
        window.alert("請填寫完整訂購資料");
        setInvalidFields(
          Object.keys(recipient).filter((key) => !recipient[key])
        );
        formRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        return;
      }

      if (!tappay.canGetPrime()) {
        window.alert("付款資料輸入有誤");
        return;
      }

      const result = (await tappay.getPrime()) as { status: number; card: any };
      if (result.status !== 0) {
        window.alert("付款資料輸入有誤");
        return;
      }

      const { data } = await api.checkout(
        {
          prime: result.card.prime,
          order: {
            shipping: "delivery",
            payment: "credit_card",
            subtotal: cart.amount,
            freight: FREIGHT,
            total: cart.amount + FREIGHT,
            recipient: {
              name: recipient["name"],
              email: recipient["email"],
              phone: recipient["phone"],
              address: recipient["address"],
              time: recipient["time"],
            },
            list: cartItems,
          },
        },
        token
      );
      window.alert("付款成功");
      // setCartItems([]);
      console.log(data);
      // navigate("/thankyou", { state: { orderNumber: data.number } });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
      <form onSubmit={checkOutHandler} ref={formRef}>
        <div className="w-full flex flex-col gap-[20px] mb-[24px]">
          <div className="w-full text-[16px] leading-[19px] font-bold pb-[10px] mb-[20px] border-b border-light-black">
            訂購資料
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="recipient"
              className="text-[14px] leading-[17px] text-light-black"
            >
              收件人姓名
            </label>
            <input
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="recipient"
            />
            <div className="text-[14px] leading-[17px] text-brown">
              務必填寫完整收件人姓名，避免包裹無法順利簽收
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="mobilePhone"
              className="text-[14px] leading-[17px] text-light-black"
            >
              手機
            </label>
            <input
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="mobilePhone"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="address"
              className="text-[14px] leading-[17px] text-light-black"
            >
              地址
            </label>
            <input
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="address"
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="email"
              className="text-[14px] leading-[17px] text-light-black"
            >
              Email
            </label>
            <input
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="email"
            />
          </div>
          <div className="flex flex-wrap gap-[10px]">
            <label
              htmlFor="deliverTime"
              className="text-[14px] leading-[17px] text-light-black w-full"
            >
              配送時間
            </label>
            <div className="flex items-center">
              <input
                name="deliverTime"
                id="deliverTime-1"
                value="morning"
                type="radio"
              />
              <label
                htmlFor="deliverTime"
                className="text-[14px] leading-[26px] ml-[5px]"
              >
                08:00-12:00
              </label>
            </div>
            <div className="flex items-center">
              <input
                name="deliverTime"
                id="deliverTime-2"
                value="afternoon"
                type="radio"
              />
              <label
                htmlFor="deliverTime"
                className="text-[14px] leading-[26px] ml-[5px]"
              >
                14:00-18:00
              </label>
            </div>
            <div className="flex items-center">
              <input
                name="deliverTime"
                id="deliverTime-3"
                value="anytime"
                type="radio"
              />
              <label
                htmlFor="deliverTime"
                className="text-[14px] leading-[26px] ml-[5px]"
              >
                不指定
              </label>
            </div>
          </div>
          <div className="w-full text-[16px] leading-[19px] font-bold pb-[10px] mb-[20px] border-b border-light-black">
            付款資料
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="card-number"
              className="text-[14px] leading-[17px] text-light-black"
            >
              信用卡號碼
            </label>
            <div
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="card-number"
              ref={cardNumberRef}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="card-expiration-date"
              className="text-[14px] leading-[17px] text-light-black"
            >
              有效期限
            </label>
            <div
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="card-expiration-date"
              ref={cardExpirationDateRef}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <label
              htmlFor="card-ccv"
              className="text-[14px] leading-[17px] text-light-black"
            >
              安全碼
            </label>
            <div
              className="w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden"
              id="card-ccv"
              ref={cardCCVRef}
            />
          </div>
        </div>
        <CheckoutAmount freight={FREIGHT} />
        <button className="bg-black text-white w-full h-[44px] text-center text-[16px]leading-[30px]">
          確認付款
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

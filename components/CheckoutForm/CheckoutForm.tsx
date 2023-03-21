import { useAuth } from "@/context/AuthContext";
import { AppDispatch, RootState } from "@/store";
import { cartActions } from "@/store/cart-slice";
import { TappayCard } from "@/types/types";
import api from "@/utils/api";
import tappay from "@/utils/tappay";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutAmount from "./CheckoutAmount.";

const FREIGHT = 30;

const FORM_INPUT_WRAPPER_CLASS_NAME =
  "flex flex-col gap-[10px] xl:w-[696px] xl:flex-row xl:flex-wrap xl:gap-[0px] xl:items-center";
const FORM_INPUT_CLASS_NAME =
  "w-full border border-light-grey-4 h-[32px] rounded-[8px] px-[5px] overflow-hidden xl:w-[576px]";
const FORM_LABEL_CLASS_NAME =
  "text-[14px] leading-[17px] text-light-black xl:w-[120px] xl:text-[14px] xl:leading-[19px]";

const CheckoutForm = () => {
  const [recipient, setRecipient] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    time: "",
  });
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cardNumberRef = useRef<HTMLDivElement>(null);
  const cardExpirationDateRef = useRef<HTMLDivElement>(null);
  const cardCCVRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { jwtToken, isLogin, login } = useAuth();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const checkOutHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current || isLoading) return;
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
      setIsLoading(true);

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
          block: "start",
        });
        return;
      }

      if (!tappay.canGetPrime()) {
        window.alert("付款資料輸入有誤");
        return;
      }

      const result = (await tappay.getPrime()) as {
        status: number;
        card: TappayCard;
      };
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
      const orderNumber = String(data.number);
      dispatch(cartActions.checkout(orderNumber));
      router.push("/thankyou");
    } catch (err) {
      window.alert("結帳失敗請稍後再試");
    } finally {
      setIsLoading(false);
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
    <div className="w-full flex flex-col pb-[35px] xl:w-[1160px]">
      <form onSubmit={checkOutHandler} ref={formRef}>
        <div className="w-full flex flex-col gap-[20px] mb-[24px] xl:gap-[30px]">
          <div className="w-full text-[16px] leading-[19px] font-bold pb-[10px] mb-[20px] border-b border-light-black">
            訂購資料
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="recipient" className={FORM_LABEL_CLASS_NAME}>
              收件人姓名
            </label>
            <input
              onChange={(e) =>
                setRecipient({ ...recipient, name: e.target.value })
              }
              className={
                invalidFields.some((item) => item === "name")
                  ? `${FORM_INPUT_CLASS_NAME} border-warning`
                  : FORM_INPUT_CLASS_NAME
              }
              id="recipient"
            />
            <div className="text-[14px] leading-[17px] text-brown xl:w-[696px] xl:text-right xl:mt-[10px]">
              務必填寫完整收件人姓名，避免包裹無法順利簽收
            </div>
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="mobilePhone" className={FORM_LABEL_CLASS_NAME}>
              手機
            </label>
            <input
              onChange={(e) =>
                setRecipient({ ...recipient, phone: e.target.value })
              }
              className={
                invalidFields.some((item) => item === "phone")
                  ? `${FORM_INPUT_CLASS_NAME} border-warning`
                  : FORM_INPUT_CLASS_NAME
              }
              id="mobilePhone"
            />
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="address" className={FORM_LABEL_CLASS_NAME}>
              地址
            </label>
            <input
              onChange={(e) =>
                setRecipient({ ...recipient, address: e.target.value })
              }
              className={
                invalidFields.some((item) => item === "address")
                  ? `${FORM_INPUT_CLASS_NAME} border-warning`
                  : FORM_INPUT_CLASS_NAME
              }
              id="address"
            />
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="email" className={FORM_LABEL_CLASS_NAME}>
              Email
            </label>
            <input
              onChange={(e) =>
                setRecipient({ ...recipient, email: e.target.value })
              }
              className={
                invalidFields.some((item) => item === "email")
                  ? `${FORM_INPUT_CLASS_NAME} border-warning`
                  : FORM_INPUT_CLASS_NAME
              }
              id="email"
            />
          </div>
          <div
            className={
              invalidFields.some((item) => item === "time")
                ? "flex flex-wrap gap-[10px] xl:flex-nowrap xl:items-center border rounded border-warning"
                : "flex flex-wrap gap-[10px] xl:flex-nowrap xl:items-center"
            }
          >
            <label
              htmlFor="deliverTime"
              className="text-[14px] leading-[17px] text-light-black w-full xl:w-[120px] xl:text-[14px] xl:leading-[19px]"
            >
              配送時間
            </label>
            <div className="flex items-center">
              <input
                name="deliverTime"
                id="deliverTime-1"
                value="morning"
                type="radio"
                onChange={(e) => {
                  if (e.target.checked)
                    setRecipient({ ...recipient, time: "morning" });
                }}
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
                onChange={(e) => {
                  if (e.target.checked)
                    setRecipient({ ...recipient, time: "afternoon" });
                }}
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
                onChange={(e) => {
                  if (e.target.checked)
                    setRecipient({ ...recipient, time: "anytime" });
                }}
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
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="card-number" className={FORM_LABEL_CLASS_NAME}>
              信用卡號碼
            </label>
            <div
              className={FORM_INPUT_CLASS_NAME}
              id="card-number"
              ref={cardNumberRef}
            />
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label
              htmlFor="card-expiration-date"
              className={FORM_LABEL_CLASS_NAME}
            >
              有效期限
            </label>
            <div
              className={FORM_INPUT_CLASS_NAME}
              id="card-expiration-date"
              ref={cardExpirationDateRef}
            />
          </div>
          <div className={FORM_INPUT_WRAPPER_CLASS_NAME}>
            <label htmlFor="card-ccv" className={FORM_LABEL_CLASS_NAME}>
              安全碼
            </label>
            <div
              className={FORM_INPUT_CLASS_NAME}
              id="card-ccv"
              ref={cardCCVRef}
            />
          </div>
        </div>
        <CheckoutAmount freight={FREIGHT} />
        <div className="xl:w-full xl:flex xl:justify-end">
          <button
            className="bg-black text-white w-full h-[44px] text-center text-[16px] leading-[30px] xl:w-[240px]"
            disabled={isLoading}
          >
            {isLoading ? "付款處理中" : "確認付款"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

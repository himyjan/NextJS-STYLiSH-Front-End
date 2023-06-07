import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const CheckoutAmount = ({ freight }: { freight: number }) => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="mb-[36px] flex flex-col items-end gap-[20px]">
      <div className="flex w-[240px] items-center">
        <div className="flex-1 text-[16px] leading-[19px] text-light-black">
          總金額
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {cart.amount}
        </div>
      </div>
      <div className="flex w-[240px] items-center">
        <div className="flex-1 text-[16px] leading-[19px] text-light-black">
          運費
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {freight}
        </div>
      </div>
      <div className="w-[240px] border-b border-light-black" />
      <div className="flex w-[240px] items-center">
        <div className="flex-1 text-[16px] leading-[19px] text-light-black">
          運費
        </div>
        <div className="text-[16px] leading-[19px] text-light-black">NT.</div>
        <div className="text-[30px] leading-[36px] text-light-black">
          {cart.amount + freight}
        </div>
      </div>
    </div>
  );
};

export default CheckoutAmount;

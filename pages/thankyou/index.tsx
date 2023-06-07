import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThankYou = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!cart.orderNumber) {
      router.push('/');
    }
  }, [cart.orderNumber, router, router.isReady]);

  return (
    <div className="flex items-center justify-center">
      {cart.orderNumber && (
        <div className="pt-[50px] text-[20px] xl:text-[30px]">{`訂單編號: ${cart.orderNumber} 已成立`}</div>
      )}
    </div>
  );
};

export default ThankYou;

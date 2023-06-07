import type { CartStore } from '@/types/types';
import type { Dispatch } from '@reduxjs/toolkit';
import { cartActions } from './cart-slice';

export const initCartDataHandler = () => {
  return async (dispatch: Dispatch) => {
    const cartString = window.localStorage.getItem('cartItems');
    if (!cartString) return;
    const cartData = JSON.parse(cartString);
    dispatch(cartActions.initCart(cartData));
  };
};

export const storeCartDataHandler = (cart: CartStore) => {
  const cartData = JSON.stringify({
    items: cart.items,
    totalQuantity: cart.totalQuantity,
    amount: cart.amount,
  });
  window.localStorage.setItem('cartItems', cartData);
};

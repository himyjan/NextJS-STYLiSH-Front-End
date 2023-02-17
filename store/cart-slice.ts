import { Cart } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  items: Cart[];
  totalQuantity: number;
  amount: number;
} = { items: [], totalQuantity: 0, amount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart(state, action) {},
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.colorCode === newItem.colorCode &&
          item.size === newItem.size
      );

      if (!existingItem) {
        const newItemData = {
          ...newItem,
        };
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.amount = state.amount + newItem.quantity * newItem.price;
        state.items.push(newItemData);
      } else {
        const index = state.items.findIndex(
          (item) =>
            item.id === newItem.id &&
            item.colorCode === newItem.colorCode &&
            item.size === newItem.size
        );
        const prevQuantity = state.items[index].quantity;
        const newQuantity = Math.min(
          newItem.curStock,
          prevQuantity + newItem.quantity
        );

        state.totalQuantity = state.totalQuantity + newQuantity - prevQuantity;
        state.amount =
          state.amount + (newQuantity - prevQuantity) * newItem.price;
        state.items[index].quantity = newQuantity;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

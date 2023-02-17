import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  items: {
    id: string;
    colorCode: string;
    colorName: string;
    size: string;
    quantity: number;
    curStock: number;
  }[];
  totalQuantity: number;
  amount: number;
} = { items: [], totalQuantity: 0, amount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart(state, action) {},
    addItemToCart(state, action) {
      const newItem = action.payload.item;
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
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

import { CartStore } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartStore = {
  items: [],
  totalQuantity: 0,
  amount: 0,
  changed: false,
  orderNumber: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initCart(state, action) {
      const localItems = action.payload;

      state.items = localItems.items;
      state.totalQuantity = localItems.totalQuantity;
      state.amount = localItems.amount;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.colorCode === newItem.colorCode &&
          item.size === newItem.size
      );

      state.changed = true;

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
    editQuantity(state, action) {
      const newItem = action.payload;
      const index = state.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.colorCode === newItem.colorCode &&
          item.size === newItem.size
      );
      const prevQuantity = state.items[index].quantity;
      const newQuantity = newItem.quantity;

      state.changed = true;
      state.totalQuantity = state.totalQuantity + newQuantity - prevQuantity;
      state.amount =
        state.amount + (newQuantity - prevQuantity) * newItem.price;
      state.items[index].quantity = newQuantity;
    },
    removeItemFromCart(state, action) {
      const newItem = action.payload;

      state.changed = true;

      state.totalQuantity = state.totalQuantity - newItem.quantity;
      state.amount = state.amount - newItem.quantity * newItem.price;
      state.items = state.items.filter(
        (item) =>
          item.id !== newItem.id ||
          item.colorCode !== newItem.colorCode ||
          item.size !== newItem.size
      );
    },
    checkout(state, action) {
      const newOrderNumber = action.payload;
      state.changed = true;

      state.items = [];
      state.amount = 0;
      state.totalQuantity = 0;
      state.orderNumber = newOrderNumber;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

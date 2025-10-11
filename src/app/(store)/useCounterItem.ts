import { create } from "zustand";
import { CounterItemStore } from "../types.ts/types";

export const useCounterItem = create<CounterItemStore>((set) => ({
  cartsItem: {},
  increaseCounterItem: (item) =>
    set((state) => {
      const id = item.id;
      const currentCount = state.cartsItem[id]?.count || 0;
      if (currentCount === 0) {
        return {
          cartsItem: { ...state.cartsItem, [id]: { ...item, count: 1 } },
        };
      } else {
        return {
          cartsItem: {
            ...state.cartsItem,
            [id]: { ...state.cartsItem[id], count: currentCount + 1 },
          },
        };
      }
    }),
  decreaseCounterItem: (item) =>
    set((state) => {
      const id = item.id;
      const currentCount = state.cartsItem[id]?.count || 0;
      if (currentCount === 1) {
        const { [id]: _, ...rest } = state.cartsItem;
        return { cartsItem: rest };
      } else {
        return {
          cartsItem: {
            ...state.cartsItem,
            [id]: { ...state.cartsItem[id], count: currentCount - 1 },
          },
        };
      }
    }),
  // getItemCount: (id) => {
  //     return useCounterItem.getState().cartsItem[id]?.count || 0;
  // },
  // removeItem: (id) => set((state) => {
  //     const newItems = { ...state.items };
  //     delete newItems[id];
  //     return { items: newItems };
  // }),
}));

export type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  description: string;
  image: string;
};

export type cartItem = Item & { count: number };

export type CartItems = Record<string, cartItem>;

export type CounterItemStore = {
  cartsItem: CartItems;
  increaseCounterItem: (item: Item) => void;
  decreaseCounterItem: (item: Item) => void;
};

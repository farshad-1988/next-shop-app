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
export type productItem = Item & { stock: number };
export type CartItems = cartItem[];

export type OrdersItemStore = {
  // loading: boolean;
  // error: string | null;
  orders: CartItems;
  setOrders: (orders: CartItems) => void;
  increaseOrderedItem: (item: Item) => void;
  decreaseOrderedItem: (item: Item) => void;
};
export type ProductsItemStore = {
  // loading: boolean;
  // error: string | null;
  products: productItem[];
  filteredProducts: productItem[];
  setProducts: (products: productItem[]) => void;
  setFilteredProducts: (products: productItem[]) => void;
  increaseProductsItem: (item: productItem) => void;
  decreaseProductsItem: (item: productItem) => void;
};

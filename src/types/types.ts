export type MenuType = {
    id: number;
    slug: string;
    title: string;
    desc?: string;
    img?: string;
    color: string;
  }[];

export type ProductType = {
    id: string;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    options?: { title: string; additionalPrice: number }[];
  };

export type OrdersType = {
  id: number;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createAt: Date;
  intent_id?: String;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
}

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
}

export type ActionType = {
  addToCart:(item:CartItemType)=>void;
  removeToCart:(item:CartItemType)=>void;
  clearToCart:()=>void;
}
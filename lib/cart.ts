import { Product } from "./product";

export type CartItem = {
  product: Product; // 商品
  quantity: number; // 個数
};

export function cartCount(): number {
  const cartJson: string | null = localStorage.getItem("cart");
  let cart: CartItem[] = [];
  cartJson ? (cart = JSON.parse(cartJson)) : (cart = []);
  let cartNumber: number = 0;
  cart.forEach((e) => {
    cartNumber = cartNumber + e.quantity;
  });
  return cartNumber;
}

import { FC, useEffect, useState } from "react";
import Link from "next/link";

import { CartIndex } from "../../lib/product";
import { cartCount } from "../../lib/cart";
import { Layout } from "../../components/Layout";
import styles from "./index.module.css";

const CartPage: FC = () => {
  const [cart, setCart] = useState<CartIndex[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>();
  const [cartNumber, setCartNumber] = useState<number>(0);

  useEffect(() => {
    const cartJson: string = localStorage.getItem("cart");
    const cartData: CartIndex[] = JSON.parse(cartJson);
    setCart(cartData);
    setCartNumber(cartCount());

    let totalPriceNunber: number = 0;
    if (!cartData) {
      setTotalPrice(0);
      setCart([]);
      return;
    }

    cartData.forEach((cartIndex) => {
      totalPriceNunber = totalPriceNunber + cartIndex.product.price * cartIndex.quantity;
    });
    setTotalPrice(totalPriceNunber);
  }, []);

  const resetCart = () => {
    localStorage.clear();
  };

  return (
    <Layout cartNumber={cartNumber}>
      <ul className={styles.list}>
        {cart.map((cartIndex) => (
          <li key={cartIndex.product.id} className={styles.item}>
            <img className={styles.image} src={cartIndex.product.imageUrl} alt={`${cartIndex.product.name}の写真`} />
            <div className={styles.description}>
              <p className={styles.productName}>{cartIndex.product.name}</p>
              <p className={styles.price}>{cartIndex.product.price}円</p>
              <p className={styles.quantity}>{cartIndex.quantity}個</p>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <p className={styles.totalPriceDiv}>合計金額 {totalPrice}</p>
      </div>

      <div className={styles.buttonDiv}>
        <Link href={`/`}>
          <button onClick={resetCart}>注文確定！</button>
        </Link>
      </div>
    </Layout>
  );
};

export default CartPage;

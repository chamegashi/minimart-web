import { FC, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

import { Product, CartIndex, getProduct } from "../../lib/product";
import { Layout } from "../../components/Layout";
import { cartCount } from "../../lib/cart";
import styles from "./index.module.css";

const ProductPage: FC = () => {
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [cartNumber, setCartNumber] = useState<number>(0);

  useEffect(() => {
    if (router.query.id) {
      getProduct(router.query.id).then((product) => setProduct(product));
    }
  }, [router.query.id]);

  useEffect(() => {
    setCartNumber(cartCount());
  }, []);

  const addCart = () => {
    let cartJson: string | null = null;
    if (localStorage.getItem("cart")) {
      cartJson = localStorage.getItem("cart");
    }
    const cart: CartIndex[] = JSON.parse(cartJson);

    if (!cart) {
      const newCart = JSON.stringify([
        {
          product: product,
          quantity: 1,
        },
      ]);
      localStorage.setItem("cart", newCart);
      setCartNumber(cartCount());
      return;
    }

    let newCart: CartIndex[] = cart;

    let isProductInStrage = false;
    newCart.forEach((e) => {
      if (e.product.id === product?.id) {
        isProductInStrage = true;
        e.quantity = e.quantity + 1;
      }
    });

    if (isProductInStrage) {
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCartNumber(cartCount());
      return;
    }

    newCart.push({
      product: product,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartNumber(cartCount());
  };

  return (
    <Layout cartNumber={cartNumber}>
      <img className={styles.image} src={product?.imageUrl} alt={`${product?.name}の写真`} />
      <p className={styles.productName}>{product?.name}</p>
      <p className={styles.price}>{product?.price} 円</p>
      <p className={styles.description}>{product?.description}</p>
      <div className={styles.buttonDiv}>
        <button onClick={addCart} className={styles.addCart}>
          カートに追加
        </button>
      </div>
    </Layout>
  );
};

export default ProductPage;

import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import styles from "./Layout.module.css";
import { CartIndex } from "../lib/product";

type Props = { cartNumber: number };

export const Layout: FC<Props> = ({ children, cartNumber }) => {
  return (
    <div>
      <Head>
        <title>Mini Mart</title>
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Mini Mart</Link>
        </h1>
        <div className={styles.cart}>
          {/* このリンク先はないので新規ページを作る */}
          <Link href="/cart">
            <a>
              <span>🛒</span>
              <span className={styles.cartCount}>{cartNumber}</span>
            </a>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

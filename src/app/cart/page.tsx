'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import Link from 'next/link';

export default function CartPage() {
    const { items, cartTotal, removeFromCart, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className={styles.main}>
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link href="/">
                    <Button>Continue Shopping</Button>
                </Link>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <h1>Your Cart</h1>

            <div className={styles.cartGrid}>
                <div className={styles.itemList}>
                    {items.map((item, idx) => (
                        <div key={`${item.productId}-${idx}`} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <h3>Product ID: {item.productId}</h3> {/* In real app, fetch details via ID */}
                                <p>Quantity: {item.quantity}</p>
                                <div className={styles.options}>
                                    {Object.entries(item.selectedOptions).map(([key, val]) => (
                                        <span key={key} className={styles.optionTag}>{key}: {val}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.itemPrice}>
                                ${item.totalPrice.toLocaleString()}
                            </div>
                            <button
                                onClick={() => removeFromCart(item.productId, JSON.stringify(item.selectedOptions))}
                                className={styles.removeBtn}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.summary}>
                    <h2>Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.total}`}>
                        <span>Total</span>
                        <span>${cartTotal.toLocaleString()}</span>
                    </div>

                    <Link href="/checkout" style={{ display: 'block' }}>
                        <Button size="lg" className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}

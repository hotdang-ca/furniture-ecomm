'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Mock Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        cardInfo: ''
    });

    if (items.length === 0) {
        return (
            <main className={styles.main}>
                <h1>Checkout</h1>
                <p>Your cart is empty.</p>
            </main>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Order Placed Successfully!');
        clearCart();
        setIsProcessing(false);
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <h1>Checkout</h1>
            <div className={styles.grid}>
                <div className={styles.formSection}>
                    <h2>Shipping & Payment</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Shipping Address</label>
                            <input
                                type="text"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="123 Amish Rd"
                            />
                        </div>

                        <div className={styles.divider} />

                        <div className={styles.field}>
                            <label>Card Information (Mock)</label>
                            <input
                                type="text"
                                name="cardInfo"
                                required
                                value={formData.cardInfo}
                                onChange={handleInputChange}
                                placeholder="4242 4242 4242 4242"
                            />
                        </div>

                        <Button type="submit" size="lg" disabled={isProcessing} className={styles.payBtn}>
                            {isProcessing ? 'Processing...' : `Pay $${cartTotal.toLocaleString()}`}
                        </Button>
                    </form>
                </div>

                <div className={styles.summarySection}>
                    <h2>Order Summary</h2>
                    <div className={styles.itemList}>
                        {items.map((item, idx) => (
                            <div key={idx} className={styles.item}>
                                <div className={styles.itemDetails}>
                                    <span className={styles.itemName}>{item.quantity}x {item.productName}</span>
                                    <div className={styles.itemOptions}>
                                        {Object.entries(item.displayOptions || {}).map(([key, val]) => (
                                            <div key={key}>{key}: {val}</div>
                                        ))}
                                    </div>
                                </div>
                                <span className={styles.itemPrice}>${(item.totalPrice * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>${cartTotal.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </main>
    );
}

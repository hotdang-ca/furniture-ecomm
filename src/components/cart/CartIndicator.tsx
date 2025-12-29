'use client';

import { useCart } from '@/lib/cart-context';
import styles from '@/components/layout/Header.module.css'; // Re-use styles

export const CartIndicator = () => {
    const { cartCount } = useCart();

    return (
        <span>Cart ({cartCount})</span>
    );
};

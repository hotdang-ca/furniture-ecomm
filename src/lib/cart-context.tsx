'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from './types';

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string, options: string) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('qm-cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load cart', e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('qm-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: CartItem) => {
        setItems(prev => {
            // Simple check to merge items if exact same options
            // For MVP, simplistic matching
            const existingIdx = prev.findIndex(i =>
                i.productId === newItem.productId &&
                JSON.stringify(i.selectedOptions) === JSON.stringify(newItem.selectedOptions)
            );

            if (existingIdx > -1) {
                const newItems = [...prev];
                newItems[existingIdx].quantity += newItem.quantity;
                return newItems;
            }
            return [...prev, newItem];
        });
    };

    const removeFromCart = (productId: string, optionsStr: string) => {
        setItems(prev => prev.filter(i =>
            !(i.productId === productId && JSON.stringify(i.selectedOptions) === optionsStr)
        ));
    };

    const clearCart = () => setItems([]);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = items.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

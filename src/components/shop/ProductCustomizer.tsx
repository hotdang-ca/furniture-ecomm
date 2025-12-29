'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';
import styles from './ProductCustomizer.module.css';

interface ProductCustomizerProps {
    product: Product;
}

export const ProductCustomizer = ({ product }: ProductCustomizerProps) => {
    const { addToCart } = useCart();
    // Initialize state with default options (first value of each option)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [currentPrice, setCurrentPrice] = useState(product.basePrice);

    useEffect(() => {
        const defaults: Record<string, string> = {};
        product.options.forEach(opt => {
            if (opt.values.length > 0) {
                defaults[opt.id] = opt.values[0].id; // Default to first option
            }
        });
        setSelectedOptions(defaults);
    }, [product]);

    useEffect(() => {
        let price = product.basePrice;
        product.options.forEach(opt => {
            const selectedValueId = selectedOptions[opt.id];
            const selectedValue = opt.values.find(v => v.id === selectedValueId);
            if (selectedValue) {
                price += selectedValue.priceModifier;
            }
        });
        setCurrentPrice(price);
    }, [selectedOptions, product]);

    const handleOptionChange = (optionId: string, valueId: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionId]: valueId
        }));
    };

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            quantity: 1,
            selectedOptions: selectedOptions,
            totalPrice: currentPrice
        });
        alert(`Added ${product.name} to cart!`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.priceContainer}>
                <span className={styles.label}>Total Price:</span>
                <span className={styles.price}>${currentPrice.toLocaleString()}</span>
            </div>

            <div className={styles.options}>
                {product.options.map(option => (
                    <div key={option.id} className={styles.optionGroup}>
                        <label className={styles.optionLabel}>{option.name}</label>
                        <div className={styles.inputs}>
                            {option.type === 'select' ? (
                                <select
                                    value={selectedOptions[option.id] || ''}
                                    onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                    className={styles.select}
                                >
                                    {option.values.map(val => (
                                        <option key={val.id} value={val.id}>
                                            {val.name} {val.priceModifier !== 0 && `(${val.priceModifier > 0 ? '+' : ''}$${val.priceModifier})`}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className={styles.radioGroup}>
                                    {option.values.map(val => (
                                        <label key={val.id} className={`${styles.radio} ${selectedOptions[option.id] === val.id ? styles.radioSelected : ''}`}>
                                            <input
                                                type="radio"
                                                name={option.id}
                                                value={val.id}
                                                checked={selectedOptions[option.id] === val.id}
                                                onChange={() => handleOptionChange(option.id, val.id)}
                                                className={styles.radioInput}
                                            />
                                            <span>{val.name}</span>
                                            {val.priceModifier !== 0 && <span className={styles.modifier}>{val.priceModifier > 0 ? '+' : ''}$${val.priceModifier}</span>}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Button size="lg" onClick={handleAddToCart} className={styles.addToCartBtn}>
                Add to Cart - ${currentPrice.toLocaleString()}
            </Button>

            <p className={styles.leadTime}>Estimated Lead Time: {product.leadTime}</p>
        </div>
    );
};

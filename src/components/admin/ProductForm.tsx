'use client';

import React, { useState } from 'react';
import { Product, ProductOption } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { CategorySelector } from './CategorySelector';
import { OptionBuilder } from './OptionBuilder';
import styles from './ProductForm.module.css';

export const ProductForm = () => {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        description: '',
        basePrice: 0,
        leadTime: '8-12 weeks',
        images: [],
        inStock: true,
        options: []
    });

    const [jsonResult, setJsonResult] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Generate valid slug from name if missing
        const finalData = {
            ...formData,
            id: `p-${Date.now()}`,
            slug: formData.name?.toLowerCase().replace(/ /g, '-') || `product-${Date.now()}`,
            rating: 0,
            images: ['/placeholder/custom.jpg']
        };

        console.log('Product Created:', finalData);
        setJsonResult(JSON.stringify(finalData, null, 2));
        alert('Product JSON generated! Check the console or the preview box below.');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
                <h2>Basic Information</h2>
                <div className={styles.field}>
                    <label>Product Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Mission Oak Dining Table"
                    />
                </div>
                <div className={styles.field}>
                    <label>Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Base Price ($)</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formData.basePrice}
                            onChange={e => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Lead Time</label>
                        <input
                            type="text"
                            required
                            value={formData.leadTime}
                            onChange={e => setFormData({ ...formData, leadTime: e.target.value })}
                            placeholder="e.g. 6-8 weeks"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Categorization</h2>
                <CategorySelector
                    onSelect={(catId, parents) => setFormData(prev => ({ ...prev, categoryId: catId, parentCategoryIds: parents }))}
                />
            </div>

            <div className={styles.section}>
                <h2>Customization Options</h2>
                <p className={styles.hint}>Define the customizable attributes (wood, size, finish) and their price impacts.</p>
                <OptionBuilder
                    options={formData.options || []}
                    onChange={(opts) => setFormData({ ...formData, options: opts })}
                />
            </div>

            <div className={styles.actions}>
                <Button size="lg" type="submit">Create Product JSON</Button>
            </div>

            {jsonResult && (
                <div className={styles.result}>
                    <h3>Generated JSON</h3>
                    <pre>{jsonResult}</pre>
                </div>
            )}
        </form>
    );
};

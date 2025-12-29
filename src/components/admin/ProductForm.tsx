'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { CategorySelector } from './CategorySelector';
import { OptionBuilder } from './OptionBuilder';
import styles from './ProductForm.module.css';
import { createProduct, updateProduct } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
    initialData?: Product;
}

export const ProductForm = ({ initialData }: ProductFormProps) => {
    const router = useRouter();
    const isEditMode = !!initialData;
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<Partial<Product>>(initialData || {
        name: '',
        description: '',
        basePrice: 0,
        leadTime: '8-12 weeks',
        images: [],
        inStock: true,
        options: []
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const finalData = {
                ...formData,
                id: formData.id || `p-${Date.now()}`,
                slug: formData.slug || formData.name?.toLowerCase().replace(/ /g, '-') || `product-${Date.now()}`,
                rating: formData.rating || 0,
                images: formData.images?.length ? formData.images : ['/placeholder/custom.jpg']
            } as Product;

            if (isEditMode) {
                await updateProduct(finalData);
                alert('Product Updated!');
                router.push('/admin/products');
            } else {
                await createProduct(finalData);
                alert('Product Created!');
                router.push('/admin/products');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving product');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.section}>
                <h2>{isEditMode ? 'Edit Product' : 'Usage Basic Information'}</h2>
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
                {/* Note: Initializing Selector with existing categories requires more logic in Selector. 
                    For MVP edit, we might reset category selection or need to pass props to Selector.
                    Left simpler for now as user just asked to 'reuse' form.
                */}
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
                <Button size="lg" type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                </Button>
            </div>
        </form>
    );
};

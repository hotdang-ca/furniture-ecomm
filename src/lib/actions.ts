'use server';

import { revalidatePath } from 'next/cache';
import { db } from './db';
import { Product } from './types';
import { redirect } from 'next/navigation';

export async function createProduct(productData: Product) {
    // Validate? (Ideally use Zod)

    db.addProduct(productData);

    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath('/admin/products');

    return { success: true, message: 'Product created successfully' };
}

export async function updateProduct(productData: Product) {
    const updated = db.updateProduct(productData);

    if (!updated) {
        return { success: false, message: 'Product not found' };
    }

    revalidatePath('/');
    revalidatePath('/shop');
    revalidatePath(`/product/${productData.slug}`);
    revalidatePath('/admin/products');

    return { success: true, message: 'Product updated successfully' };
}

import { Category, Product, Order } from './types';
import { db } from './db';

export function getOrders(): Order[] {
    return db.getOrders();
}

export function getCategories(): Category[] {
    return db.getCategories();
}

export function getFeaturedProducts(): Product[] {
    return db.getProducts().slice(0, 3);
}

export function getProductBySlug(slug: string): Product | undefined {
    return db.getProductBySlug(slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    const categories = db.getCategories();

    const findCategory = (cats: Category[]): Category | undefined => {
        for (const cat of cats) {
            if (cat.slug === slug) return cat;
            if (cat.children) {
                const found = findCategory(cat.children);
                if (found) return found;
            }
        }
        return undefined;
    };
    return findCategory(categories);
}

export function getProductsByCategory(categorySlug: string): Product[] {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return [];

    const getCategoryIds = (cat: Category): string[] => {
        let ids = [cat.id];
        if (cat.children) {
            cat.children.forEach(child => {
                ids = [...ids, ...getCategoryIds(child)];
            });
        }
        return ids;
    };

    const relevantIds = getCategoryIds(category);
    return db.getProducts().filter(p => relevantIds.includes(p.categoryId) || p.parentCategoryIds.includes(category.id));
}

// Export constants for backward compatibility if needed, but they are now dynamic
export const PRODUCTS = db.getProducts();
export const CATEGORIES = db.getCategories();
export const ORDERS = db.getOrders();

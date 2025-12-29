import { Product, Category, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS } from './initial-data';

class InMemoryDB {
    private products: Product[];
    private categories: Category[];
    private orders: Order[];

    constructor() {
        this.products = [...INITIAL_PRODUCTS];
        this.categories = [...INITIAL_CATEGORIES];
        this.orders = [...INITIAL_ORDERS];
    }

    getProducts() {
        return this.products;
    }

    getProductById(id: string) {
        return this.products.find(p => p.id === id);
    }

    getProductBySlug(slug: string) {
        return this.products.find(p => p.slug === slug);
    }

    addProduct(product: Product) {
        this.products.push(product);
        return product;
    }

    updateProduct(product: Product) {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.products[index] = product;
            return product;
        }
        return null;
    }

    getCategories() {
        return this.categories;
    }

    getOrders() {
        return this.orders;
    }
}

// Attach to global to persist across hot reloads in dev
const globalThen = globalThis;
const globalForDB = globalThen as unknown as { db: InMemoryDB };

export const db = globalForDB.db || new InMemoryDB();

if (process.env.NODE_ENV !== 'production') globalForDB.db = db;

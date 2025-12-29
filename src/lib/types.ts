export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    level: 'top' | 'secondary' | 'sub';
    parentId?: string;
    children?: Category[];
}

export interface ProductOptionValue {
    id: string;
    name: string;
    priceModifier: number; // e.g., +100 or +0
}

export interface ProductOption {
    id: string;
    name: string; // e.g., "Wood Type", "Finish", "Size"
    type: 'select' | 'radio';
    values: ProductOptionValue[];
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    basePrice: number;
    rating: number; // 0-5
    images: string[];
    categoryId: string; // Direct parent subcategory
    parentCategoryIds: string[]; // [Top, Secondary, Sub] for breadcrumbs
    options: ProductOption[];
    inStock: boolean;
    leadTime: string; // "8-12 weeks"
}

export interface CartItem {
    productId: string;
    quantity: number;
    selectedOptions: Record<string, string>; // optionId -> valueId
    totalPrice: number;
}

export type OrderStatus = 'Ordered' | 'Building' | 'Shipping' | 'Delivered' | 'Cancelled';

export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    status: OrderStatus;
    items: CartItem[];
    total: number;
    date: string;
    builderName?: string; // Assigned builder
}

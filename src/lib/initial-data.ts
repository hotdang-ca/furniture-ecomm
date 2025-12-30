import { Category, Product, Order } from './types';

export const INITIAL_ORDERS: Order[] = [
    {
        id: 'ord-1001',
        customerName: 'Alice Miller',
        customerEmail: 'alice@example.com',
        status: 'Building',
        items: [
            {
                productId: 'p-1',
                productName: 'Mission Oak Coffee Table',
                productSlug: 'mission-oak-coffee-table',
                quantity: 1,
                selectedOptions: { 'opt-wood': 'w-cherry' },
                displayOptions: { 'Wood Type': 'Cherry (+$150)' },
                totalPrice: 600
            }
        ],
        total: 600,
        date: '2023-10-25',
        builderName: 'Eli Yoder'
    },
    {
        id: 'ord-1002',
        customerName: 'Bob Smith',
        customerEmail: 'bob@example.com',
        status: 'Ordered',
        items: [
            {
                productId: 'p-3',
                productName: 'Farmhouse Dining Table',
                productSlug: 'farmhouse-dining-table',
                quantity: 1,
                selectedOptions: {},
                displayOptions: {},
                totalPrice: 1800
            }
        ],
        total: 1800,
        date: '2023-11-01'
    },
    {
        id: 'ord-1003',
        customerName: 'Charlie Davis',
        customerEmail: 'charlie@example.com',
        status: 'Delivered',
        items: [
            {
                productId: 'p-2',
                productName: 'Sleigh Bed Frame',
                productSlug: 'sleigh-bed-frame',
                quantity: 1,
                selectedOptions: {},
                displayOptions: {},
                totalPrice: 1200
            }
        ],
        total: 1200,
        date: '2023-09-15',
        builderName: 'Amos Troyer'
    }
];

export const INITIAL_CATEGORIES: Category[] = [
    {
        id: 'c-living',
        name: 'Living Room',
        slug: 'living-room',
        level: 'top',
        children: [
            {
                id: 'c-living-tables',
                name: 'Tables',
                slug: 'tables',
                level: 'secondary',
                parentId: 'c-living',
                children: [
                    { id: 'c-coffee-tables', name: 'Coffee Tables', slug: 'coffee-tables', level: 'sub', parentId: 'c-living-tables' },
                    { id: 'c-end-tables', name: 'End Tables', slug: 'end-tables', level: 'sub', parentId: 'c-living-tables' },
                ],
            },
            {
                id: 'c-living-seating',
                name: 'Seating',
                slug: 'seating',
                level: 'secondary',
                parentId: 'c-living',
                children: [
                    { id: 'c-sofas', name: 'Sofas', slug: 'sofas', level: 'sub', parentId: 'c-living-seating' },
                    { id: 'c-rockers', name: 'Rockers', slug: 'rockers', level: 'sub', parentId: 'c-living-seating' },
                ]
            }
        ],
    },
    {
        id: 'c-bedroom',
        name: 'Bedroom',
        slug: 'bedroom',
        level: 'top',
        children: [
            {
                id: 'c-beds',
                name: 'Beds',
                slug: 'beds',
                level: 'secondary',
                parentId: 'c-bedroom',
                children: [
                    { id: 'c-beds-queen', name: 'Queen Beds', slug: 'queen-beds', level: 'sub', parentId: 'c-beds' },
                    { id: 'c-beds-king', name: 'King Beds', slug: 'king-beds', level: 'sub', parentId: 'c-beds' },
                ]
            },
        ],
    },
    {
        id: 'c-dining',
        name: 'Dining Room',
        slug: 'dining-room',
        level: 'top',
        children: [
            {
                id: 'c-dining-tables',
                name: 'Dining Tables',
                slug: 'dining-tables',
                level: 'secondary',
                parentId: 'c-dining',
            },
            {
                id: 'c-dining-chairs',
                name: 'Dining Chairs',
                slug: 'dining-chairs',
                level: 'secondary',
                parentId: 'c-dining',
            }
        ]
    }
];

export const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'p-1',
        name: 'Mission Oak Coffee Table',
        slug: 'mission-oak-coffee-table',
        description: 'A classic mission style coffee table with a durable finish and spacious top. Handcrafted by Amish artisans in Ohio.',
        basePrice: 450,
        rating: 4.8,
        images: ['/placeholder/table-1.jpg', '/placeholder/table-2.jpg'],
        categoryId: 'c-coffee-tables',
        parentCategoryIds: ['c-living', 'c-living-tables', 'c-coffee-tables'],
        inStock: true,
        leadTime: '6-8 weeks',
        options: [
            {
                id: 'opt-wood',
                name: 'Wood Type',
                type: 'select',
                values: [
                    { id: 'w-oak', name: 'Red Oak', priceModifier: 0 },
                    { id: 'w-cherry', name: 'Cherry', priceModifier: 150 },
                    { id: 'w-walnut', name: 'Walnut', priceModifier: 250 },
                ]
            },
            {
                id: 'opt-finish',
                name: 'Finish',
                type: 'select',
                values: [
                    { id: 'f-natural', name: 'Natural', priceModifier: 0 },
                    { id: 'f-fruitwood', name: 'Fruitwood', priceModifier: 0 },
                    { id: 'f-espresso', name: 'Espresso', priceModifier: 0 },
                ]
            }
        ]
    },
    {
        id: 'p-2',
        name: 'Sleigh Bed Frame',
        slug: 'sleigh-bed-frame',
        description: 'Elegant sleigh bed frame featuring curved headboard and footboard. Available in multiple sizes.',
        basePrice: 1200,
        rating: 4.9,
        images: ['/placeholder/bed-1.jpg'],
        categoryId: 'c-beds-queen', // Defaulting
        parentCategoryIds: ['c-bedroom', 'c-beds', 'c-beds-queen'],
        inStock: true,
        leadTime: '8-10 weeks',
        options: [
            {
                id: 'opt-size',
                name: 'Size',
                type: 'radio',
                values: [
                    { id: 'sz-full', name: 'Full', priceModifier: -100 },
                    { id: 'sz-queen', name: 'Queen', priceModifier: 0 },
                    { id: 'sz-king', name: 'King', priceModifier: 200 },
                ]
            },
            {
                id: 'opt-wood',
                name: 'Wood Type',
                type: 'select',
                values: [
                    { id: 'w-oak', name: 'Oak', priceModifier: 0 },
                    { id: 'w-maple', name: 'Brown Maple', priceModifier: 100 },
                ]
            }
        ]
    },
    {
        id: 'p-3',
        name: 'Farmhouse Dining Table',
        slug: 'farmhouse-dining-table',
        description: 'Rustic farmhouse table with sturdy turned legs. Perfect for family gatherings.',
        basePrice: 1800,
        rating: 5.0,
        images: ['/placeholder/dining-1.jpg'],
        categoryId: 'c-dining-tables',
        parentCategoryIds: ['c-dining', 'c-dining-tables'],
        inStock: true,
        leadTime: '8-12 weeks',
        options: [
            {
                id: 'opt-leaves',
                name: 'Extensions',
                type: 'select',
                values: [
                    { id: 'l-none', name: 'Solid Top (No Leaves)', priceModifier: 0 },
                    { id: 'l-2', name: '2 Leaves (+24")', priceModifier: 300 },
                    { id: 'l-4', name: '4 Leaves (+48")', priceModifier: 500 },
                ]
            }
        ]
    }
];

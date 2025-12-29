import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";
import { CategorySidebar } from "@/components/shop/CategorySidebar";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const products = getProductsByCategory(categorySlug);

    return (
        <div className={styles.container}>
            <CategorySidebar activeCategorySlug={categorySlug} />

            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>{category.name}</h1>
                    <p className={styles.count}>{products.length} Products</p>
                </header>

                {products.length > 0 ? (
                    <div className={styles.grid}>
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>No products found in this category.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

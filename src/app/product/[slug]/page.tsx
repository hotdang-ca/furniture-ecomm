import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/mock-data";
import { ProductCustomizer } from "@/components/shop/ProductCustomizer";
import styles from "./page.module.css";
import Link from "next/link";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <div className={styles.breadcrumbs}>
                <Link href="/">Home</Link> / <Link href={`/shop/${product.parentCategoryIds[0] || 'living-room'}`}>Shop</Link> / <span>{product.name}</span>
            </div>

            <div className={styles.content}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        {/* Info: In a real app, use next/image with product.images[0] */}
                        <div className={styles.placeholderImage} />
                    </div>
                    <div className={styles.thumbnails}>
                        {product.images.map((img, i) => (
                            <div key={i} className={styles.thumbnail} />
                        ))}
                    </div>

                    <div className={styles.description}>
                        <h2>Description</h2>
                        <p>{product.description}</p>

                        <h3>Details</h3>
                        <ul>
                            <li>Handcrafted by Amish builders</li>
                            <li>Solid hardwood construction</li>
                            <li>{product.leadTime} build time</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.header}>
                        <h1>{product.name}</h1>
                        {/* Rating stars could go here */}
                    </div>

                    <ProductCustomizer product={product} />
                </div>
            </div>
        </div>
    );
}

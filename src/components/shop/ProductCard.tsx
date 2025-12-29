import Link from 'next/link';
import { Product } from '@/lib/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Link href={`/product/${product.slug}`} className={styles.card}>
            <div className={styles.imageContainer}>
                {/* Placeholder for actual image - using a colored div for MVP if no image */}
                <div className={styles.placeholderImage} />
                {/* In real app: <Image src={product.images[0]} ... /> */}
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>from ${product.basePrice.toLocaleString()}</p>
                <span className={styles.cta}>Customize & Buy &rarr;</span>
            </div>
        </Link>
    );
};

import Link from 'next/link';
import styles from "./page.module.css";
import { getFeaturedProducts, getCategories } from "@/lib/mock-data";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Amish Connection</h1>
          <p>Timeless Amish Craftsmanship. Built to last for generations.</p>
          <div className={styles.heroButtons}>
            <Link href="/shop/living-room">
              <Button size="lg">Shop Living Room</Button>
            </Link>
            <Link href="/shop/dining-room">
              <Button size="lg" variant="outline">Shop Dining</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map(cat => (
            <Link href={`/shop/${cat.slug}`} key={cat.id} className={styles.categoryCard}>
              <h3>{cat.name}</h3>
              <p>Explore &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Featured Collections</h2>
        <div className={styles.productGrid}>
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

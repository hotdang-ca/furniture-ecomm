import Link from 'next/link';
import styles from './Header.module.css';
import { getCategories } from '@/lib/mock-data';
import { CartIndicator } from '@/components/cart/CartIndicator';

export const Header = () => {
    const categories = getCategories();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    QM<span>Woods</span>
                </Link>

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {categories.map(cat => (
                            <li key={cat.id}>
                                <Link href={`/shop/${cat.slug}`} className={styles.navLink}>
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.actions}>
                    <Link href="/cart" className={styles.cartLink}>
                        <CartIndicator />
                    </Link>
                </div>
            </div>
        </header>
    );
};

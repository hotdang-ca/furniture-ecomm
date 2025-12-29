import Link from 'next/link';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.logo}>QM Admin</div>
                <nav>
                    <ul className={styles.nav}>
                        <li><Link href="/admin">Dashboard</Link></li>
                        <li><Link href="/admin/products">Products</Link></li>
                        <li><Link href="/admin/orders">Orders</Link></li>
                        <li><Link href="/">Back to Shop</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}

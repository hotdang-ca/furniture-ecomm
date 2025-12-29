import styles from './page.module.css';
import { getOrders, PRODUCTS } from '@/lib/mock-data';

export default function AdminDashboard() {
    const orders = getOrders();
    const products = PRODUCTS;

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const activeOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

    return (
        <div>
            <h1 className={styles.title}>Dashboard Overview</h1>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Revenue</h3>
                    <p className={styles.statValue}>${totalRevenue.toLocaleString()}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Active Orders</h3>
                    <p className={styles.statValue}>{activeOrders}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Products</h3>
                    <p className={styles.statValue}>{products.length}</p>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Recent Activity</h2>
                <p>System operational. No new alerts.</p>
            </div>
        </div>
    );
}

import { getOrders } from '@/lib/mock-data';
import styles from './page.module.css';

export default function AdminOrdersPage() {
    const orders = getOrders();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ordered': return '#3498db';
            case 'Building': return '#f39c12';
            case 'Shipping': return '#9b59b6';
            case 'Delivered': return '#27ae60';
            case 'Cancelled': return '#c0392b';
            default: return '#7f8c8d';
        }
    };

    return (
        <div>
            <h1 className={styles.title}>Orders</h1>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Builder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className={styles.idCell}>#{order.id.split('-')[1]}</td>
                                <td>{order.date}</td>
                                <td>
                                    <div className={styles.customerName}>{order.customerName}</div>
                                    <div className={styles.customerEmail}>{order.customerEmail}</div>
                                </td>
                                <td>
                                    <span
                                        className={styles.statusBadge}
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className={styles.totalCell}>${order.total.toLocaleString()}</td>
                                <td>{order.builderName || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

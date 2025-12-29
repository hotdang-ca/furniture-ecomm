import { PRODUCTS } from '@/lib/mock-data';
import styles from '../orders/page.module.css'; // Re-use table styles

export default function AdminProductsPage() {
    const products = PRODUCTS;

    return (
        <div>
            <h1 className={styles.title}>Products</h1>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Base Price</th>
                            <th>Stock</th>
                            <th>Lead Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ width: '40px', height: '40px', background: '#ccc', borderRadius: '4px' }}></div>
                                </td>
                                <td style={{ fontWeight: 600 }}>{product.name}</td>
                                <td>{product.categoryId}</td>
                                <td className={styles.totalCell}>${product.basePrice.toLocaleString()}</td>
                                <td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td>
                                <td>{product.leadTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { ProductForm } from '@/components/admin/ProductForm';
import styles from './page.module.css';

export default function NewProductPage() {
    return (
        <div>
            <h1 className={styles.title}>Add New Product</h1>
            <ProductForm />
        </div>
    );
}

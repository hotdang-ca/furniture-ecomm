import { db } from '@/lib/db';
import { ProductForm } from '@/components/admin/ProductForm';
import styles from './page.module.css';

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function EditProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = db.getProductById(id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1 className={styles.title}>Edit Product: {product.name}</h1>
            <ProductForm initialData={product} />
        </div>
    );
}

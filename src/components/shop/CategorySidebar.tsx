import Link from 'next/link';
import styles from './CategorySidebar.module.css';
import { Category } from '@/lib/types';
import { getCategories } from '@/lib/mock-data';

interface CategorySidebarProps {
    activeCategorySlug: string;
}

export const CategorySidebar = ({ activeCategorySlug }: CategorySidebarProps) => {
    const allCategories = getCategories();

    const renderCategory = (cat: Category) => {
        const isActive = cat.slug === activeCategorySlug;
        const isParent = cat.children?.some(c => c.slug === activeCategorySlug || c.children?.some(gc => gc.slug === activeCategorySlug));
        const showChildren = isActive || isParent;

        return (
            <li key={cat.id} className={styles.item}>
                <Link
                    href={`/shop/${cat.slug}`}
                    className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                    {cat.name}
                </Link>
                {cat.children && showChildren && (
                    <ul className={styles.subList}>
                        {cat.children.map(renderCategory)}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <nav className={styles.nav}>
            <h3 className={styles.title}>Categories</h3>
            <ul className={styles.list}>
                {allCategories.map(renderCategory)}
            </ul>
        </nav>
    );
};

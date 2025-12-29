'use client';

import React, { useState } from 'react';
import { getCategories } from '@/lib/mock-data';
import styles from './CategorySelector.module.css';

interface CategorySelectorProps {
    onSelect: (categoryId: string, parentIds: string[]) => void;
}

export const CategorySelector = ({ onSelect }: CategorySelectorProps) => {
    const allCategories = getCategories();

    const [topLevel, setTopLevel] = useState<string>('');
    const [secondary, setSecondary] = useState<string>('');
    const [sub, setSub] = useState<string>('');

    const topCats = allCategories;
    const secondaryCats = topCats.find(c => c.id === topLevel)?.children || [];
    const subCats = secondaryCats.find(c => c.id === secondary)?.children || [];

    const handleTopLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setTopLevel(val);
        setSecondary('');
        setSub('');
        if (val) {
            onSelect(val, [val]);
        } else {
            onSelect('', []);
        }
    };

    const handleSecondaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSecondary(val);
        setSub('');
        if (val) {
            onSelect(val, [topLevel, val]);
        } else {
            // Fallback to top level
            onSelect(topLevel, [topLevel]);
        }
    };

    const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setSub(val);
        if (val) {
            onSelect(val, [topLevel, secondary, val]);
        } else {
            // Fallback to secondary
            onSelect(secondary, [topLevel, secondary]);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <label className={styles.label}>Top Level</label>
                <select
                    value={topLevel}
                    onChange={handleTopLevelChange}
                    className={styles.select}
                >
                    <option value="">Select...</option>
                    {topCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className={styles.column}>
                <label className={styles.label}>Secondary</label>
                <select
                    value={secondary}
                    onChange={handleSecondaryChange}
                    className={styles.select}
                    disabled={!topLevel || secondaryCats.length === 0}
                >
                    <option value="">{secondaryCats.length === 0 ? 'No options' : 'Select...'}</option>
                    {secondaryCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className={styles.column}>
                <label className={styles.label}>Sub Category</label>
                <select
                    value={sub}
                    onChange={handleSubChange}
                    className={styles.select}
                    disabled={!secondary || subCats.length === 0}
                >
                    <option value="">{subCats.length === 0 ? 'No options' : 'Select...'}</option>
                    {subCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
        </div>
    );
};

'use client';

import React from 'react';
import { ProductOption, ProductOptionValue } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import styles from './OptionBuilder.module.css';

interface OptionBuilderProps {
    options: ProductOption[];
    onChange: (options: ProductOption[]) => void;
}

export const OptionBuilder = ({ options, onChange }: OptionBuilderProps) => {

    const addOption = () => {
        const newOption: ProductOption = {
            id: `opt-${Date.now()}`,
            name: '',
            type: 'select',
            values: []
        };
        onChange([...options, newOption]);
    };

    const updateOption = (id: string, updates: Partial<ProductOption>) => {
        onChange(options.map(opt => opt.id === id ? { ...opt, ...updates } : opt));
    };

    const removeOption = (id: string) => {
        onChange(options.filter(opt => opt.id !== id));
    };

    const addValue = (optionId: string) => {
        const option = options.find(o => o.id === optionId);
        if (!option) return;

        const newValue: ProductOptionValue = {
            id: `val-${Date.now()}`,
            name: '',
            priceModifier: 0
        };

        updateOption(optionId, { values: [...option.values, newValue] });
    };

    const updateValue = (optionId: string, valueId: string, updates: Partial<ProductOptionValue>) => {
        const option = options.find(o => o.id === optionId);
        if (!option) return;

        const newValues = option.values.map(v => v.id === valueId ? { ...v, ...updates } : v);
        updateOption(optionId, { values: newValues });
    };

    const removeValue = (optionId: string, valueId: string) => {
        const option = options.find(o => o.id === optionId);
        if (!option) return;

        updateOption(optionId, { values: option.values.filter(v => v.id !== valueId) });
    };

    return (
        <div className={styles.container}>
            {options.map((option, idx) => (
                <div key={option.id} className={styles.optionCard}>
                    <div className={styles.optionHeader}>
                        <input
                            type="text"
                            placeholder="Option Name (e.g. Wood)"
                            value={option.name}
                            onChange={e => updateOption(option.id, { name: e.target.value })}
                            className={styles.input}
                        />
                        <select
                            value={option.type}
                            onChange={e => updateOption(option.id, { type: e.target.value as 'select' | 'radio' })}
                            className={styles.select}
                        >
                            <option value="select">Dropdown</option>
                            <option value="radio">Radio Buttons</option>
                        </select>
                        <button onClick={() => removeOption(option.id)} className={styles.removeBtn}> Remove </button>
                    </div>

                    <div className={styles.valuesList}>
                        <label className={styles.label}>Values & Price Modifiers</label>
                        {option.values.map(val => (
                            <div key={val.id} className={styles.valueRow}>
                                <input
                                    type="text"
                                    placeholder="Value Name (e.g. Oak)"
                                    value={val.name}
                                    onChange={e => updateValue(option.id, val.id, { name: e.target.value })}
                                    className={styles.input}
                                />
                                <div className={styles.priceInputGroup}>
                                    <span>+$</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        value={val.priceModifier}
                                        onChange={e => updateValue(option.id, val.id, { priceModifier: Number(e.target.value) })}
                                        className={styles.inputSm}
                                    />
                                </div>
                                <button onClick={() => removeValue(option.id, val.id)} className={styles.removeBtnSm}>&times;</button>
                            </div>
                        ))}
                        <Button type="button" size="sm" variant="outline" onClick={() => addValue(option.id)}>+ Add Value</Button>
                    </div>
                </div>
            ))}
            <Button type="button" onClick={addOption}>+ Add New Option</Button>
        </div>
    );
};

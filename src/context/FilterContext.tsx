"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
    selectedTech: string | null;
    setSelectedTech: (tech: string | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    return (
        <FilterContext.Provider value={{ selectedTech, setSelectedTech }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}

'use client';

import { useEffect, useState } from 'react';
import { Layout, layoutService } from '../services/layoutService';
import { ItemCard } from './cards/itemCard';


interface SectionProps {
  onLayoutClick: (id: string) => void;
}

export const LayoutSection = ({ onLayoutClick, }: SectionProps) => {
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLayouts(layoutService.getAll());
  }, []);

  const filteredLayouts = searchTerm
    ? layouts.filter(layout => layout.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : layouts;

  const handleLayoutClick = (layoutId: string) => {
    // Handle layout click as needed
    onLayoutClick(layoutId);
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Layouts</h2>
        <p className="text-gray-400 text-base mb-4">Dashboard templates and visualizations</p>
      </div>
      
      {filteredLayouts.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No layouts available</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredLayouts.map((layout) => (
            <ItemCard
              key={layout.id}
              name={layout.name}
              description={layout.description}
              variant="bordered"
              onClick={() => handleLayoutClick(layout.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
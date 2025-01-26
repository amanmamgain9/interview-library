'use client';

import { useEffect, useState } from 'react';
import { Layout, layoutService } from '../services/layoutService';

export const LayoutSection = () => {
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLayouts(layoutService.getAll());
  }, []);

  const filteredLayouts = searchTerm
    ? layouts.filter(layout => layout.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : layouts;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Layouts</h2>
        <p className="text-gray-600 text-sm">Dashboard templates and visualizations</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredLayouts.map((layout) => (
          <div key={layout.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{layout.name}</h3>
            <p className="text-gray-600">{layout.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
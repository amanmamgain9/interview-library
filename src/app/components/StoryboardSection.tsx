'use client';

import { useEffect, useState } from 'react';
import { Storyboard, storyboardService } from '../services/storyboardService';
import { ItemCard } from './cards/itemCard';

export const StoryboardSection = () => {
  const [storyboards, setStoryboards] = useState<Storyboard[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setStoryboards(storyboardService.getAll());
  }, []);

  const filteredStoryboards = searchTerm
    ? storyboards.filter(storyboard => storyboard.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : storyboards;

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Storyboards</h2>
        <p className="text-gray-400 text-base mb-4">PowerPoint presentations and reports</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredStoryboards.map((storyboard) => (
          <ItemCard
            key={storyboard.id}
            name={storyboard.name}
            description={storyboard.description}
          />
        ))}
      </div>
    </section>
  );
};
'use client';

import { useEffect, useState } from 'react';
import { Storyboard, storyboardService } from '../services/storyboardService';

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
        <h2 className="text-xl font-semibold mb-2">Storyboards</h2>
        <p className="text-gray-600 text-sm">PowerPoint presentations and reports</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {filteredStoryboards.map((storyboard) => (
          <div key={storyboard.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{storyboard.name}</h3>
            <p className="text-gray-600">{storyboard.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
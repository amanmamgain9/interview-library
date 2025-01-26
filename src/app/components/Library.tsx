'use client';

import { useState } from 'react';
import { SearchBar } from './SearchBar';
import { TabNavigation } from './TabNavigation';
import { LibraryItem } from './LibraryItem';

const TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'kpi', label: 'KPI' },
  { id: 'layouts', label: 'Layouts' },
  { id: 'storyboards', label: 'Storyboards' },
];

export const Library = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredItems = [
    {
      name: 'Item Name',
      description: 'Short description of the item goes nicely here.',
      date: '06/27/2024',
    },
  ];

  const trendingItems = [
    {
      name: 'Item name',
      description: 'Short description of the item goes nicely here.',
      date: '06/27/2024',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Library</h1>
        <p className="text-gray-600">Browse for assets needed to report and present analysis.</p>
      </div>

      <SearchBar onSearch={setSearchQuery} />

      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <section>
        <h2 className="text-xl font-semibold mb-2">Featured</h2>
        <p className="text-gray-600 text-sm mb-4">Curated top picks from this week</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {featuredItems.map((item, index) => (
            <LibraryItem key={index} {...item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Trending</h2>
        <p className="text-gray-600 text-sm mb-4">Most popular by community</p>
        <div className="grid grid-cols-2 gap-4">
          {trendingItems.map((item, index) => (
            <LibraryItem key={index} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};
'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { AssetService, Asset, AssetDetails } from '../services/assetService';
import { ItemCard } from './cards/itemCard';

interface FeatureComponentProps {
  assetService: AssetService;
  onLayoutClick: (layoutId: string) => void;
}

interface SectionProps {
  title: string;
  subtitle: string;
  items: (Asset & AssetDetails)[];
  error: string | null;
  onRetry: () => void;
  onItemClick: (type: string, id: string) => void;
  variant: 'bordered' | 'minimal';
}

const Section = ({ title, subtitle, items, error, onRetry, onItemClick, variant }: SectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-base mb-4">{subtitle}</p>
      {items.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No {title.toLowerCase()} items available</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ItemCard
              key={`${item.type}-${item.id}`}
              name={item.name}
              description={item.description}
              variant={variant}
              onClick={() => onItemClick(item.type, item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const FeatureComponent = ({ assetService, onLayoutClick }: FeatureComponentProps) => {
  const [featuredItems, setFeaturedItems] = useState<(Asset & AssetDetails)[]>([]);
  const [trendingItems, setTrendingItems] = useState<(Asset & AssetDetails)[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<(Asset & AssetDetails)[]>([]);
  
  const [featuredError, setFeaturedError] = useState<string | null>(null);
  const [trendingError, setTrendingError] = useState<string | null>(null);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  const handleItemClick = (type: string, id: string) => {
    if (type === 'layout') {
      onLayoutClick(id);
    }
    // Handle other types as needed
  };

  const loadFeatured = async () => {
    try {
      const items = assetService.getFeatured();
      setFeaturedItems(items);
      setFeaturedError(null);
    } catch (err) {
      setFeaturedError('Failed to load featured items');
      console.error('Error loading featured items:', err);
    }
  };

  const loadTrending = async () => {
    try {
      const items = assetService.getTrending();
      setTrendingItems(items);
      setTrendingError(null);
    } catch (err) {
      setTrendingError('Failed to load trending items');
      console.error('Error loading trending items:', err);
    }
  };

  const loadFavorites = async () => {
    try {
      const items = assetService.getFavorites();
      setFavoriteItems(items);
      setFavoritesError(null);
    } catch (err) {
      setFavoritesError('Failed to load favorite items');
      console.error('Error loading favorite items:', err);
    }
  };

  useEffect(() => {
    loadFeatured();
    loadTrending();
    loadFavorites();
  }, [assetService]);

  return (
    <div>
      <Section
        title="Featured"
        subtitle="Curated top picks from this week"
        items={featuredItems}
        error={featuredError}
        onRetry={loadFeatured}
        onItemClick={handleItemClick}
        variant="bordered"
      />
      
      <Section
        title="Trending"
        subtitle="Most popular by community"
        items={trendingItems}
        error={trendingError}
        onRetry={loadTrending}
        onItemClick={handleItemClick}
        variant="minimal"
      />
      
      <Section
        title="Favorites"
        subtitle="Your saved items"
        items={favoriteItems}
        error={favoritesError}
        onRetry={loadFavorites}
        onItemClick={handleItemClick}
        variant="bordered"
      />
    </div>
  );
};
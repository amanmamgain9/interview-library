'use client';
import { useEffect, useState } from 'react';
import { AssetService, Asset, AssetDetails } from '../services/assetService';

interface FeatureComponentProps {
  assetService: AssetService;
  onLayoutClick: (layoutId: string) => void;
}

const ItemCard = ({ 
  name, 
  description, 
  date, 
  type,
  id,
  onClick 
}: { 
  name: string;
  description: string;
  date: string;
  type: string;
  id: string;
  onClick: (type: string, id: string) => void;
}) => (
  <div 
    className="bg-white rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => onClick(type, id)}
  >
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
      <p className="text-xs text-gray-400 mt-2">{date}</p>
    </div>
  </div>
);

interface SectionProps {
  title: string;
  subtitle: string;
  items: (Asset & AssetDetails)[];
  error: string | null;
  onRetry: () => void;
  onItemClick: (type: string, id: string) => void;
}

const Section = ({ title, subtitle, items, error, onRetry, onItemClick }: SectionProps) => {
  if (error) {
    return (
      <section className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{subtitle}</p>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No {title.toLowerCase()} items available</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <ItemCard
              key={`${item.type}-${item.id}`}
              name={item.name}
              description={item.description}
              date={new Date().toLocaleDateString()}
              type={item.type}
              id={item.id}
              onClick={onItemClick}
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
      />
      
      <Section
        title="Trending"
        subtitle="Most popular by community"
        items={trendingItems}
        error={trendingError}
        onRetry={loadTrending}
        onItemClick={handleItemClick}
      />
      
      <Section
        title="Favorites"
        subtitle="Your saved items"
        items={favoriteItems}
        error={favoritesError}
        onRetry={loadFavorites}
        onItemClick={handleItemClick}
      />
    </div>
  );
};
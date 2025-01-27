import React from 'react';
import { Asset, AssetDetails, AssetService } from '../services/assetService';
import { KPICard } from './cards/kpiCard';

interface SearchResultsProps {
  query: string;
  activeTab: string;
  assetService: AssetService;
  onLayoutClick: (layoutId: string) => void;
}

export const SearchResults = ({ 
  query, 
  activeTab, 
  assetService,
  onLayoutClick 
}: SearchResultsProps) => {
  const getSearchResults = () => {
    if (!query.trim()) return [];

    switch (activeTab) {
      case 'featured':
        return assetService.searchAcrossAll(query);
      case 'kpi':
        return assetService.searchAcrossAll(query)
          .filter(asset => asset.type === 'kpi');
      case 'layouts':
        return assetService.searchAcrossAll(query)
          .filter(asset => asset.type === 'layout');
      case 'storyboards':
        return assetService.searchAcrossAll(query)
          .filter(asset => asset.type === 'storyboard');
      default:
        return [];
    }
  };

  const renderAsset = (asset: Asset & AssetDetails) => {
    console.log(asset);
    switch (asset.type) {
      case 'kpi':
        return <KPICard key={asset.id} kpi={asset} />;
      
      case 'layout':
      case 'storyboard':
        return (
          <div key={asset.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{asset.name}</h3>
            <p className="text-gray-600">{asset.description}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const results = getSearchResults();

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Search Results {results.length > 0 && `(${results.length})`}
        </h2>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Searching in: {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No results found for "{query}"</p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search term or switching tabs
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(renderAsset)}
        </div>
      )}
    </div>
  );
};
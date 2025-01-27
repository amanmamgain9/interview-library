'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { TabNavigation } from './TabNavigation';
import { FeatureComponent } from './FeaturedSection';
import { KPISection } from './KPISection';
import { LayoutSection } from './LayoutSection';
import { StoryboardSection } from './StoryboardSection';
import { SearchResults } from './SearchResults';
import { LayoutModal } from './modals/LayoutModal';
import { AssetService } from '../services/assetService';
import KpiService from '../services/kpiService';
import LayoutService from '../services/layoutService';
import StoryboardService from '../services/storyboardService';

const TABS = [
  { id: 'featured', label: 'Featured' },
  { id: 'kpi', label: 'KPI' },
  { id: 'layouts', label: 'Layouts' },
  { id: 'storyboards', label: 'Storyboards' },
];

export const Library = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null);

  // Initialize services
  const assetService = useMemo(() => {
    const kpiService = new KpiService();
    const layoutService = new LayoutService();
    const storyboardService = new StoryboardService();
    return new AssetService(kpiService, layoutService, storyboardService);
  }, []);

  const handleLayoutClick = (layoutId: string) => {
    setSelectedLayoutId(layoutId);
  };

  const handleCloseModal = () => {
    setSelectedLayoutId(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderContent = () => {
    if (searchQuery.trim()) {
      return (
        <SearchResults
          query={searchQuery}
          activeTab={activeTab}
          assetService={assetService}
          onLayoutClick={handleLayoutClick}
        />
      );
    }

    switch (activeTab) {
      case 'featured':
        return (
          <FeatureComponent 
            assetService={assetService} 
            onLayoutClick={handleLayoutClick}
          />
        );
      case 'kpi':
        return <KPISection />;
      case 'layouts':
        return <LayoutSection onLayoutClick={handleLayoutClick} />;
      case 'storyboards':
        return <StoryboardSection />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="text-center mb-14">
        <h1 className="text-6xl font-boring-bold mb-8">Library</h1>
        <p className="text-xl">
          Browse for assets needed to report and present analysis.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {renderContent()}

      {/* Layout Modal */}
      <LayoutModal
        isOpen={selectedLayoutId !== null}
        onClose={handleCloseModal}
        layoutId={selectedLayoutId || ''}
      />
    </div>
  );
};
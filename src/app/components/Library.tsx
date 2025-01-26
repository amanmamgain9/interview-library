'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { TabNavigation } from './TabNavigation';
import { FeatureComponent } from './FeaturedSection';
import { KPISection } from './KPISection';
import { LayoutSection } from './LayoutSection';
import { StoryboardSection } from './StoryboardSection';
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

  // Initialize services
  const assetService = useMemo(() => {
    const kpiService = new KpiService();
    const layoutService = new LayoutService();
    const storyboardService = new StoryboardService();
    return new AssetService(kpiService, layoutService, storyboardService);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'featured':
        return <FeatureComponent assetService={assetService} />;
      case 'kpi':
        return <KPISection />;
      case 'layouts':
        return <LayoutSection />;
      case 'storyboards':
        return <StoryboardSection />;
      default:
        return <div>Coming soon...</div>;
    }
  };

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

      {renderActiveTab()}
    </div>
  );
};
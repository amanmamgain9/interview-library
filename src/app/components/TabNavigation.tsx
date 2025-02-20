import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-100 p-1 rounded-lg flex flex-wrap w-full mb-8 text-base">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex-1 min-w-32 px-6 py-2 rounded-md transition-all m-1 ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm font-semibold'
              : 'text-gray-500 hover:text-gray-900 font-medium'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
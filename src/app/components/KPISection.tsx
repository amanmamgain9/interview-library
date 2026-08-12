'use client';

import { useEffect, useState } from 'react';
import { KPI, kpiService } from '../services/kpiService';
import { KPICard } from './cards/kpiCard';

export const KPISection = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadKPIs = () => {
      const allKpis = kpiService.getAll();
      setKpis(allKpis);
    };

    loadKPIs();
  }, []);

  const filteredKPIs = searchTerm
    ? kpiService.searchByName(searchTerm)
    : kpis;

  const handleKPIClick = (kpi: KPI) => {
    // Handle KPI selection - can be implemented based on requirements
    console.log('Selected KPI:', kpi);
  };

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold mb-2">Key Performance Indicators</h2>
        <p className="text-gray-600 text-base mb-4">Browse and analyze key metrics</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredKPIs.map((kpi) => (
          <KPICard
            key={kpi.id}
            kpi={kpi}
            variant="bordered"
            onClick={() => handleKPIClick(kpi)}
          />
        ))}
      </div>
    </section>
  );
};
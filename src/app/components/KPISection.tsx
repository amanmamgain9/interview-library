'use client';

import { useEffect, useState } from 'react';
import { KPI, kpiService } from '../services/kpiService';

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

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Key Performance Indicators</h2>
        <p className="text-gray-600 text-sm">Browse and analyze key metrics</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filteredKPIs.map((kpi) => (
          <div key={kpi.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{kpi.name}</h3>
            <p className="text-gray-600">{kpiService.getTruncatedDescription(kpi.description)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
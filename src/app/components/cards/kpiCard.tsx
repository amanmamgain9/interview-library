import React from 'react';
import { KPI, kpiService } from '../../services/kpiService';
import { BarChart, PieChart, LineChart } from 'lucide-react';

interface KPICardProps {
  kpi: KPI;
}

const VisualIcon = ({ type }: { type: string }) => {
  switch (type.toLowerCase()) {
    case 'bar chart':
      return <BarChart className="h-4 w-4" />;
    case 'pie chart':
      return <PieChart className="h-4 w-4" />;
    case 'line chart':
    case 'trend line':
      return <LineChart className="h-4 w-4" />;
    default:
      return null;
  }
};

export const KPICard = ({ kpi }: KPICardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-1">{kpi.name}</h3>
        <p className="text-sm text-gray-600">
          {kpiService.getTruncatedDescription(kpi.description)}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Areas */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Business Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {kpi.areas.map((area) => (
              <span 
                key={area}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Calculation */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Calculation:</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            {kpi.calculation}
          </p>
        </div>

        {/* Available Visualizations */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Available Visualizations:</h4>
          <div className="flex gap-3">
            {kpi.visualsAvailable.map((visual) => (
              <div 
                key={visual}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <VisualIcon type={visual} />
                <span>{visual}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
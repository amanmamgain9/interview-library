import React from 'react';
import { BarChart, PieChart, LineChart, Package } from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  description: string;
  calculation: string;
  visualsAvailable: string[];
  areas: string[];
  ifRequested?: boolean;
  ifOwned?: boolean;
}

interface KPICardProps {
  kpi: KPI;
  variant?: 'bordered' | 'minimal';
  onClick?: () => void;
  onRequest?: () => void;
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

export const KPICard = ({ kpi, variant = 'bordered', onClick, onRequest }: KPICardProps) => {
  const handleClick = () => {
    if (!kpi.ifOwned) {
      onClick?.();
    }
  };

  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Request sent!');
  };

  return (
    <div 
      className={`
        rounded-lg p-4 flex items-start gap-4
        ${!kpi.ifOwned ? 'cursor-pointer' : ''}
        ${variant === 'bordered' ? 'bg-white border border-gray-100' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-semibold text-gray-900">{kpi.name}</h3>
          {!kpi.ifOwned && (
            <button
              onClick={handleRequest}
              className={`
                px-3 py-2 rounded-md text-sm font-medium 
                flex items-center gap-2
                ${kpi.ifRequested 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
                }
              `}
              disabled={kpi.ifRequested}
            >
              <Package className="h-4 w-4" />
              {kpi.ifRequested ? 'Requested' : 'Request'}
            </button>
          )}
        </div>

        <p className="text-sm text-gray-700 font-medium mt-1">
          {kpi.description}
        </p>

        <div className="mt-4 space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Business Areas:</h4>
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

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Calculation:</h4>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
              {kpi.calculation}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Available Visualizations:</h4>
            <div className="flex gap-3">
              {kpi.visualsAvailable.map((visual) => (
                <div 
                  key={visual}
                  className="flex items-center gap-1 text-sm text-gray-700"
                >
                  <VisualIcon type={visual} />
                  <span>{visual}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
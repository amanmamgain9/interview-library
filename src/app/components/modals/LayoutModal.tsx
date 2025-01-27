import React, { useEffect, useState } from 'react';
import { XIcon, LinkIcon, LayoutGrid, LineChart, BarChart, PieChart } from 'lucide-react';
import { Layout, layoutService } from '../../services/layoutService';
import { KPI, kpiService } from '../../services/kpiService';

// Helper function to get icon component for visualization type
const getVisualIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'line chart':
      return LineChart;
    case 'bar chart':
      return BarChart;
    case 'pie chart':
      return PieChart;
    default:
      return LineChart;
  }
};

interface LayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
}

export const LayoutModal: React.FC<LayoutModalProps> = ({ isOpen, onClose, layoutId }) => {
  const [layout, setLayout] = useState<Layout | undefined>();
  const [kpIs, setKpIs] = useState<KPI[]>([]);
  const [selectedKpi, setSelectedKpi] = useState<KPI | null>(null);
  const [selectedMetric, setSelectedMetric] = useState('');
  const [selectedVisual, setSelectedVisual] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [affiliate, setAffiliate] = useState('all');

  useEffect(() => {
    if (isOpen && layoutId) {
      const layoutData = layoutService.getById(layoutId);
      setLayout(layoutData);
      
      const layoutKpIs = layoutData?.kpis
        .map(kpiId => kpiService.getById(kpiId))
        .filter(Boolean) as KPI[];
      setKpIs(layoutKpIs);
      
      if (layoutKpIs.length > 0) {
        const firstKpi = layoutKpIs[0];
        setSelectedKpi(firstKpi);
        setSelectedMetric(firstKpi.metricIds[0] || '');
        setSelectedVisual(firstKpi.visualsAvailable[0] || '');
      }
    }
  }, [isOpen, layoutId]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!layout || !isOpen) return null;

  const availableVisuals = selectedKpi?.visualsAvailable || [];
  const availableAffiliates = selectedKpi?.affiliateApplicability || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full md:w-1/2 md:ml-12 h-full md:h-[90vh] bg-white flex flex-col">
        {/* Main scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <LayoutGrid className="w-5 h-5 text-gray-700" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{layout.name}</h2>
                    <span className="text-gray-500 text-sm">Layout</span>
                  </div>
                  <p className="text-gray-500 text-sm">{layout.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <LinkIcon className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XIcon className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* KPI/Metric Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select KPI</label>
                <select
                  value={selectedKpi?.id || ''}
                  onChange={(e) => {
                    const kpi = kpIs.find(k => k.id === e.target.value);
                    if (kpi) {
                      setSelectedKpi(kpi);
                      setSelectedMetric(kpi.metricIds[0] || '');
                      setSelectedVisual(kpi.visualsAvailable[0] || '');
                    }
                  }}
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  {kpIs.map(kpi => (
                    <option key={kpi.id} value={kpi.id}>
                      {kpi.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Metric</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                  disabled={!selectedKpi}
                >
                  {selectedKpi?.metricIds.map(metric => (
                    <option key={metric} value={metric}>
                      {metric.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visualization Selector */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Visualization Type</h4>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                {availableVisuals.map((visualType) => {
                  const Icon = getVisualIcon(visualType);
                  return (
                    <button
                      key={visualType}
                      onClick={() => setSelectedVisual(visualType)}
                      className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 whitespace-nowrap ${
                        selectedVisual === visualType 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{visualType}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="p-2 border rounded-lg text-sm flex-1"
              >
                <option value="all">All</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
                <option value="last_quarter">Last Quarter</option>
              </select>

              <select
                value={affiliate}
                onChange={(e) => setAffiliate(e.target.value)}
                className="p-2 border rounded-lg text-sm flex-1"
              >
                <option value="all">All Affiliates</option>
                {availableAffiliates.map(aff => (
                  <option key={aff} value={aff}>
                    {aff.charAt(0).toUpperCase() + aff.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Visualization Preview */}
            <div className="bg-gray-50 p-4 rounded-lg h-48 md:h-64 flex flex-col items-center justify-center">
              <div className="text-center text-gray-500">
                {(() => {
                  const Icon = getVisualIcon(selectedVisual);
                  return <Icon className="w-8 h-8 mx-auto mb-2" />;
                })()}
                <p className="text-lg font-medium">{selectedVisual}</p>
                <p className="text-sm mt-2">{selectedKpi?.name}</p>
                <p className="text-sm text-gray-600">{selectedMetric}</p>
                <p className="text-sm mt-2">
                  {dateRange.replace(/_/g, ' ')} | {affiliate}
                </p>
              </div>
            </div>

            {/* Business Questions */}
            {selectedKpi && (
              <div className="space-y-4">
                <h3 className="font-semibold">Business Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedKpi.businessQuestions.map((question, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Question {index + 1}</p>
                      <p className="text-sm text-gray-600">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed bottom button */}
        <div className="p-4 md:p-6 border-t bg-white">
          <button 
            onClick={() => layoutService.toggleFavorite(layout.id)}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {layout.favorite ? 'Remove from favorites' : 'Favorite item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutModal;
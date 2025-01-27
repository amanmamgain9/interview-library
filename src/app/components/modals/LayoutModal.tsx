import React, { useEffect, useState } from 'react';
import { XIcon, LinkIcon, LayoutGrid } from 'lucide-react';
import { Layout, layoutService } from '../../services/layoutService';
import { KPI, kpiService } from '../../services/kpiService';

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
  const [selectedVisual, setSelectedVisual] = useState('📈 Line');
  const [dateRange, setDateRange] = useState('last_month');
  const [affiliate, setAffiliate] = useState('all');

  useEffect(() => {
    if (isOpen && layoutId) {
      const layoutData = layoutService.getById(layoutId);
      setLayout(layoutData);
      
      // Load KPI details for layout's KPIs
      const layoutKpIs = layoutData?.kpis
        .map(kpiId => kpiService.getById(kpiId))
        .filter(Boolean) as KPI[];
      setKpIs(layoutKpIs);
      
      // Set initial selections
      if (layoutKpIs.length > 0) {
        const firstKpi = layoutKpIs[0];
        setSelectedKpi(firstKpi);
        setSelectedMetric(firstKpi.metricIds[0] || '');
        setSelectedVisual(firstKpi.visualsAvailable[0] || '📈 Line');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-xl w-1/2 h-9/10 ml-12 p-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <LayoutGrid className="w-5 h-5 text-gray-700" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">INTES</h2>
                <span className="text-gray-500 text-sm">Layout</span>
              </div>
              <p className="text-gray-500 text-sm">{layout.name}</p>
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

        <p className="text-gray-700 text-sm">
          {layout.description}
        </p>

        {/* KPI/Metric Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select KPI</label>
            <select
              value={selectedKpi?.id || ''}
              onChange={(e) => {
                const kpi = kpIs.find(k => k.id === e.target.value);
                if (kpi) {
                  setSelectedKpi(kpi);
                  setSelectedMetric(kpi.metricIds[0] || '');
                  setSelectedVisual(kpi.visualsAvailable[0] || '📈 Line');
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
          <div className="flex gap-2">
            {(selectedKpi?.visualsAvailable || ['📈 Line']).map((visual) => (
              <button
                key={visual}
                onClick={() => setSelectedVisual(visual)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedVisual === visual 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {visual}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="p-2 border rounded-lg text-sm flex-1"
          >
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
            <option value="subsidiary1">Subsidiary 1</option>
            <option value="subsidiary2">Subsidiary 2</option>
          </select>
        </div>

        {/* Visualization Preview */}
        <div className="bg-gray-50 p-4 rounded-lg h-64 flex flex-col items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">{selectedVisual} Chart</p>
            <p className="text-sm mt-2">{selectedKpi?.name}</p>
            <p className="text-sm text-gray-600">{selectedMetric}</p>
            <p className="text-sm mt-2">
              {dateRange.replace(/_/g, ' ')} | {affiliate}
            </p>
          </div>
        </div>

        {/* Business Questions */}
        <div className="space-y-4">
          <h3 className="font-semibold">Business Questions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium mb-2">Question {num}</p>
                <p className="text-sm text-gray-600">
                  Short description of the item goes nicely here.
                </p>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => layoutService.toggleFavorite(layout.id)}
          className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {layout.favorite ? 'Remove from favorites' : 'Favorite item'}
        </button>
      </div>
    </div>
  );
};

export default LayoutModal;
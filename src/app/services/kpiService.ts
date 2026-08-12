import { Asset } from './assetService';

export interface KPI extends Asset {
    id: string;
    name: string;
    businessQuestions: string[];
    metricIds: string[];
    description: string;
    calculation: string;
    visualsAvailable: string[];
    affiliateApplicability: string[];
    areas: string[];
    ifRequested?: boolean;
    ifOwned?: boolean;
}

export const kpiData: KPI[] = [
    {
        id: "revenue_growth",
        name: "Revenue Growth Rate",
        businessQuestions: [
            "Are we meeting our growth targets?",
            "How does our growth compare to industry average?",
            "Which regions are driving growth?"
        ],
        metricIds: ["total_revenue", "yoy_growth"],
        description: "Year-over-year revenue growth rate across all business units",
        calculation: "(Current Period Revenue - Prior Period Revenue) / Prior Period Revenue * 100",
        visualsAvailable: ["Line Chart", "Bar Chart"],
        affiliateApplicability: ["subsidary1", "subsidary2"],
        areas: ["Sales", "Finance", "Executive"],
        type: "kpi",
        ifRequested: false,
        ifOwned: false
    },
    {
        id: "operating_margin",
        name: "Operating Margin",
        businessQuestions: [
            "How efficient are our operations?",
            "Are cost reduction initiatives working?"
        ],
        metricIds: ["operating_income", "revenue", "costs"],
        description: "Operating profit as a percentage of revenue",
        calculation: "Operating Income / Revenue * 100",
        visualsAvailable: ["Trend Line"],
        affiliateApplicability: ["subsidary1", "subsidary2"],
        areas: ["Operations", "Finance"],
        type: "kpi",
        ifRequested: false,
        ifOwned: true
    },
    {
        id: "market_share",
        name: "Market Share",
        businessQuestions: [
            "Are we gaining or losing market share?",
            "What's our share in key segments?"
        ],
        metricIds: ["sales_volume", "segment_share"],
        description: "Company's share of total addressable market",
        calculation: "Company Sales / Total Industry Sales * 100",
        visualsAvailable: ["Pie Chart"],
        affiliateApplicability: ["subsidary1", "subsidary2"],
        areas: ["Marketing", "Sales", "Strategy"],
        type: "kpi",
        ifRequested: true,
        ifOwned: false
    }
];

class KpiService {
    private readonly DESCRIPTION_LIMIT = 100;

    getAll(): KPI[] {
        return kpiData;
    }

    update(id: string, updates: Partial<KPI>): KPI[] {
        const index = kpiData.findIndex(k => k.id === id);
        if (index !== -1) {
            kpiData[index] = { ...kpiData[index], ...updates };
        }
        return kpiData;
    }

    getById(id: string): KPI | undefined {
        return kpiData.find(kpi => kpi.id === id);
    }

    searchByName(query: string): KPI[] {
        const normalizedQuery = query.toLowerCase();
        return kpiData.filter(kpi =>
            kpi.name.toLowerCase().includes(normalizedQuery)
        );
    }

    getTruncatedDescription(description: string): string {
        return description.length > this.DESCRIPTION_LIMIT 
            ? `${description.substring(0, this.DESCRIPTION_LIMIT)}...`
            : description;
    }
}

export const kpiService = new KpiService();
export default KpiService;
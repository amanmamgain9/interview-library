// app/services/kpi.service.ts

export interface KPI {
    id: string;
    name: string;
    businessQuestions: string[];
    metricIds: string[];
    description: string;
    calculation: string;
    visualsAvailable: string[];
    affiliateApplicability: string[];
    areas: string[];
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
        affiliateApplicability: ["All"],
        areas: ["Sales", "Finance", "Executive"]
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
        affiliateApplicability: ["All"],
        areas: ["Operations", "Finance"]
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
        areas: ["Marketing", "Sales", "Strategy"]
    }
];

class KpiService {
    private readonly STORAGE_KEY = 'kpis';
    private readonly DESCRIPTION_LIMIT = 100;

    constructor() {
        if (localStorage && !localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(kpiData));
        }
    }

    getAll(): KPI[] {
        const kpis = localStorage.getItem(this.STORAGE_KEY);
        return kpis ? JSON.parse(kpis) : [];
    }

    update(id: string, updates: Partial<KPI>): void {
        const kpis = this.getAll();
        const index = kpis.findIndex(k => k.id === id);
        if (index !== -1) {
            kpis[index] = { ...kpis[index], ...updates };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(kpis));
        }
    }

    getById(id: string): KPI | undefined {
        return this.getAll().find(kpi => kpi.id === id);
    }

    searchByName(query: string): KPI[] {
        const normalizedQuery = query.toLowerCase();
        return this.getAll().filter(kpi =>
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
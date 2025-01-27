// types/storyboard.ts
import { Asset } from './assetService';

export interface Storyboard extends Asset {
    id: string;
    name: string;
    description: string;
    coupledKPIs: string[];    // KPI IDs
    filters: {               // Filters applied to KPIs
        timeRange?: string;
        region?: string;
        segment?: string;
    };
    applicableAffiliates: string[];
    createdBy: string;
    createdAt: string;
    hasAccess: boolean;
    accessRequestStatus?: 'pending' | 'approved' | 'denied';
    type: 'storyboard';
}

export const storyboardData: Storyboard[] = [
    {
        id: "quarterly_review",
        name: "Q4 2024 Performance Review",
        description: "Quarterly performance analysis for board presentation",
        coupledKPIs: ["revenue_growth", "operating_margin"],
        filters: {
            timeRange: "Q4 2024",
            region: "Global"
        },
        applicableAffiliates: ["subsidary1", "subsidary2"],
        createdBy: "John Doe",
        createdAt: "2024-01-15",
        hasAccess: true,
        type: "storyboard"
    },
    {
        id: "market_analysis",
        name: "Market Share Analysis",
        description: "Competitive analysis and market positioning",
        coupledKPIs: ["market_share"],
        filters: {
            timeRange: "2024",
            segment: "Enterprise"
        },
        applicableAffiliates: ["subsidary1"],
        createdBy: "Jane Smith",
        createdAt: "2024-01-20",
        hasAccess: false,
        accessRequestStatus: "pending",
        type: "storyboard"
    }
];

class StoryboardService {
    getAll(): Storyboard[] {
        return storyboardData;
    }

    requestAccess(id: string): Storyboard[] {
        const index = storyboardData.findIndex(s => s.id === id);
        if (index !== -1 && !storyboardData[index].hasAccess) {
            storyboardData[index].accessRequestStatus = 'pending';
        }
        return storyboardData;
    }

    getById(id: string): Storyboard | undefined {
        return storyboardData.find(storyboard => storyboard.id === id);
    }
}

export const storyboardService = new StoryboardService();
export default StoryboardService;
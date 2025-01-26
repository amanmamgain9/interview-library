// types/storyboard.ts
export interface Storyboard {
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
        hasAccess: true
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
        accessRequestStatus: "pending"
    }
];

class StoryboardService {
    private readonly STORAGE_KEY = 'storyboards';

    constructor() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storyboardData));
        }
    }

    getAll(): Storyboard[] {
        const storyboards = localStorage.getItem(this.STORAGE_KEY);
        return storyboards ? JSON.parse(storyboards) : [];
    }

    requestAccess(id: string): void {
        const storyboards = this.getAll();
        const index = storyboards.findIndex(s => s.id === id);
        if (index !== -1 && !storyboards[index].hasAccess) {
            storyboards[index].accessRequestStatus = 'pending';
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storyboards));
        }
    }

    getById(id: string): Storyboard | undefined {
        return this.getAll().find(storyboard => storyboard.id === id);
    }
}

export const storyboardService = new StoryboardService();
export default StoryboardService;
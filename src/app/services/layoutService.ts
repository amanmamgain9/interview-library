// types/layout.ts
export interface Layout {
    id: string;
    name: string;
    description: string;
    numberOfPages: number;
    kpis: string[];  // KPI IDs being used
    previewImageUrl?: string;
    createdBy: string;
    createdAt: string;
    favorite: boolean;
    shareableLink: string;
}

export const layoutData: Layout[] = [
    {
        id: "sales_dashboard",
        name: "Sales Performance Dashboard",
        description: "Monthly sales performance tracking across regions",
        numberOfPages: 3,
        kpis: ["revenue_growth", "market_share"],
        previewImageUrl: "/api/placeholder/400/300",
        createdBy: "John Doe",
        createdAt: "2024-01-15",
        favorite: true,
        shareableLink: "https://dashboard/sales-perf"
    },
    {
        id: "operations_overview",
        name: "Operations Overview",
        description: "Key operational metrics",
        numberOfPages: 2,
        kpis: ["operating_margin"],
        previewImageUrl: "/api/placeholder/400/300",
        createdBy: "Jane Smith",
        createdAt: "2024-01-20",
        favorite: false,
        shareableLink: "https://dashboard/ops-overview"
    }
];

class LayoutService {
    private readonly STORAGE_KEY = 'layouts';

    constructor() {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(layoutData));
        }
    }

    getAll(): Layout[] {
        const layouts = localStorage.getItem(this.STORAGE_KEY);
        return layouts ? JSON.parse(layouts) : [];
    }

    toggleFavorite(id: string): void {
        const layouts = this.getAll();
        const index = layouts.findIndex(l => l.id === id);
        if (index !== -1) {
            layouts[index].favorite = !layouts[index].favorite;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(layouts));
        }
    }

    getById(id: string): Layout | undefined {
        return this.getAll().find(layout => layout.id === id);
    }
}

export const layoutService = new LayoutService();
export default LayoutService;
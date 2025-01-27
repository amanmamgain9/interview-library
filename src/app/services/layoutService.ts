// types/layout.ts
import { Asset } from './assetService';

export interface Layout extends Asset {
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
    type: 'layout';
}

export const layoutData: Layout[] = [
    {
        id: "sales_dashboard",
        name: "Sales Performance Dashboard",
        description: "Monthly sales performance tracking across regions",
        numberOfPages: 3,
        kpis: ["revenue_growth", "market_share"],
        createdBy: "John Doe",
        createdAt: "2024-01-15",
        favorite: true,
        shareableLink: "https://dashboard/sales-perf",
        type: "layout"
    },
    {
        id: "operations_overview",
        name: "Operations Overview",
        description: "Key operational metrics",
        numberOfPages: 2,
        kpis: ["operating_margin"],
        createdBy: "Jane Smith",
        createdAt: "2024-01-20",
        favorite: false,
        shareableLink: "https://dashboard/ops-overview",
        type: "layout"
    }
];

class LayoutService {
    getAll(): Layout[] {
        return layoutData;
    }

    toggleFavorite(id: string): Layout[] {
        const index = layoutData.findIndex(l => l.id === id);
        if (index !== -1) {
            layoutData[index].favorite = !layoutData[index].favorite;
        }
        return layoutData;
    }

    getById(id: string): Layout | undefined {
        return layoutData.find(layout => layout.id === id);
    }
}

export const layoutService = new LayoutService();
export default LayoutService;
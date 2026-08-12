import KpiService, {KPI} from "./kpiService";
import LayoutService, {Layout} from "./layoutService";
import StoryboardService, {Storyboard} from "./storyboardService";

export type AssetType = 'kpi' | 'layout' | 'storyboard';
export type AssetDetails = KPI | Layout | Storyboard;

export interface Asset {
    id: string;
    type: AssetType;
}

export interface AssetState {
    featured: Asset[];
    trending: Asset[];
    favorites: Asset[];
}

const initialState: AssetState = {
    featured: [
        { id: 'revenue_growth', type: 'kpi' },
        { id: 'sales_dashboard', type: 'layout' }
    ],
    trending: [
        { id: 'operating_margin', type: 'kpi' }
    ],
    favorites: []
};

export class AssetService {
    private state: AssetState;
    private kpiService: KpiService;
    private layoutService: LayoutService;
    private storyboardService: StoryboardService;

    constructor(
        kpiService: KpiService,
        layoutService: LayoutService,
        storyboardService: StoryboardService
    ) {
        this.kpiService = kpiService;
        this.layoutService = layoutService;
        this.storyboardService = storyboardService;
        this.state = { ...initialState };
    }

    getAssetDetails(asset: Asset): AssetDetails | undefined {
        switch (asset.type) {
            case 'kpi':
                return this.kpiService.getById(asset.id);
            case 'layout':
                return this.layoutService.getById(asset.id);
            case 'storyboard':
                return this.storyboardService.getById(asset.id);
        }
    }

    getFeatured(): (Asset & AssetDetails)[] {
        return this.state.featured
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    getTrending(): (Asset & AssetDetails)[] {
        return this.state.trending
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    getFavorites(): (Asset & AssetDetails)[] {
        return this.state.favorites
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    toggleFavorite(asset: Asset): void {
        const exists = this.state.favorites.find(
            a => a.id === asset.id && a.type === asset.type
        );
        
        this.state.favorites = exists
            ? this.state.favorites.filter(a => !(a.id === asset.id && a.type === asset.type))
            : [...this.state.favorites, asset];
    }

    searchAcrossAll(query: string): (Asset & AssetDetails)[] {
        const normalizedQuery = query.toLowerCase();
        
        // Get all assets
        const allAssets: (Asset & AssetDetails)[] = [
            ...this.kpiService.getAll().map(item => ({ ...item, type: 'kpi' as const })),
            ...this.layoutService.getAll().map(item => ({ ...item, type: 'layout' as const })),
            ...this.storyboardService.getAll().map(item => ({ ...item, type: 'storyboard' as const }))
        ];

        return allAssets.filter(asset => {
            // Basic search criteria for all asset types
            const basicMatch = asset.name.toLowerCase().includes(normalizedQuery) || 
                             asset.description.toLowerCase().includes(normalizedQuery);

            // Additional search for KPI areas
            if (asset.type === 'kpi') {
                const kpiAsset = asset as KPI;
                const areasMatch = kpiAsset.areas?.some(area => 
                    area.toLowerCase().includes(normalizedQuery)
                );
                return basicMatch || areasMatch;
            }

            return basicMatch;
        });
    }

    getState(): AssetState {
        return { ...this.state };
    }
}
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

export class AssetService {
    private readonly STORAGE_KEY = 'asset_state';
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
        this.initialize();
    }

    private initialize(): void {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
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
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialState));
        }
    }

    private getState(): AssetState {
        const state = localStorage.getItem(this.STORAGE_KEY);
        return state ? JSON.parse(state) : { featured: [], trending: [], favorites: [] };
    }

    private setState(state: AssetState): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
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
        return this.getState().featured
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    getTrending(): (Asset & AssetDetails)[] {
        return this.getState().trending
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    getFavorites(): (Asset & AssetDetails)[] {
        return this.getState().favorites
            .map(asset => {
                const details = this.getAssetDetails(asset);
                return details ? { ...asset, ...details } : undefined;
            })
            .filter((asset): asset is Asset & AssetDetails => asset !== undefined);
    }

    toggleFavorite(asset: Asset): void {
        const state = this.getState();
        const exists = state.favorites.find(
            a => a.id === asset.id && a.type === asset.type
        );
        
        state.favorites = exists
            ? state.favorites.filter(a => !(a.id === asset.id && a.type === asset.type))
            : [...state.favorites, asset];
        
        this.setState(state);
    }

    searchAcrossAll(query: string): (Asset & AssetDetails)[] {
        const normalizedQuery = query.toLowerCase();
        const allAssets: (Asset & AssetDetails)[] = [
            ...this.kpiService.getAll().map(item => ({ type: 'kpi' as const, ...item })),
            ...this.layoutService.getAll().map(item => ({ type: 'layout' as const, ...item })),
            ...this.storyboardService.getAll().map(item => ({ type: 'storyboard' as const, ...item }))
        ];

        return allAssets.filter(asset => 
            asset.name.toLowerCase().includes(normalizedQuery) || 
            asset.description.toLowerCase().includes(normalizedQuery)
        );
    }
}

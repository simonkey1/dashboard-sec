import type {
    DashboardData,
    DashboardStat,
    MarketMapData,
    TimeSeriesData,
    InvestmentRoiData,
    CompanyRankingData,
    InvestmentValidationData
} from './types';

export function transformDashboardStats(stats: DashboardStat[] | null): DashboardData {
    const defaultData: DashboardData = {
        market_map: [],
        time_series: [],
        investment_roi: [],
        company_ranking: [],
        investment_validation: []
    };

    if (!stats || !Array.isArray(stats)) {
        console.warn('Dashboard stats is null or not an array, returning default empty data.');
        return defaultData;
    }

    const dataMap: Partial<DashboardData> = {};

    stats.forEach(stat => {
        switch (stat.id) {
            case 'market_map':
                dataMap.market_map = (stat.data as any[] || []).map(item => ({
                    frecuencia: Number(item.frecuencia) || 0,
                    nombre_comuna: String(item.nombre_comuna || ''),
                    nombre_region: String(item.nombre_region || ''),
                    nombre_empresa: String(item.nombre_empresa || ''),
                    total_afectados: Number(item.total_afectados) || 0,
                    instability_index: Number(item.instability_index) || 0
                }));
                break;
            case 'time_series':
                dataMap.time_series = (stat.data as any[] || []).map(item => ({
                    mes: String(item.mes || ''),
                    afectados: Number(item.afectados) || 0,
                    nombre_region: String(item.nombre_region || '')
                }));
                break;
            case 'investment_roi':
                dataMap.investment_roi = (stat.data as any[] || []).map(item => ({
                    maturity_note: String(item.maturity_note || ''),
                    nombre_region: String(item.nombre_region || ''),
                    efficiency_ratio: Number(item.efficiency_ratio) || 0,
                    clientes_afectados: Number(item.clientes_afectados) || 0,
                    total_inversión_mmu: Number(item['total_inversión_mmu'] ?? item.total_inversion_mmu) || 0 // Handle potential naming variations
                }));
                break;
            case 'company_ranking':
                dataMap.company_ranking = (stat.data as any[] || []).map(item => ({
                    total_eventos: Number(item.total_eventos) || 0,
                    nombre_empresa: String(item.nombre_empresa || ''),
                    promedio_afectados: Number(item.promedio_afectados) || 0,
                    total_clientes_afectados: Number(item.total_clientes_afectados) || 0
                }));
                break;
            case 'investment_validation':
                dataMap.investment_validation = (stat.data as any[] || []).map(item => ({
                    type: String(item.type || ''),
                    year: Number(item.year) || 0,
                    delta: Number(item.delta) || 0,
                    context: String(item.context || ''),
                    project: String(item.project || '')
                }));
                break;
            default:
                console.warn(`Unknown dashboard stat ID: ${stat.id}`);
        }
    });

    return { ...defaultData, ...dataMap };
}

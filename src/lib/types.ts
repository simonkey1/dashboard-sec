export type MarketMapData = {
    frecuencia: number;
    nombre_comuna: string;
    nombre_region: string;
    nombre_empresa: string;
    total_afectados: number;
    instability_index: number;
};

export type TimeSeriesData = {
    mes: string;
    afectados: number;
    nombre_region: string;
};

export type InvestmentRoiData = {
    maturity_note: string;
    nombre_region: string;
    efficiency_ratio: number;
    clientes_afectados: number;
    total_inversión_mmu: number;
};

export type CompanyRankingData = {
    total_eventos: number;
    nombre_empresa: string;
    promedio_afectados: number;
    total_clientes_afectados: number;
};

export type InvestmentValidationData = {
    type: string;
    year: number;
    delta: number;
    context: string;
    project: string;
};

export type DashboardData = {
    market_map: MarketMapData[];
    time_series: TimeSeriesData[];
    investment_roi: InvestmentRoiData[];
    company_ranking: CompanyRankingData[];
    investment_validation: InvestmentValidationData[];
};

export type DashboardStatId = keyof DashboardData;

export type DashboardStat = {
    id: DashboardStatId;
    data: any; // Raw JSON from DB, to be transformed
};

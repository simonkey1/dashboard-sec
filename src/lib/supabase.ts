import { createClient } from '@supabase/supabase-js';
import type { DashboardStatId, MarketMapData, TimeSeriesData, InvestmentROIData, CompanyRankingData, InvestmentValidationData, DashboardStat } from './types';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase credentials missing. App may fail to fetch data.");
}

export const supabase = createClient(PUBLIC_SUPABASE_URL || '', PUBLIC_SUPABASE_ANON_KEY || '');

export type { DashboardStatId, MarketMapData, TimeSeriesData, InvestmentROIData, CompanyRankingData, InvestmentValidationData, DashboardStat };

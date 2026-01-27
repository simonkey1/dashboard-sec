import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import { transformDashboardStats } from '$lib/transformers';

export const load: PageLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    if (error) {
        console.error('Error fetching dashboard stats:', error);
    }

    const typedStats = transformDashboardStats(stats as any);

    return {
        stats: typedStats
    };
};

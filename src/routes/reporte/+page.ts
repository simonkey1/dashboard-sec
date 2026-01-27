import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    if (error) {
        return { stats: {} };
    }

    const statsMap = stats.reduce((acc, curr) => {
        acc[curr.id] = curr.data;
        return acc;
    }, {} as Record<string, any>);

    return {
        stats: statsMap
    };
};

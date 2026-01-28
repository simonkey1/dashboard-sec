import { supabase } from '$lib/supabase';
import type { PageLoad } from './$types';
import reportContentEs from '../../../docs/technical_chronicle.es.md?raw';
import reportContentEn from '../../../docs/technical_chronicle.en.md?raw';

export const load: PageLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    if (error) {
        return { stats: {}, reportContentEs, reportContentEn };
    }

    const statsMap = stats.reduce((acc, curr) => {
        acc[curr.id] = curr.data;
        return acc;
    }, {} as Record<string, any>);

    return {
        stats: statsMap,
        reportContentEs,
        reportContentEn
    };
};

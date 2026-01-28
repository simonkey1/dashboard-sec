import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';
import paperContentEs from '$lib/content/research_paper.md?raw';
import paperContentEn from '$lib/content/research_paper.en.md?raw';

export const load: PageServerLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    if (error) {
        console.error('Error fetching methodology stats:', error);
        return { stats: {}, paperContentEs, paperContentEn };
    }

    const statsMap = (stats || []).reduce((acc, curr) => {
        acc[curr.id] = curr.data;
        return acc;
    }, {} as Record<string, any>);

    return {
        stats: statsMap,
        paperContentEs,
        paperContentEn
    };
};

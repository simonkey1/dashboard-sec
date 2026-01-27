import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';
import paperContent from '$lib/content/research_paper.md?raw';

export const load: PageServerLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    if (error) {
        console.error('Error fetching methodology stats:', error);
        return { stats: {}, paperContent };
    }

    const statsMap = (stats || []).reduce((acc, curr) => {
        acc[curr.id] = curr.data;
        return acc;
    }, {} as Record<string, any>);

    return {
        stats: statsMap,
        paperContent
    };
};

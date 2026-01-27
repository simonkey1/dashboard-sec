import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';
import fs from 'fs';
import path from 'path';

export const load: PageServerLoad = async () => {
    const { data: stats, error } = await supabase
        .from('dashboard_stats')
        .select('*');

    const paperPath = path.resolve('research_paper.md');
    let paperContent = '';
    try {
        paperContent = fs.readFileSync(paperPath, 'utf-8');
    } catch (e) {
        console.error("Could not read research_paper.md", e);
    }

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

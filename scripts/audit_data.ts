import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qfzalspiarxmizifdiqo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmemFsc3BpYXJ4bWl6aWZkaXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTA0MTQsImV4cCI6MjA4NDY2NjQxNH0.oUYljL01aYJoszhtAF4XV0NWf402A4cGSHqIhpbKKRI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function audit() {
    const { data, error } = await supabase.from('dashboard_stats').select('*');
    if (error) {
        console.error(error);
        return;
    }

    data.forEach(stat => {
        console.log(`\n--- ID: ${stat.id} ---`);
        const sample = Array.isArray(stat.data) ? stat.data[0] : stat.data;
        console.log('Sample:', JSON.stringify(sample, null, 2));
    });
}

audit();

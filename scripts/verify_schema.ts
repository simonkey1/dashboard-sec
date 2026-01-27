import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log("Environment variables loaded.");
const envKeys = Object.keys(process.env).filter(k => k.includes('SUPABASE'));
console.log("Available Supabase keys:", envKeys);

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Could not find Supabase credentials in .env');
    console.error('Checked: VITE_, PUBLIC_, and bare SUPABASE_ prefixes.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySchema() {
    console.log('🔍 Verifying Supabase Schema for "dashboard_stats"...');

    const requiredIds = [
        'market_map',
        'time_series',
        'investment_roi',
        'company_ranking',
        'investment_validation'
    ];

    const { data, error } = await supabase
        .from('dashboard_stats')
        .select('id, data');

    if (error) {
        console.error('❌ Error fetching data:', error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.warn('⚠️ Table "dashboard_stats" is empty or does not exist.');
        return;
    }

    console.log(`✅ Found ${data.length} records.`);

    const foundIds = data.map(r => r.id);
    const missingIds = requiredIds.filter(id => !foundIds.includes(id));

    if (missingIds.length > 0) {
        console.warn(`⚠️ Missing expected IDs: ${missingIds.join(', ')}`);
    } else {
        console.log('✅ All expected IDs found.');
    }

    console.log('\n--- Data Structure Sample ---');

    data.forEach(row => {
        console.log(`\n🆔 ID: ${row.id}`);
        const isArray = Array.isArray(row.data);
        console.log(`   Type: ${isArray ? 'Array' : 'Object'}`);
        if (isArray) {
            console.log(`   Length: ${row.data.length}`);
            if (row.data.length > 0) {
                console.log('   Sample Item:');
                console.log(JSON.stringify(row.data[0], null, 2));
            }
        } else {
            console.log('   Content:');
            console.log(JSON.stringify(row.data, null, 2));
        }
    });

    console.log('\n✅ Verification Complete.');
}

verifySchema();

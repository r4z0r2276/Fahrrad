import { supabase } from './src/lib/supabaseClient.js';

async function checkSchema() {
    const { data, error } = await supabase.from('finances').select('*').limit(1);
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Finance row sample:", data[0]);
    }
}

checkSchema();

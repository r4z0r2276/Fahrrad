import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  console.log("Testing Supabase connection...");
  let { data, error } = await sb.from('settings').select('*');
  console.log("Settings table contents:", data);
  console.log("Error:", error);
  
  if (!error) {
    let res = await sb.from('settings').upsert({ id: 'shop', status: 'Testmodus' });
    console.log("Upsert result:", res.error || "Success");
    
    let { data: d2 } = await sb.from('settings').select('*');
    console.log("After upsert:", d2);
  }
}
test();

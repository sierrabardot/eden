import { createClient } from '@supabase/supabase-js';

const dbUrl = import.meta.env.VITE_APP_URL;
const dbKey = import.meta.env.VITE_APP_ANON_KEY;
// const dbUrl = Deno.env.get(SUPABASE_URL);
// const dbKey = Deno.env.get(SUPABASE_ANON_KEY);
const db = createClient(dbUrl, dbKey);

export default db;

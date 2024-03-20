import { createClient } from '@supabase/supabase-js';

const dbUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const dbKey = import.meta.env.VITE_APP_SUPABASE_KEY;
const db = createClient(dbUrl, dbKey);

export default db;

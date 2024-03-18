import { createClient } from '@supabase/supabase-js';

const dbUrl = import.meta.env.VITE_APP_URL;
const dbKey = import.meta.env.VITE_APP_ANON_KEY;
const db = createClient(dbUrl, dbKey);

export default db;

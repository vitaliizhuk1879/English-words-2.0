import { requireAuth } from './auth.js';
import { initAdmin } from './admin.js';
import { supabaseClient } from './supabase.js';


await requireAuth();


const { data } = await supabaseClient.auth.getSession();

await initAdmin();

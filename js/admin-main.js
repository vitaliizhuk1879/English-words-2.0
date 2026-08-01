import { requireAuth } from './auth.js';
import { initAdmin } from './admin.js';


await requireAuth();

import { supabaseClient } from './supabase.js';

const { data } = await supabaseClient.auth.getSession();

await initAdmin();

import { supabaseClient } from './supabase.js';


export async function requireAuth() {

    const { data } = await supabaseClient.auth.getSession();


    if (!data.session) {
        window.location.href = './login.html';
    }

}
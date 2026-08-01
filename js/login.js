import { supabaseClient } from './supabase.js';


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login_btn');


loginBtn.addEventListener('click', async () => {

    const email = emailInput.value;
    const password = passwordInput.value;


    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });


    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }


    window.location.href = './admin.html';

});
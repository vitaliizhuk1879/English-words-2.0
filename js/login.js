import { supabaseClient } from './supabase.js';

const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const loginForm = document.querySelector('.login_form');

async function handleLogin(event) {

    event.preventDefault();

    const email = emailElement.value.trim();
    const password = passwordElement.value;

    if (!email || !password) {
        alert('Fill in all fields.');
        return;
    }

    try {

        const { error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            return;
        }

        window.location.href = './admin.html';

    } catch (error) {

        console.error(error);
        alert('Something went wrong. Please try again.');

    }

}

loginForm.addEventListener('submit', handleLogin);
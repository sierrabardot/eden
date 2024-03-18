import supabase from '../config/supabaseClient';

export async function logout() {
    await supabase.auth.signOut();
}

export async function getUser() {
    const data = await getSession();
    const token = data.session.access_token;
    if (isTokenValid(token)) {
        console.log(token);
    }
    return await supabase.auth.getUser();
}

export async function login(loginData) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginData.email,
            password: loginData.password,
        });
        const user = await getUser();
        return user;
    } catch (error) {
        console.error(error.message);
        throw new Error('Log in failed. Please try again.');
    }
}

async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);
    return data;
}

export function isTokenValid(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return false;
    }
    return true;
}

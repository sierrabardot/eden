import supabase from '../config/supabase';

export async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem('token');
}

export async function getUser() {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        return user;
    } catch (error) {
        console.error(error);
    }
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

export async function signUp(userData) {
    try {
        const { data } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
                data: {
                    username: userData.username,
                },
            },
        });
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error('An error occurred with the sign up.');
    }
}

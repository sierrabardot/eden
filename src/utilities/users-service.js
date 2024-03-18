import db from '../config/dbClient';

export async function logout() {
    await db.auth.signOut();
    localStorage.removeItem('token');
}

export async function getUser() {
    const {
        data: { user },
    } = await db.auth.getUser();
    return user;
}

export async function login(loginData) {
    try {
        const { data, error } = await db.auth.signInWithPassword({
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
        const { data } = await db.auth.signUp({
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

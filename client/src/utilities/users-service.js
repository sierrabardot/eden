import { createUser, login as loginAPI } from './users-api';

export async function signUp(userData) {
    const token = await createUser(userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(loginData) {
    const token = await loginAPI(loginData);
    localStorage.setItem('token', token);
    return getUser();
}

export function logout() {
    localStorage.removeItem('token');
}

export function getToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired - remove it from localStorage
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
}

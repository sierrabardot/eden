import { createUser, login as loginAPI } from './users-api';
import { LoginData, UserData, User } from '../types/userTypes';

export async function signUp(userData: UserData): Promise<User | null> {
    console.log('inside users-service: ', userData);
    const token: string = await createUser(userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(loginData: LoginData): Promise<User | null> {
    const token: any = await loginAPI(loginData);
    localStorage.setItem('token', token);
    return getUser();
}

export function logout(): void {
    localStorage.removeItem('token');
}

export function getToken(): string | null {
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

export function getUser(): User | null {
    const token: string | null = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
}

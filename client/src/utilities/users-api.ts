import { UserData, LoginData } from '../types/userTypes';
import sendRequest from './send-request';

const BASE_URL = '/api/users';

export async function createUser(userData: UserData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(loginData: LoginData): Promise<string | null> {
    return sendRequest(`${BASE_URL}/login`, 'POST', loginData);
}

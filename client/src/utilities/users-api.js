import sendRequest from './send-request';

const BASE_URL = '/api/users';

export async function createUser(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(loginData) {
    return sendRequest(`${BASE_URL}/login`, 'POST', loginData);
}

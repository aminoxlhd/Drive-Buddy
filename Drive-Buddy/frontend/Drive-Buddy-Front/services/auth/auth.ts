import { LoginData, ResponseData } from './auth.interface';

const BASE_URL = 'http://localhost:5000/login';

export const loginUser = async (data: LoginData): Promise<ResponseData> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Login failed: ' + errorData.message);
    }

    return response.json();
};
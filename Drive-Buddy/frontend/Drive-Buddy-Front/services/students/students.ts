import { StudentSignupData, ResponseData } from './Student';

const BASE_URL = 'http://localhost:5000/student';

export const createStudent = async (data: StudentSignupData): Promise<ResponseData> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Signup failed: ' + errorData.message);
    }

    return response.json();
};
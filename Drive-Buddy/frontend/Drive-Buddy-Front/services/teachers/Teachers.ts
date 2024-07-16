import { TeacherSignupData, ResponseData } from './teacher';

const BASE_URL = 'http://localhost:5000/teacher';

export const signupTeacher = async (data: TeacherSignupData): Promise<ResponseData> => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        const value = data[key as keyof TeacherSignupData];
        if (key === 'driverLicense' && value) {
            formData.append(key, value);
        } else {
            formData.append(key, value as string);
        }
    });

    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Signup failed: ' + errorData.message);
    }

    return response.json();
};
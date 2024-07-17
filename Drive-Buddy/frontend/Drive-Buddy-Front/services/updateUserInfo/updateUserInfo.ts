// services/updateUserInfo/updateUserInfo.ts

import { UpdateUserData, User } from './updateUserInfo.interface';

const BASE_URL = 'http://localhost:5000';

export const updateUserInfo = async (userId: string, data: UpdateUserData): Promise<User> => {
    const formData = new FormData();

    if (data.firstName) formData.append('firstName', data.firstName);
    if (data.lastName) formData.append('lastName', data.lastName);
    if (data.email) formData.append('email', data.email);
    if (data.avatarUrl) formData.append('avatarUrl', data.avatarUrl);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PUT',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Update failed: ' + errorData.message);
    }

    return response.json();
};
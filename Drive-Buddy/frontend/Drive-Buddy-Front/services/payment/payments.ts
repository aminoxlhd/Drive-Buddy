// services/payment/payments.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Adjust according to your API URL

export const initiatePayment = async (paymentData: IPayment): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/payments/initiate`, paymentData);
        if (response.status === 200) {
            return true; // Payment initiated successfully
        }
        return false; // Handle other response statuses as needed
    } catch (error) {
        console.error('Error initiating payment:', error);
        return false;
    }
};

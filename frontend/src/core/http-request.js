import axios from 'axios';
import { API_URL } from './globals';
import * as localStorageService from './localStorageService';
const getToken = () => localStorageService.getItem('token');
console.log(API_URL);
const axiosClient = axios.create({
    baseURL: API_URL,
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json, text/plain, */*',
    },
});
const unauthenticatedAction = () => console.log('Not authorized');
export function request(requestConfig) {
    requestConfig.headers = requestConfig.headers || {};
    const token = getToken();
    if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosClient.request(requestConfig)
        .then((response) => response)
        .catch((errorResponse) => {
        const { response } = errorResponse;
        if (!response || !response.status) {
            console.log('Hard network error', errorResponse);
            return Promise.reject({ status: 500, data: { message: 'An error occurred!' } });
        }
        if (response.status === 401) {
            console.log('Unauthenticated request - login and comeback - status is ', response.status);
            unauthenticatedAction();
        }
        else if (response.status === 403) {
            console.log('Unauthorized request - Not enough privileges ', response.status);
            // unauthorizeddAction()
        }
        if (!response.data.message) {
            console.log('Injecting default error');
            if (typeof response.data === 'string') {
                response.data = {};
            }
            response.data.message = 'An error occurred!!';
        }
        return Promise.reject(response);
    });
}
//# sourceMappingURL=http-request.js.map
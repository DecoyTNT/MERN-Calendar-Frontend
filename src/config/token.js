import { clientAxios } from './axios';

export const tokenAuth = token => {
    if (token) {
        clientAxios.defaults.headers.common['x-token'] = token;
    } else {
        delete clientAxios.defaults.headers.common['x-token'];
    }
}
import { types } from './../types/types';
import { clientAxios } from './../config/axios';
import Swal from 'sweetalert2';
import { tokenAuth } from './../config/token';

export const startLogin = (email, password) => {
    return async dispatch => {
        try {
            const resp = await clientAxios.post('/auth', { email, password });
            if (resp.data.ok) {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                const { user } = resp.data;
                dispatch(login(user));
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            );
        }
    }
}

export const startRegister = (name, email, password) => {
    return async dispatch => {
        try {
            const resp = await clientAxios.post('/auth/new', { name, email, password });
            if (resp.data.ok) {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                const { user } = resp.data;
                dispatch(login(user));
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            );
        }
    }
}

export const startChecking = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return dispatch(checkingFinish());
            }
            tokenAuth(token);
            const resp = await clientAxios.get('/auth/renew');
            if (resp.data.ok) {
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                const { user } = resp.data;
                dispatch(login(user));
            }

        } catch (error) {
            dispatch(checkingFinish());
            localStorage.clear();
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = user => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({
    type: types.authLogout
});
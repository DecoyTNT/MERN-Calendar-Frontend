import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';
import MockAdapter from 'axios-mock-adapter';
import { startLogin, startRegister, startChecking, startLogout } from './../../actions/auth';
import { types } from './../../types/types';
import { clientAxios } from '../../config/axios';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

const setItemToken = Storage.prototype.setItem;
Storage.prototype.setItem = jest.fn();

let token = '';

describe('Pruebas en el action de auth', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {
        await store.dispatch(startLogin('test@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];
        // console.log(localStorage.setItem.mock.calls[0][1]);
    });

    test('startLogin incorrecto', async () => {
        await store.dispatch(startLogin('test@test.com', '12345674984765'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Los datos son incorrectos', 'error');

        await store.dispatch(startLogin('test4985@test.com', '123456'));
        actions = store.getActions();

        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Los datos son incorrectos', 'error');
    });

    test('startRegister correcto', async () => {

        const axiosMock = new MockAdapter(clientAxios);
        // console.log(axiosMock);

        const newUser = {
            name: 'Test2',
            email: 'test2@test.com',
            password: '123456'
        }

        axiosMock.onPost('/auth/new', newUser).reply(201, {
            ok: true,
            user: {
                id: '123',
                name: 'Test2',
                email: 'test2@test.com'
            },
            token: 'abc123abc123'
        });

        await store.dispatch(startRegister('Test2', 'test2@test.com', '123456'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                id: '123',
                name: 'Test2',
                email: 'test2@test.com'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123abc123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startChecking correcto', async () => {

        Storage.prototype.setItem = setItemToken;
        localStorage.setItem('token', token);
        Storage.prototype.setItem = jest.fn();
        const axiosMock = new MockAdapter(clientAxios);

        axiosMock.onGet('/auth/renew').reply(200, {
            ok: true,
            user: {
                id: '123',
                name: 'Test2',
                email: 'test2@test.com'
            },
            token: 'abc123abc123'
        });

        await store.dispatch(startChecking());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                id: '123',
                name: 'Test2',
                email: 'test2@test.com'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123abc123');
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startLogout correcto', () => {
        Storage.prototype.clear = jest.fn();
        store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogout
        });

        expect(localStorage.clear).toHaveBeenCalled();
    });

});
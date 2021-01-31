import { authReducer } from './../../reducers/authReducer';
import { types } from './../../types/types';

const initialState = {
    checking: true,
    uid: null,
    name: null
}

describe('Pruebas en authReducer', () => {

    test('Debe retornar el state por defecto', () => {
        const action = {};
        const state = authReducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    test('Debe funcionar correctamente el authLogin', () => {
        const user = {
            id: '123',
            name: 'Test'
        }
        const action = {
            type: types.authLogin,
            payload: user
        }
        const state = authReducer(initialState, action);

        expect(state).toEqual({
            checking: false,
            uid: '123',
            name: 'Test'
        });
    });

    test('Debe de poner el cheking en false', () => {
        const action = {
            type: types.authCheckingFinish
        }
        const state = authReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            checking: false
        });
    });

    test('authLogout debe funcionar correctamente', () => {
        const user = {
            id: '123',
            name: 'Test'
        }
        const action = {
            type: types.authLogin,
            payload: user
        }
        const state = authReducer(initialState, action);

        const newAction = {
            type: types.authLogout
        }
        const newState = authReducer(state, newAction);

        expect(newState).toEqual({
            ...state,
            checking: false,
            uid: null,
            name: null
        });
    })


});

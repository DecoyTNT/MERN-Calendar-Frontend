import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import RegisterScreen from './../../../components/auth/RegisterScreen';
import { startRegister } from './../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startRegister: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Router>
            <RegisterScreen />
        </Router>
    </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('No hay registro si las contraseñas no son iguales', async () => {
        wrapper.find('input[name="name"]').simulate('change', {
            target: {
                name: 'name',
                value: 'TEST'
            }
        });

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'test@test.com'
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: '123456'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target: {
                name: 'password2',
                value: '1234567'
            }
        });

        await act(async () => {
            wrapper.find('form').prop('onSubmit')();
            await new Promise(resolve => setTimeout(resolve));
            wrapper.update();
        });
        expect(startRegister).not.toHaveBeenCalled();
        expect(wrapper.find('p').text()).toBe('Los passwords deben ser iguales');

    });

    test('Debe de hacer el registro', async () => {
        wrapper.find('input[name="name"]').simulate('change', {
            target: {
                name: 'name',
                value: 'TEST'
            }
        });

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'test@test.com'
            }
        });

        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: '123456'
            }
        });

        wrapper.find('input[name="password2"]').simulate('change', {
            target: {
                name: 'password2',
                value: '123456'
            }
        });

        await act(async () => {
            wrapper.find('form').prop('onSubmit')();
        });

        expect(startRegister).toHaveBeenCalled();
        expect(startRegister).toHaveBeenCalledWith('TEST', 'test@test.com', '123456');
    });

});
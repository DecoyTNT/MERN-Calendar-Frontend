import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import LoginScreen from './../../../components/auth/LoginScreen';
import { startLogin, startChecking } from './../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startChecking: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <Router>
            <LoginScreen />
        </Router>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el dispatch del login', async () => {
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

        await act(async () => {
            wrapper.find('form').prop('onSubmit')();
        });

        expect(startLogin).toHaveBeenCalledWith('test@test.com', '123456');
        expect(startChecking).toHaveBeenCalled();
    });
})

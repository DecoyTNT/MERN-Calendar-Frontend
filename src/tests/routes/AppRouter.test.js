import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import AppRouter from './../../routes/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();


describe('Pruebas en <AppRouter />', () => {

    test('Debe de mostrar el Cargando...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <div>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </div>
        );

        expect(wrapper.find('h5').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta pública', () => {

        const initState = {
            auth: {
                checking: false
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <div>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </div>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);
    });

    test('Debe de mostrar la ruta privada', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'Test'
            },
            calendar: {
                events: []
            },
            ui: {
                eventsUser: true
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <div>
                <Provider store={store}>
                    <AppRouter />
                </Provider>
            </div>
        );

        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);
    });

});

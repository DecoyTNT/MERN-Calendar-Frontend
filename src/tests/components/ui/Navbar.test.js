import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Navbar from './../../../components/ui/Navbar';
import { uiEventsUser } from './../../../actions/ui';
import { eventClearActiveEvent, eventCleanAll } from './../../../actions/events';
import { startLogout } from './../../../actions/auth';

jest.mock('../../../actions/events', () => ({
    eventClearActiveEvent: jest.fn(),
    eventCleanAll: jest.fn()
}));

jest.mock('../../../actions/ui', () => ({
    uiEventsUser: jest.fn()
}));

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        name: 'Test'
    },
    ui: {
        eventsUser: true
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <div>
        <Provider store={store}>
            <Navbar />
        </Provider>
    </div>
);
describe('Pruebas en <Navbar />', () => {

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();

        const span = wrapper.find('.navbar-brand').text();
        expect(span).toEqual(initState.auth.name);

        const textButtonSpan = wrapper.find('.span-eventsuser').text();
        expect(textButtonSpan).toEqual('Ver todos los eventos');

    });

    test('Debe de llamar el uiEventsUser y eventClearActiveEvent cuando se da click en el primer botón', () => {
        const button = wrapper.find('.btn-outline-info');
        button.prop('onClick')();

        expect(uiEventsUser).toHaveBeenCalled();
        expect(eventClearActiveEvent).toHaveBeenCalled();
    });

    test('Debe de llamar el eventCleanAll y startLogout cuando se da click en el segundo botón', () => {
        const button = wrapper.find('.btn-outline-danger');
        button.prop('onClick')();

        expect(eventCleanAll).toHaveBeenCalled();
        expect(startLogout).toHaveBeenCalled();
    });

});

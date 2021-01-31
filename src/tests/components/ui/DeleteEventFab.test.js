import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import DeleteEventFab from './../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <div>
        <Provider store={store}>
            <DeleteEventFab />
        </Provider>
    </div>
);

describe('Pruebas en <DeleteEventFab />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('Debe de llamar el eventStartDelete al hacer click', () => {
        wrapper.find('button').prop('onClick')();

        expect(eventStartDelete).toHaveBeenCalled();
    });

});

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import AddNewFab from './../../../components/ui/AddNewFab';
import { eventClearActiveEvent } from './../../../actions/events';
import { uiOpenModal } from './../../../actions/ui';

jest.mock('../../../actions/events', () => ({
    eventClearActiveEvent: jest.fn()
}));

jest.mock('../../../actions/ui', () => ({
    uiOpenModal: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <div>
        <Provider store={store}>
            <AddNewFab />
        </Provider>
    </div>
);

describe('Pruebas en <AddNewFab />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar el eventClearActiveEvent y el uiOpenModal al hacer click', () => {
        const button = wrapper.find('button');
        button.prop('onClick')();

        expect(eventClearActiveEvent).toHaveBeenCalled();
        expect(uiOpenModal).toHaveBeenCalled();
    });
});
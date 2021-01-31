import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import CalendarScreen from './../../../components/calendar/CalendarScreen';
import { eventSetActive } from '../../../actions/events';
import { messages } from './../../../helpers/calendar-messages-es';
import { types } from './../../../types/types';

jest.mock('../../../actions/events', () => ({
    eventsUserStartLoading: jest.fn(),
    eventsStartLoading: jest.fn(),
    eventSetActive: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventSetStartEnd: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123'
    },
    calendar: {
        events: [],
        activeEvent: null
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
            <CalendarScreen />
        </Provider>
    </div>
);

describe('Pruebas en <CalendarScreen />', () => {

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Pruebas con las interacciones del calendario', () => {
        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')();
        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 789651 });
        expect(eventSetActive).toHaveBeenCalledWith({ start: 789651 });

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
        });

        calendar.prop('onSelectSlot')({
            action: 'doubleClick'
        });
        expect(eventSetActive).toHaveBeenCalled();

    });

})

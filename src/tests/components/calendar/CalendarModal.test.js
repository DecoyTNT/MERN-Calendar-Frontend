import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import moment from 'moment';
import Swal from 'sweetalert2';
import CalendarModal from './../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent } from '../../../actions/events';
import { uiCloseModal } from '../../../actions/ui';
import { eventStartAddNew } from './../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('../../../actions/ui', () => ({
    uiCloseModal: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const initState = {
    ui: {
        modalOpen: true
    },
    calendar: {
        activeEvent: {
            title: 'Esto es un título de prueba',
            notes: 'Esto es una nota',
            start: now.toDate(),
            end: now.add(1, 'hours').toDate()
        },
        startEvent: null
    }
};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <div>
        <Provider store={store}>
            <CalendarModal />
        </Provider>
    </div>
);

describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrar el modal', () => {
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
    });

    test('Debe de llamar la acción de actualizar y cerrar modal', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalled();
        expect(uiCloseModal).toHaveBeenCalled();
    });

    test('Debe de mostrar error si falta el título', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    });

    test('Debe de crear un nuevo evento', () => {
        const initState = {
            ui: {
                modalOpen: true
            },
            calendar: {
                activeEvent: null,
                startEvent: null
            }
        };
        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <div>
                <Provider store={store}>
                    <CalendarModal />
                </Provider>
            </div>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Título de prueba'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            start: expect.anything(),
            end: expect.anything(),
            notes: '',
            title: 'Título de prueba'
        });
        expect(eventClearActiveEvent).toHaveBeenCalled();
        expect(uiCloseModal).toHaveBeenCalled();

    });

    test('Debe de validar las fechas', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Título de prueba'
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha fin debe ser mayor a la fecha de inicio", "error");
    });

});

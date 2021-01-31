import { calendarReducer } from './../../reducers/calendarReducer';
import { types } from './../../types/types';

const initialState = {
    events: [],
    activeEvent: null,
    startEvent: null,
}

let state = {};

describe('Pruebas en calendarReducer', () => {

    test('Debe de retornar el state por defecto', () => {
        const action = {};
        const state = calendarReducer(initialState, action);
        expect(state).toEqual(initialState);
    });

    test('Debe funcionar correctamente el eventAddNew', () => {
        const action = {
            type: types.eventAddNew,
            payload: {
                id: '123',
                title: 'Esto es una prueba',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        }
        state = calendarReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            events: [
                ...initialState.events,
                action.payload
            ]
        });
    });

    test('Debe funcionar correctamente el eventSetActive', () => {
        const action = {
            type: types.eventSetActive,
            payload: {
                id: '123',
                title: 'Esto es una prueba',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            activeEvent: action.payload
        });
    });

    test('Debe funcionar correctamente el eventClearActiveEvent', () => {
        const action = {
            type: types.eventClearActiveEvent
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            activeEvent: null,
            startEvent: null
        });
    });

    test('Debe funcionar correctamente el eventUpdated', () => {
        const action = {
            type: types.eventUpdated,
            payload: {
                id: '123',
                title: 'La prueba se actualizo',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            events: [{
                id: '123',
                title: 'La prueba se actualizo',
                notes: '',
                start: 87951231,
                end: 97451285
            }]
        });
    });

    test('Debe funcionar correctamente el eventDeleted', () => {
        const actionEventActive = {
            type: types.eventSetActive,
            payload: {
                id: '123',
                title: 'Esto es una prueba',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        }
        state = calendarReducer(state, actionEventActive);
        const action = {
            type: types.eventDeleted
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            events: [],
            activeEvent: null
        });
    });

    test('Debe funcionar correctamente el eventSetStartEnd', () => {
        const action = {
            type: types.eventSetStartEnd,
            payload: {
                title: 'Esto es una prueba',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            startEvent: {
                title: '',
                notes: '',
                start: 87951231,
                end: 97451285
            }
        });
    });

    test('Debe funcionar correctamente el eventsLoaded', () => {
        const action = {
            type: types.eventsLoaded,
            payload: []
        }
        state = calendarReducer(state, action);
        expect(state).toEqual({
            ...state,
            events: []
        });
    });

    test('Debe funcionar correctamente el eventCleanAll', () => {
        const action = {
            type: types.eventCleanAll
        }
        state = calendarReducer(state, action);
        expect(state).toEqual(initialState);
    });

});
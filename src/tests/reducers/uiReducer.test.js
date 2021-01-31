import { uiReducer } from './../../reducers/uiReducer';
import { uiCloseModal, uiOpenModal, uiEventsUser } from './../../actions/ui';

const initialState = {
    modalOpen: false,
    eventsUser: true
}

describe('Pruebas en uiReducer', () => {

    test('Debe de retornar el state por defecto', () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('Debe de abrir y cerrar el modal', () => {
        const openModal = uiOpenModal();
        const stateOpen = uiReducer(initialState, openModal);
        expect(stateOpen).toEqual({
            modalOpen: true,
            eventsUser: expect.any(Boolean)
        });

        const closeModal = uiCloseModal();
        const stateClose = uiReducer(initialState, closeModal);
        expect(stateClose).toEqual({
            modalOpen: false,
            eventsUser: expect.any(Boolean)
        });
    });

    test('Debe cambiar el eventsUser', () => {
        const eventsUser = uiEventsUser();
        const state = uiReducer(initialState, eventsUser);
        expect(state).toEqual({
            modalOpen: expect.any(Boolean),
            eventsUser: !eventsUser
        });
    });
});
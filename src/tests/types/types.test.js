import { types } from './../../types/types';

describe('Pruebas en Types', () => {
    test('Los types deben ser iguales', () => {
        expect(types).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
            uiEventsUser: '[ui] Change events user',

            eventSetActive: '[event] Set active',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Updated event',
            eventDeleted: '[event] Deleted event',
            eventSetStartEnd: '[event] Set start and end event',
            eventCleanAll: '[event] Clear all',
            eventsLoaded: '[event] Events loaded',

            authCheckingFinish: '[auth] Finish checking login state',
            authLogin: '[auth] Login',
            authLogout: '[auth] Logout',
        });
    });
});
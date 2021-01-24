import { types } from './../types/types';
import { clientAxios } from './../config/axios';
import { prepareEvents } from './../helpers/prepareEvents';
import { tokenAuth } from './../config/token';
import Swal from 'sweetalert2';

export const eventStartAddNew = event => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await clientAxios.post('/events', event);
            if (resp.data.ok) {
                event.id = resp.data.event.id;
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(eventAddNew(event));
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            );
        }
    }
}

const eventAddNew = event => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = event => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    return async dispatch => {
        try {
            const resp = await clientAxios.put(`/events/${event.id}`, event);
            if (resp.data.ok) {
                dispatch(eventUpdated(event));
            }
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            );
        }
    }
}

const eventUpdated = event => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {

        const { activeEvent } = getState().calendar;

        try {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Ya no se podra recuperar una vez eliminado",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resp = await clientAxios.delete(`/events/${activeEvent.id}`);
                    if (resp.data.ok) {
                        dispatch(eventDeleted());
                    }
                    Swal.fire(
                        'Eliminado!',
                        'El evento fue eliminado.',
                        'success'
                    )
                }
            })
        } catch (error) {
            Swal.fire(
                'Error',
                error.response.data.msg,
                'error'
            );
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetStartEnd = event => ({
    type: types.eventSetStartEnd,
    payload: event
});

export const eventsStartLoading = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token');
            tokenAuth(token);
            const resp = await clientAxios.get('/events');
            if (resp.data.ok) {
                const events = prepareEvents(resp.data.events);
                dispatch(eventsLoaded(events));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventsUserStartLoading = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token');
            tokenAuth(token);
            const resp = await clientAxios.get('/events/user');
            if (resp.data.ok) {
                const events = prepareEvents(resp.data.events);
                dispatch(eventsLoaded(events));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const eventsLoaded = events => ({
    type: types.eventsLoaded,
    payload: events
});

export const eventCleanAll = () => ({
    type: types.eventCleanAll
});
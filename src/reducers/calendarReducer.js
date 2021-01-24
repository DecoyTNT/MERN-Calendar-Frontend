import { types } from './../types/types';

const initialState = {
    events: [],
    activeEvent: null,
    startEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
                startEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(e => e.id === action.payload.id ? action.payload : e)
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(e => e.id !== state.activeEvent.id),
                activeEvent: null
            }

        case types.eventSetStartEnd:
            return {
                ...state,
                startEvent: {
                    title: '',
                    notes: '',
                    start: action.payload.start,
                    end: action.payload.end
                }
            }

        case types.eventsLoaded:
            return {
                ...state,
                events: action.payload
            }

        case types.eventCleanAll:
            return {
                ...initialState
            }

        default:
            return state;
    }
}
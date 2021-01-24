import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    eventsUser: true
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiEventsUser:
            return {
                ...state,
                eventsUser: !state.eventsUser
            }

        default:
            return state;
    }
}
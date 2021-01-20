import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventClearActiveEvent } from './../../actions/events';

const AddNewFab = () => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(eventClearActiveEvent());
        dispatch(uiOpenModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={openModal}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}

export default AddNewFab

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { uiEventsUser } from './../../actions/ui';
import { eventClearActiveEvent, eventCleanAll } from './../../actions/events';

const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth);
    const { eventsUser } = useSelector(state => state.ui)

    const handleChange = () => {
        dispatch(uiEventsUser());
        dispatch(eventClearActiveEvent());
    }

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(eventCleanAll());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <button
                className="btn btn-outline-info"
                onClick={handleChange}
            >
                <span>{eventsUser ? 'Ver todos los eventos' : 'Ver tus eventos'}</span>
            </button>

            <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}

export default Navbar

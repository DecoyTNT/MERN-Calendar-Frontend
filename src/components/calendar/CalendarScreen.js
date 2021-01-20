import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../ui/Navbar';
import { messages } from '../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from './../../actions/ui';
import { eventSetActive, eventSetStartEnd } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from './../ui/DeleteEventFab';
import { eventClearActiveEvent } from './../../actions/events';

moment.locale('es-mx');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer 

const CalendarScreen = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClickEvent = e => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = e => {
        dispatch(eventSetActive(e));
    }

    const onSelectSlot = e => {
        dispatch(eventClearActiveEvent());
        console.log(e);
        if (e.action === 'doubleClick' || e.action === 'select') {
            dispatch(eventSetStartEnd(e))
            dispatch(uiOpenModal());
        }
    }

    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                view={lastView}
                onView={onViewChange}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onDoubleClickEvent={onDoubleClickEvent}
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />

            <AddNewFab />
            {activeEvent && <DeleteEventFab />}
        </div>
    )
}

export default CalendarScreen;

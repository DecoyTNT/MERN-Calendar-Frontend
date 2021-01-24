import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from './../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: now.add(1, 'hours').toDate()
}

const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent, startEvent } = useSelector(state => state.calendar);

    const [titleValid, setTitleValid] = useState(true);
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(now.add(1, 'hours').toDate());

    const [formValues, setFormValues] = useState(initEvent);

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
            setDateStart(activeEvent.start);
            setDateEnd(activeEvent.end);
        } else if (startEvent) {
            setFormValues(startEvent);
            setDateStart(startEvent.start);
            setDateEnd(startEvent.end);
        } else {
            setFormValues(initEvent);
            setDateStart(initEvent.start);
            setDateEnd(initEvent.end);
        }

    }, [activeEvent, setFormValues, setDateStart, setDateEnd, startEvent]);

    const { title, notes, start, end } = formValues;

    const handleInputchange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleStartDateChange = e => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = e => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const onSubmitForm = e => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                'Error',
                'La fecha fin debe ser mayor a la fecha de inicio',
                'error'
            );
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        // TODO: grabar en base de datos
        if (activeEvent) {
            dispatch(eventStartUpdate(formValues));
        } else {
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());
        setFormValues(initEvent);
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                    {/* <input className="form-control" placeholder="Fecha inicio" /> */}
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputchange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputchange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal

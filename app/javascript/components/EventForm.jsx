import React, {useState, useRef, useEffect, useCallback} from 'react';
import { Link, useParams } from "react-router-dom";
import Pikaday from 'pikaday'
import "pikaday/css/pikaday.css";

import { isEmptyObject, validateEvent, formatDate } from '../helpers/helpers';
import PropTypes from 'prop-types';
import EventNotFound from './EventNotFound';

const EventForm = ({ events, onSave }) => {
    const { id } = useParams();

    const initialEventState = useCallback(
        () => {
            const defaults = {
                event_type: '',
                event_date: '',
                title: '',
                speaker: '',
                host: '',
                published: false,
            };

            const currEvent = id ?
                events.find((e) => e.id === Number(id)) :
                {};

            return { ...defaults, ...currEvent }
        },
        [events, id]
    );

    const [event, setEvent] = useState(initialEventState);

    const [formErrors, setFormErrors] = useState({});

    const dateInput = useRef(null);

    const updateEvent = (key, value) => {
        setEvent((prevEvent) => ({ ...prevEvent, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateEvent(event);
    
        if (!isEmptyObject(errors)) {
          setFormErrors(errors);
        } else {
          console.log(event);
          onSave(event);
        }
      };

    const handleInputChange = (e) => {
        const { target } = e;
        const { name } = target;
        const value = target.type === "checkbox" ? target.checked : target.value;

        updateEvent(name, value);
    }

    const renderErrors = () => {
        if (isEmptyObject(formErrors)) {
            return null;
        }

        return (
            <div className='errors'>
                <h3>以下の理由でイベントを保存できませんでした。</h3>
                <ul>
                    {Object.values(formErrors).map((formError) => (
                        <li key={formError}>{ formError }</li>
                        ))}
                </ul>
            </div>
            );
    }

    useEffect(() => {
        const p = new Pikaday({
            field: dateInput.current,
            toString: date => formatDate(date),
            onSelect: (date) => {
                const formattedDate = formatDate(date);
                dateInput.current.value = formattedDate;
                updateEvent("event_date", formattedDate);
            }
        });

        //クリーンアップ用の関数を返す
        //Reactはアンマウントの前にこれを呼び出す
        return () => p.destroy();
    }, []);

    useEffect(() => {
        setEvent(initialEventState);
    }, [events, initialEventState]);

    const cancelURL = event.id ? `/events/${event.id}` : '/events';
    const title = event.id ? `${event.event_date} - ${event.event_type}` : '新規イベント';

    if (id && !event.id) {
        return <EventNotFound />;
    }

    return (
        <div>
            <h2>{ title }</h2>
            {renderErrors()}

            <form className="eventForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="event_type">
                        <strong>Type:</strong>
                        <input
                        type="text"
                        id="event_type"
                        name="event_type"
                        onChange={handleInputChange}
                        value={event.event_type}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="event_date">
                        <strong>Date:</strong>
                        <input
                        type="text"
                        id="event_date"
                        name="event_date"
                        ref={dateInput}
                        autoComplete='off'
                        value={event.event_date}
                        onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="title">
                        <strong>Title:</strong>
                        <textarea
                        cols="30"
                        rows="10"
                        id="title"
                        name="title"
                        onChange={handleInputChange}
                        value={event.title}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="speaker">
                        <strong>Speakers:</strong>
                        <input
                        type="text"
                        id="speaker"
                        name="speaker"
                        onChange={handleInputChange}
                        value={event.speaker}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="host">
                        <strong>Hosts:</strong>
                        <input
                        type="text"
                        id="host"
                        name="host"
                        onChange={handleInputChange}
                        value={event.host}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="published">
                        <strong>Publish:</strong>
                        <input
                        type="checkbox"
                        id="published"
                        name="published"
                        onChange={handleInputChange}
                        checked={event.published}
                        />
                    </label>
                </div>
                <div className="form-actions">
                    <button type="submit">保存</button>
                    <Link to={cancelURL}>キャンセル</Link>
                </div>
            </form>
        </div>
        );
}

export default EventForm;

EventForm.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          event_type: PropTypes.string.isRequired,
          event_date: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          speaker: PropTypes.string.isRequired,
          host: PropTypes.string.isRequired,
          published: PropTypes.bool.isRequired,
        })
      ),
      onSave: PropTypes.func.isRequired,
};

EventForm.defaultsProps = {
    events: [],
}

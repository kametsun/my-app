import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../NotFound';

const Event = ({ events, onDelete }) => {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <NotFound  model={"イベント"}/>;
  }

  return (
    <div className='eventContainer'>
      <h2>
        {event.event_date}
        {' - '}
        {event.event_type}
        <Link to={`/events/${event.id}/edit`}>編集</Link>
        <button
          className='delete'
          type='button'
          onClick={() => onDelete(event.id)}
        >
          削除
        </button>
      </h2>
      <ul>
        <li>
          <strong>Type:</strong> {event.event_type}
        </li>
        <li>
          <strong>Date:</strong> {event.event_date}
        </li>
        <li>
          <strong>Title:</strong> {event.title}
        </li>
        <li>
          <strong>Speaker:</strong> {event.speaker}
        </li>
        <li>
          <strong>Host:</strong> {event.host}
        </li>
        <li>
          <strong>Published:</strong> {event.published ? 'yes' : 'no'}
        </li>
      </ul>
    </div>
  );
};

Event.propTypes = {
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
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
  };

export default Event;
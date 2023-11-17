import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Note = ({ notes }) => {
    const { id } = useParams();
    const note = notes.find((e) => e.id === Number(id));

    return (
        <>
            <div className='noteContainer'>
                <h2>
                    { note.title }
                </h2>
                <p>{ note.body }</p>
            </div>
        </>
        );
};

Note.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    updated_at: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    })).isRequired,
};

export default Note;
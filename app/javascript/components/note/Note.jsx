import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const Note = ({ notes, onDelete }) => {
    const { id } = useParams();
    const note = notes.find((e) => e.id === Number(id));

    return (
        <>
            <div className='noteContainer'>
                <h2>
                    { note.title }
                    <button
                        className='delete'
                        type='button'
                        onClick={() => onDelete(note.id)}
                    >
                        削除
                    </button>
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
    })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Note;
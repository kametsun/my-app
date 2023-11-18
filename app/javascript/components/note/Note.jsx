import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import NotFound from '../NotFound';

const Note = ({ notes, onDelete }) => {
    const { id } = useParams();
    const note = notes.find((e) => e.id === Number(id));

    if (!note) {
        return <NotFound model={"ノート"}/>;
    }

    return (
        <div className='noteContainer'>
            <h2>
                { note.title }
                <Link to={`/notes/${note.id}/edit`}>編集</Link>
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
        );
};

Note.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Note;
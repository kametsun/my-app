import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NoteList = ({ notes }) => {
    const renderNotes = (noteArray) => {
        noteArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        return noteArray.map((note) => (
            <li key={note.id}>
                <Link to={`/notes/${note.id}`}>
                    { note.title }
                </Link>
            </li>
            ));
    };

    return (
        <section className='noteList'>
            <h2>Notes</h2>
            <ul>{ renderNotes(notes) }</ul>
        </section>
        );
};

NoteList.propTypes = {
notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    updated_at: PropTypes.string,
})).isRequired,
};

export default NoteList;
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const NoteList = ({ notes }) => {
    const renderNotes = (noteArray) => {
        noteArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        return noteArray.map((note) => (
            <li key={note.id}>
                <NavLink to={`/notes/${note.id}`}>
                    { note.title }
                </NavLink>
            </li>
            ));
    };

    return (
        <section className='noteList'>
            <h2>
                Notes
                <Link to={"/notes/new"}>
                    New Note
                </Link>
            </h2>
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
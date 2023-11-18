import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const NoteList = ({ notes }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const searchInput = useRef(null);

    const updateSearchTerm = () => {
        setSearchTerm(searchInput.current.value);
    };

    const matchSearchTerm = (obj) => {
      const { id, body, ...rest } = obj;
      return Object.values(rest).some(
            (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );  
    };

    const renderNotes = (noteArray) => {

        return noteArray
            .filter((el) => matchSearchTerm(el))
            .map((note) => (
                    <li key={`/notes/${note.id}`}>
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

            <input
                className='search'
                placeholder='検索'
                type='text'
                ref={searchInput}
                onKeyUp={updateSearchTerm}
            />

            <ul>{ renderNotes(notes) }</ul>
        </section>
        );
};

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
})).isRequired,
};

export default NoteList;
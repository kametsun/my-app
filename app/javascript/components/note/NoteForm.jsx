import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmptyObject, validateNote } from "./helpers/helpers";
import { useParams } from "react-router-dom";

const NoteForm = ({ onSave, notes }) => {
    const { id } = useParams();

    const initialNoteState = useCallback(
            () => {
                const defaults = {
                    title: "",
                    body: "",
                };

                const currNote = id ? notes.find((e) => e.id === Number(id)) : {};

                return { ...defaults, ...currNote };
            },
            [notes, id]
        );


    const [note, setNote] = useState(initialNoteState);

    const [formErrors, setFormErrors] = useState({});

    const updateNote = (key, value) => {
        setNote((prevNote) => ({ ...prevNote, [key]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateNote(note);

        if (!isEmptyObject(errors)) {
            setFormErrors(errors);
        } else {
            onSave(note);
            console.log(note);
        }
    };

    handleInputChange = (e) => {
        const { target } = e;
        const { name } = target;
        const value = target.value;

        updateNote(name, value);
    };

    const renderErrors = () => {
        if (isEmptyObject(formErrors)) {
            return null;
        }

        return (
            <div className="errors">
                <h3>以下のエラーにより、ノートは保存されませんでした。</h3>
                <ul>
                    {Object.values(formErrors).map((formError) => (
                        <li key={formError}>{ formError }</li>
                        ))}
                </ul>
            </div>
            );
    };

    useEffect(() => {
        setNote(initialNoteState);
    }, [notes, initialNoteState]);

    return (
        <div>
            <h2>New Note</h2>
            { renderErrors() }

            <form className="noteForm" onSubmit={handleSubmit}>
                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
                <div>
                    <label htmlFor="title">
                        <strong>Title:</strong>
                        <input 
                            type="text" 
                            id="title" 
                            name="title" 
                            onChange={handleInputChange} 
                            value={note.title}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="body">
                        <textarea 
                            cols={100} 
                            rows={100} 
                            id="body" 
                            name="body" 
                            onChange={handleInputChange} 
                            value={note.body}
                        />
                    </label>
                </div>
            </form>
        </div>
        );
};

export default NoteForm;

NoteForm.prototype = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        })
        ),
    onSave: PropTypes.func.isRequired,
};

NoteForm.defaultProps = {
    notes: [],
};
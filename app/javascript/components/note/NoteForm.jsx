import React, { useState } from "react";
import { isEmptyObject, validateNote } from "./helpers/helpers";

const NoteForm = () => {
    const [note, setNote] = useState({
        title: "",
        body: "",
    });

    const [formErrors, setFormErrors] = useState({});

    handleInputChange = (e) => {
        const { target } = e;
        const { name } = target;

        setNote({ ...note, [name]: value });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateNote(note);

        if (!isEmptyObject(errors)) {
            setFormErrors(errors);
        } else {
            console.log(note);
        }
    };

    return (
        <section>
            { renderErrors() }

            <h2>New Note</h2>
            <form className="noteForm" onSubmit={handleSubmit}>
                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
                <div>
                    <label htmlFor="title">
                        <strong>Title:</strong>
                        <input type="text" id="title" name="title" onChange={handleInputChange} />
                    </label>
                </div>
                <div>
                    <label htmlFor="body">
                        <textarea cols={100} rows={100} id="body" name="body" onChange={handleInputChange} />
                    </label>
                </div>
            </form>
        </section>
        );
};

export default NoteForm;
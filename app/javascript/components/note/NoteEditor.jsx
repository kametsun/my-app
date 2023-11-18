import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import NoteList from "./NoteList";
import Note from "./Note";
import NoteForm from "./NoteForm";
import "../App.css";


const NoteEditor = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await window.fetch("/api/notes");

                if (!response.ok) {
                    throw Error(response.statusText);
                }
                
                const data = await response.json();
                setNotes(data);

            } catch (error) {
                setIsError(true);
                console.log(error);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="grid">
                {isError && <p>Something went wrong. Check the conslole.</p>}

                {isLoading ? (
                    <p>Loading...</p>
                    ) : (
                        <>
                            <NoteList notes={notes} />

                            <Routes>
                                <Route path="new" element={<NoteForm />} />
                                <Route path=":id" element={<Note notes={notes} />} />
                            </Routes>
                        </>
                    )}
                </div>
        </>
        );
};

export default NoteEditor;
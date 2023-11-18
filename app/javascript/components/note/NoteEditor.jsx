import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "../Header";
import NoteList from "./NoteList";
import Note from "./Note";
import NoteForm from "./NoteForm";
import { success } from "../notice/notifications";
import "../App.css";
import { handleAjaxError } from "../helpers/helpers";


const NoteEditor = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
                handleAjaxError(error);
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const addNote = async ( newNote ) => {
        try {
            const response = await window.fetch("/api/notes", {
                method: "POST",
                body: JSON.stringify(newNote),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw Error(response.statusText);
            }

            const savedNote = await response.json();
            const newNotes = [ ...notes, savedNote];
            setNotes(newNotes);
            success("ノートを作成しました！")
            navigate(`/notes/${savedNote.id}`);
        } catch (error) {
            handleAjaxError(error);
        }
    };

    const deleteNote  = async (noteId) => {
        const sure = window.confirm("本当に削除しますか？");

        if (sure) {
            try {
                const response = await window.fetch(`/api/notes/${noteId}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw Error(response.statusText);
                }

                success("ノートが削除されました！");
                navigate("/notes");
                setNotes(notes.filter(note => note.id !== noteId));

            } catch (error) {
                handleAjaxError(error);
            }
        }
    };

    const updateNote = async ( updatedNote ) => {
        try {
            const response = await window.fetch(
                `/api/notes/${updatedNote.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(updatedNote),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                },
                );

                if (!response.ok) throw Error(response.statusText);

                const newNotes = notes;
                const idx = newNotes.findIndex((note) => note.id === updatedNote.id);
                newNotes[idx] = updatedNote;
                setNotes(newNotes);

                success("ノートの編集に成功しました!");
                navigate(`/notes/${updatedNote.id}`);
        } catch (error) {
            handleAjaxError(error);
        }
    };

    return (
        <>
            <Header />
            <div className="grid">
                {isLoading ? (
                    <p>Loading...</p>
                    ) : (
                        <>
                            <NoteList notes={notes} />

                            <Routes>
                                <Route 
                                    path="new"
                                    element={<NoteForm onSave={addNote} 
                                />}

                                />
                                <Route 
                                    path=":id" 
                                    element={<Note notes={notes} 
                                    onDelete={deleteNote} />} 
                                />
                                <Route 
                                    path=":id/edit"
                                    element={<NoteForm notes={notes} onSave={updateNote} />} 
                                />
                            </Routes>
                        </>
                    )}
                </div>
        </>
        );
};

export default NoteEditor;
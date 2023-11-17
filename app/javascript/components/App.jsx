import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, useToastContainer } from 'react-toastify'
import Editor from './Editor';
import "./App.css";
import Game from "./tick_tack_toe/Game";
import NoteEditor from './note/NoteEditor';

const App = () => (
  <>
    <Routes>
      <Route path="events/*" element={<Editor />} />
      <Route path='/tick_tack_toes/index' element={<Game />} />
      <Route path='/notes/*' element={<NoteEditor />} />
    </Routes>
    <ToastContainer />
  </>
);

export default App;
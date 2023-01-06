import React from 'react';
import Todo from './Todo';
import SignIn from './SignIn';
import {BrowserRouter, Routes,Route } from "react-router-dom"

function App() {
  
  return (
    <div>
      <BrowserRouter> 
      <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Todo />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
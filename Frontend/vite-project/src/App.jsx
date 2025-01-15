import React from 'react'
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from '../src/amazon clone/header/header.jsx';
import Body from './amazon clone/body/body.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Body/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

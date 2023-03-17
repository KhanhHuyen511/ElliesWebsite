import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components';
import { Study, Document, Exercise, Profile, Forum } from './pages';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Study />} />
          <Route path='/document' element={<Document />} />
          <Route path='/exercise' element={<Exercise />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

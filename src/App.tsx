import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Components/HomeComponent/Home';
import UsersProvider from './context/usercontext';

import { UserPage } from './Components/UserDetails/UserPage';

function App() {
  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/user/:id' element={<UserPage/>}/>
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}

export default App;

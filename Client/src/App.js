import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.js'
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';

function App() {
  return (
      <div>
    <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
    </div>
  );
}

export default App;

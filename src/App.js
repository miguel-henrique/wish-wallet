import React from 'react';
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css';

export default function App() {
  // 👇️ with React router
 // const location = useLocation();

  //console.log('hash', location.hash);
  //console.log('pathnameaaaa', location.pathname);
  //console.log('search', location.search);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/add'  element={<Add/>} />
          <Route exact path='/edit/:id'  element={<Edit/>} />
              </Routes>
      </Router>
    </div>
  );
}

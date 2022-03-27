import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoList } from './pages/todolist/todoList';
import { SignIn } from './pages/signin/signin';
import { SignUp } from './pages/signup/signup';
import { ToastContainer } from 'react-toastify';
import './App.css';

export const App = () => {

  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/todolist' element={<TodoList />} />
          <Route path='*' element={
            <main className='wrongRoute'>
              <p>There's nothing here, Please check the url!</p>
            </main>
          } />
        </Routes>
      </Router>

    </div>
  )
}
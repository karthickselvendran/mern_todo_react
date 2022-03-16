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
          <Route path='/mern_todo_react/' element={<SignIn />} />
          <Route path='/mern_todo_react/signin' element={<SignIn />} />
          <Route path='/mern_todo_react/signup' element={<SignUp />} />
          <Route path='/mern_todo_react/todolist' element={<TodoList />} />
          <Route path='/mern_todo_react/*' element={<h3 className='wrongRoute'>Please check the url</h3>} />
        </Routes>
      </Router>

    </div>
  )
}
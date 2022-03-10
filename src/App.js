import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { API } from './service/service';
import "./App.css";

export const App = () => {

  const [value, setValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState('');

  useEffect(() => {
    getTodoList()
  }, [])

  const getTodoList = async () => {
    axios.get(`${API}/api/v1/getTodoList`).then((res) => {
      setTodoList(res.data.data)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    if (editIndex === '') {
      await axios.post(`${API}/api/v1/addTodoList`, { todoList: `${value}` }).then((res) => {
        if (res.data.status === 200) {
          getTodoList()
        }
      })
    } else {
      await axios.put(`${API}/api/v1/updateTodoList/${editIndex}`, { todoList: `${value}` }).then((res) => {
        if (res.data.status === 200) {
          getTodoList()
        }
      })
    }
    setValue('')
    setEditIndex('')
  }

  const editItem = (todoList, id) => {
    setValue(todoList)
    setEditIndex(id)
  }

  const deleteItem = (id) => {
    console.log(id)
    if (window.confirm("Are you sure want to delete this item?")) {
      axios.delete(`${API}/api/v1/deleteOneTodoList/${id}`).then((res) => {
        if (res.data.status === 200) {
          getTodoList()
        }
      })
    }
  }

  const deleteAll = () => {
    if (window.confirm("Are you sure want to delete all items?")) {
      axios.delete(`${API}/api/v1/deleteAllTodoList`).then((res) => {
        if (res.data.status === 200) {
          getTodoList()
        }
      })
    }
  }

  return (
    <div className="App">
      <h1 className="heading">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="todo..." value={value} onChange={(e) => setValue(e.target.value)} autoFocus /><br />
        <button type="submit">Add</button>
      </form>

      <div className="list">
        {
          todoList.length ?
            <div className="listHeading"><h2>All Lists</h2><button className="deleteAll" onClick={deleteAll} >Delete All</button></div> : null
        }
        {
          todoList.length ? todoList.map((item, index) => {
            return (
              <div className="eachList fs20" key={item._id}>
                <span>{index + 1 + "."}</span>&nbsp;&nbsp;&nbsp;<span className="text">{item.todoList}</span> &nbsp;&nbsp;&nbsp;
                <EditIcon className="curptr" onClick={() => editItem(item.todoList, item._id)} />&nbsp;&nbsp;&nbsp;
                <DeleteIcon className="curptr" onClick={() => deleteItem(item._id)} />
              </div>
            )
          }) : <span className="fs20">Empty List</span>
        }
      </div>
    </div>
  )
}
import React, { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getTodoListApi, addTodoListApi, updateTodoListApi, deleteTodoListApi, deleteAllTodoListApi } from '../../service/service';
import { toast } from 'react-toastify';
import "./todoList.css";

export const TodoList = () => {

    const [value, setValue] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [editIndex, setEditIndex] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        console.log(userData)
        if (!userData) {
            // navigate('./todolist')
            window.location.replace('/mern_todo_react/')
        }
    })

    useEffect(() => {
        getTodoList()
    }, [])

    const getTodoList = async () => {
        await getTodoListApi().then((res) => {
            console.log(res)
            setTodoList(res.data.data)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!value.trim()) return toast.error('Please type a some totos to Add');
        let data = { todoList: `${value}` }
        if (editIndex === '') {
            await addTodoListApi(data).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Added successfully') })
                }
            })
        } else {
            await updateTodoListApi(editIndex, data).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Updated successfully') })
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

    const deleteItem = async (id) => {
        console.log(id)
        if (window.confirm("Are you sure want to delete this item?")) {
            await deleteTodoListApi(id).then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('Deleted successfully') })
                }
            })
        }
    }

    const deleteAll = async () => {
        if (window.confirm("Are you sure want to delete all items?")) {
            await deleteAllTodoListApi().then((res) => {
                if (res.data.status === 200) {
                    getTodoList().then(() => { toast.success('All list Deleted successfully') })
                }
            })
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.replace('/mern_todo_react/')
    }

    return (
        <div className="App">

            <h1 className="heading">Todo List</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="todo..." value={value} onChange={(e) => setValue(e.target.value)} autoFocus /><br />
                <button type="submit">Add</button>
                <button className="logout" onClick={logout}>Logout</button>
            </form>

            <div className="list">
                {
                    todoList && todoList.length ?
                        <div className="listHeading"><h2>All Lists</h2><button className="deleteAll" onClick={deleteAll} >Delete All</button></div> : null
                }
                {
                    todoList && todoList.length ? todoList.map((item, index) => {
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
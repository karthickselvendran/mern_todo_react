import axios from 'axios';

const API = "https://mern-todo-app-karthick.herokuapp.com"
// const API = "http://localhost:8000"

const userData = JSON.parse(localStorage.getItem('userData'))

const authData = {
    headers: {
        authorization: userData && userData.userToken ? `${userData.userToken}` : null
    }
}

const signupService = (data) => {
    return axios.post(`${API}/api/v1/signup`, data)
}

const signinService = (data) => {
    return axios.post(`${API}/api/v1/signin`, data)
}

const getTodoListApi = () => {
    return axios.get(`${API}/api/v1/getTodoList`, authData)
}

const addTodoListApi = (data) => {
    return axios.post(`${API}/api/v1/addTodoList`, data, authData)
}

const updateTodoListApi = (editIndex, data) => {
    return axios.put(`${API}/api/v1/updateTodoList/${editIndex}`, data, authData)
}

const deleteTodoListApi = (id) => {
    return axios.delete(`${API}/api/v1/deleteOneTodoList/${id}`, authData)
}

const deleteAllTodoListApi = () => {
    return axios.delete(`${API}/api/v1/deleteAllTodoList`, authData)
}

export {
    API, signupService, signinService, getTodoListApi, addTodoListApi, updateTodoListApi, deleteTodoListApi, deleteAllTodoListApi
}
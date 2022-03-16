import React, { useState, useEffect } from 'react';
import { signupService } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
}

export const SignUp = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(initialState);

    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'))
        console.log(userData)
        if(userData && userData.userToken){
            // navigate('./todolist')
            window.location.replace('/mern_todo_react/todolist')
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(
            {
                ...userDetails,
                [name]: name === "userName" ? value.toLowerCase() : value
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { userName, email, phoneNumber, password } = userDetails
        if (!userName || !email || !phoneNumber || !password) return toast.error('All fields are required!')
        signupService(userDetails)
            .then((res) => {
                if (res.data.status === 200) {
                    toast.success('signup successfully')
                    setUserDetails(initialState)
                } else {
                    console.log(res)
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
    }

    console.log(userDetails)
    return (
        <div className='container'>
            <div className='card'>
                <form action='/signin'>
                    <h1>SignUp</h1>
                    <input
                        type="text"
                        placeholder='username'
                        name='userName'
                        onChange={handleChange}
                        value={userDetails.userName}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="email"
                        placeholder='email'
                        name='email'
                        onChange={handleChange}
                        value={userDetails.email}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="number"
                        placeholder='phonenumber'
                        name='phoneNumber'
                        onChange={handleChange}
                        value={userDetails.phoneNumber}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="password"
                        placeholder='password'
                        name='password'
                        onChange={handleChange}
                        value={userDetails.password}
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="submit"
                        value="signup"
                        onClick={handleSubmit}
                    />
                    <br />
                    <br />
                    <a href='/signin'>Already have an account? Signin</a>
                </form>
            </div>
        </div>
    )
}
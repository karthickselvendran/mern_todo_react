import React, { useState, useEffect } from 'react';
import { signinService } from '../../service/service';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import './signin.css';

const initialState = {
    email: '',
    password: '',
}

export const SignIn = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(initialState);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        if (userData && userData.userToken) {
            navigate('/todolist', { state: "karthick" })
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(
            {
                ...userDetails,
                [name]: name === "email" ? value.toLowerCase() : value
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userDetails
        if (!email || !password) return toast.error('All fields are required!')
        signinService(userDetails)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem('userData', JSON.stringify(res.data.userData))
                    setUserDetails(initialState)
                    // navigate('/todolist')
                    window.location.replace('/todolist');
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
    }

    return (
        <div className='container'>
            <div className='card'>
                <form action='/todolist'>
                    <h1>SignIn</h1>
                    <input
                        type="text"
                        placeholder='username or email'
                        name='email'
                        onChange={handleChange}
                        value={userDetails.email}
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
                        value="signin"
                        onClick={handleSubmit}
                    />
                    <br />
                    <br />
                    <Link to="/signup">
                        <span>Are you New user? Signup</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}
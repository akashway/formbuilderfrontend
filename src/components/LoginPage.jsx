import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormBuilderContext } from '../context/ContextProvider'


import loginService from '../services/loginService'

const LoginPage = () => {

    const navigate = useNavigate()
    const {setCurrentUserName}=useContext(FormBuilderContext)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prevData => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }

    const logonSubmitHandler = async (event) => {
        event.preventDefault()
        const response = await loginService(formData)
        let data=""
        if (response.status === 200) {
            data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            alert('Logged on succesfully')
            navigate("/workspace")
        }
        else{
            data = await response.json()
            console.log("error",data)
        }
    }

    return (
        <div>
            <form onSubmit={logonSubmitHandler}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="**********"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Log On</button>
            </form>

            <div>
                Don’t have an account?<Link to="/signup">Register now </Link>
            </div>
        </div>
    )
}

export default LoginPage

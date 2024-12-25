import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signupService from '../services/signupService'
import loginService from '../services/loginService'


const SignupPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    const signupSubmitHandler = async (event) => {
        event.preventDefault()
        if (formData.password === formData.confirmPassword) {
            const response = await signupService(formData)
            let data = ""
            if (response.status === 200) {
                data = await response.json()
                alert(data.message)
                const loginResponse = await loginService(formData)
                if (loginResponse.status === 200) {
                    const res = await loginResponse.json()
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('username', res.username)
                    navigate("/workspace")
                }
                else {
                    const res = await loginResponse.json()
                    console.log("error", res)
                }
            }
            else {
                data = await response.json()
                alert(data.message)
            }
        }
        else {
            alert("enter same password in both fields")
        }
    }

    return (
        <div>
            <form onSubmit={signupSubmitHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="**********"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>

            <div>
                Already have an account ? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}

export default SignupPage

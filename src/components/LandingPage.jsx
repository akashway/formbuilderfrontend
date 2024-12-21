import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/workspace")
        }
    })

    return (
        <div>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/login")}>Create a FromBot</button>
        </div>
    )
}

export default LandingPage

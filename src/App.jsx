import React from 'react'
import { Routes,Route } from "react-router-dom"
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Dashboard from './components/Dashboard'
import ContextProvider from './context/ContextProvider'

function App() {
  return (
   <ContextProvider>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignupPage/>}/>
      <Route path="workspace" element={<Dashboard/>}/>
    </Routes>
   </ContextProvider>
  )
}

export default App

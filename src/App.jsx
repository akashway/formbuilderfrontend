import React,{useContext} from 'react'
import { Routes,Route } from "react-router-dom"
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import Dashboard from './components/Dashboard'
import { FormBuilderContext } from './context/ContextProvider'
import './app.css'


function App() {
  const {selectedFolder, setSelectedFolder } = useContext(FormBuilderContext)

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="signup" element={<SignupPage/>}/>
      <Route path="workspace" element={<Dashboard/>}/>
      <Route path="workspace/:foldername" element={<Dashboard/>}/>
    </Routes>
  )
}

export default App

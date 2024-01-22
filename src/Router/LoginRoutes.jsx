import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Auth/Pages/Login'

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<Login/>}/>
    </Routes>
  )
}

export default LoginRoutes

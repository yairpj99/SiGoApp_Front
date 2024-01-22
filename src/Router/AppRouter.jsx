import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginRoutes from './LoginRoutes'
import AuthRoutes from './AuthRoutes'
import { useSelector } from 'react-redux'

const AppRouter = () => {
  const {auth} = useSelector(state=>state.auth);
  return (
    <Routes>
      {(!auth)?
        <Route path='*' element={<LoginRoutes/>}/>
        :
        <Route path='*' element={<AuthRoutes/>}/>
      }
    </Routes>
  )
}

export default AppRouter

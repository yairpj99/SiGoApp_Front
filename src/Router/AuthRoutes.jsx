import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Pages/Home'
import HomePdv from '../Modules/PuntoDeVenta/Pages/HomePdv'
import Profile from '../Home/Pages/Profile'
import HomeGestion from '../Modules/Gestion/Pages/HomeGestion'
import HomeInventarios from '../Modules/Inventarios/Pages/HomeInventarios'
import HomeGestionInventarios from '../Modules/GestionDeInventarios/Pages/HomeGestionInventarios'
import { useSelector } from 'react-redux'

const AuthRoutes = () => {
  const {data} = useSelector(state=>state.auth); 
  return (
    <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/' element={<Home/>}/>
        {(data.strAcceso=='total')?
        <>
        <Route path='/pdv' element={<HomePdv/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/gestion' element={<HomeGestion/>}/>
        <Route path='/inventarios' element={<HomeInventarios/>}/>
        <Route path='/gestion/inventarios' element={<HomeGestionInventarios/>}/>
        </>
        :(data.strAcceso=='ventas')?
        <>
        <Route path='/pdv' element={<HomePdv/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/inventarios' element={<HomeInventarios/>}/>
        </>
        :
        <Route path='/profile' element={<Profile/>}/>
        }
    </Routes>
  )
}

export default AuthRoutes

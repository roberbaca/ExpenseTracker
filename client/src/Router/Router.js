import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Dashboard from '../pages/Dashboard/Dashboard';
import { PATHS } from './Paths'


const Router = () => {

    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, [token])
    

    return (
        <div>
            <BrowserRouter>                
                <Header/> 
                <Routes> 

                     {token ? PATHS.private.map( (r,index) => <Route {...r} key = {index}/>) : PATHS.noLoggedIn.map( (r,index) => <Route {...r} key = {index}/> )}               
                    
                     {/* Una vez logueado, nos redirige al HOME */}
                    {token && <Route path="/" element={<Navigate to="/dashboard" replace />} /> }   
                    {!token && <Route path="/dashboard" element={<Navigate to="/" replace />} /> }                           
                    
                    {/* <Route path = "/" element = {<Home/>}></Route>
                    <Route path = "/dashboard" element = {<Dashboard/>}></Route>                                        */}
              
                </Routes>
                <Footer/>  
            </BrowserRouter>
        </div>
    )
}

export default Router
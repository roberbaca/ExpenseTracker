import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PATHS } from './Paths'
import { useSelector } from 'react-redux';

const Router = () => {

    const token  = useSelector(store => store.auth.token);      

    return (
        <div>
            <BrowserRouter>                
                <Header/> 
                <Routes> 
                  { token ? PATHS.private.map( (r,index) => <Route {...r} key = {index}/>) : PATHS.noLoggedIn.map( (r,index) => <Route {...r} key = {index}/> )}                
                </Routes>
                <Footer/>  
            </BrowserRouter>
        </div>
    )
}

export default Router

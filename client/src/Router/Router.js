import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { PATHS } from './Paths'
import { useSelector } from 'react-redux';

const Router = () => {

    const token  = useSelector(store => store.auth.token);   
    const role  = useSelector(store => store.auth.userInfo.role);       

    return (
        <div>
            <BrowserRouter>                
                <Header/> 
                <Routes> 
        
                { token ? 
                    role !== "admin" ? PATHS.private.map( (r,index) => <Route {...r} key = {index}/>) : PATHS.admin.map( (r,i) => <Route {...r} key = {i}/>)
                    :  PATHS.noLoggedIn.map( (r,ix) => <Route {...r} key = {ix}/>)          
                }                     

                </Routes>
                <Footer/>  
            </BrowserRouter>
        </div>
    )
}

export default Router


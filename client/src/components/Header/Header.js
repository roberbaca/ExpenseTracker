import React, { useState }from 'react'
import '../../styles/Header.css';
import '../../styles/Global.css';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser, FaLock } from 'react-icons/fa';

const Header = () => {
  
  return (
    <section className='header__wraper'>
            <div className='header__logo'>
                <img src={require("../../assets/appLogo.png")} alt="logo" className='sitelogo'/>
            </div>
            <h1 className='header__title'>Expense Tracker</h1>
            <div className='header__logout'>               
            </div>
    </section>    
  )
}

export default Header
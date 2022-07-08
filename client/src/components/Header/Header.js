import React, { useState, useEffect }from 'react'
import '../../styles/Header.css';
import '../../styles/Global.css';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {

  const [token, setToken] = useState('');

  useEffect(() => {
      setToken(localStorage.getItem('token'));
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <section className='header__wraper'>
            <div className='header__logo'>
                <img src={require("../../assets/appLogo.png")} alt="logo" className='sitelogo'/>
                <h1 className='header__title'>Expense Tracker</h1>
            </div>
            <div className='header__logout'> 
              <FiLogOut className='logout' onClick={handleLogout}/>       
            </div>
    </section>    
  )
}

export default Header
import React, { useState }from 'react'
import '../../styles/Home.css';
import '../../styles/Auth.css';
import '../../styles/Global.css';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser, FaLock } from 'react-icons/fa';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

const Home = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = () => {
        setIsLogin(true);
    }

    const handleRegister = () => {
        setIsLogin(false);
    }

  return (
    <section className='home'>
        <h1 className='home__title'>Expense Tracker</h1>

        {isLogin && <div className='auth'>       
            <div className='auth__wraper'>
            <h2 className='auth__title'>Login</h2>
            <input className='auth__input' type="text" placeholder='Email'/>
            <input className='auth__input' type="text" placeholder='Password' />
            <button className='auth__btn'>Sign In</button>
            <p className='logwith'>Or login with:</p>
            <div className='social__wraper'>
                <FaGithubAlt className='social__icon'/>
                <FaGoogle className='social__icon'/>
                <FaFacebook className='social__icon'/>
            </div>
            <div className='sign'>            
                <p className='sign__title' onClick={handleRegister}><FaUser className='sign__icon'/>Sign Up</p>
            </div>
            </div>        
        </div>} 

        {!isLogin &&<div className='auth'>       
            <div className='auth__wraper'>
                <h2 className='auth__title'>Sign Up</h2>
                <input className='auth__input' type="text" placeholder='Enter email'/>
                <input className='auth__input' type="text" placeholder='Enter password' />
                <input className='auth__input' type="text" placeholder='Confirm password' />
                <button className='auth__btn'>Register</button>          
                <div className='sign'>            
                    <p className='sign__title'  onClick={handleLogin}><FaLock className='sign__icon'/>Log In</p>
                </div>
            </div>
        </div>}

    </section>
  )
}

export default Home
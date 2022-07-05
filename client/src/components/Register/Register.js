import React from 'react'
import '../../styles/Auth.css';
import '../../styles/Global.css';
import { FaLock } from 'react-icons/fa';

const Register = () => {
  return (
    <section className='auth'>       
        <div className='auth__wraper'>
          <h2 className='auth__title'>Sign Up</h2>
          <input className='auth__input' type="text" placeholder='Enter email'/>
          <input className='auth__input' type="text" placeholder='Enter password' />
          <input className='auth__input' type="text" placeholder='Confirm password' />
          <button className='auth__btn'>Register</button>          
          <div className='sign'>            
            <p className='sign__title'><FaLock className='sign__icon'/>Log In</p>
          </div>
        </div>
    </section>
  )
}

export default Register
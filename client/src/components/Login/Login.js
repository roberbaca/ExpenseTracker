import React from 'react'
import '../../styles/Auth.css';
import '../../styles/Global.css';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  return (
    <section className='auth'>       
        <div className='auth__wraper'>
          <h2 className='auth__title'>Login</h2>
          <input className='auth__input' type="text" placeholder='Email'/>
          <div>
            <input className='auth__input' type="text" placeholder='Password' />
            <AiOutlineEyeInvisible/>
          </div>
          <button className='auth__btn'>Sign In</button>
          <p className='logwith'>Or login with:</p>
          <div className='social__wraper'>
            <FaGithubAlt className='social__icon'/>
            <FaGoogle className='social__icon'/>
            <FaFacebook className='social__icon'/>
          </div>
          <div className='sign'>            
            <p className='sign__title'><FaUser className='sign__icon'/>Sign Up</p>
          </div>
        </div>
    </section>
  )
}

export default Login
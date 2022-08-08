import React, { useState, useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUserInfoAction, loginAction, registerAction } from '../../Redux/slices/auth';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser, FaLock } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Home.css';
import '../../styles/Auth.css';
import '../../styles/Global.css';

const Home = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [confirmedPassword, setConfirmedPassword] = useState(""); 
    const [name, setName] = useState(""); 
    const [isVisible, setIsVisible] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const token  = useSelector(store => store.auth.token); 
    const role  = useSelector(store => store.auth.userInfo.role); 
    const userInfo  = useSelector(store => store.auth.userInfo);         

    const togglePassword = () => {
        setIsVisible(!isVisible);
        setPasswordType(isVisible ? "password" : "text");
    }

    const handleLogin = () => {
        setIsLogin(true);          
    }

    const handleRegister = () => {
        setIsLogin(false);
    } 

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmedPassword = (e) => {
        setConfirmedPassword(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
    }
   
    const passwordNotify = () => toast("❌ Password and confirmation do not match.");

    const onLogin = () => {
        dispatch( loginAction(email, password) );                    
    }

    const onRegister = () => {
        if (password === confirmedPassword) {
            dispatch( registerAction( name, email, password, "") );
        } else {
            passwordNotify();
        }
    }

    useEffect(() => {
        if (token) {
            dispatch( getUserInfoAction(token) );                                                  
        }        
    }, [token]) 

    useEffect(() => {         
        if ( userInfo.role == "admin") {                       
            navigate("/admin/dashboard");    
        } else if ( userInfo.role == "") {                        
            navigate("/user/dashboard");    
        }                    
    }, [userInfo]) 


  return (
    <section className='home'>

        {isLogin && <div className='auth'>       
            <div className='auth__wraper'>
            <h2 className='auth__title'>Login</h2>
            <input className='auth__input' type="text" placeholder='Email' value={email} onChange={handleChangeEmail}/>
            <input   className='password__input' type={passwordType} placeholder='Password' value={password} onChange={handleChangePassword}/>
            {!isVisible && <AiOutlineEyeInvisible className='eyeicon' onClick={togglePassword} />}
            {isVisible && <AiOutlineEye className='eyeicon' onClick={togglePassword}/>}            
            <button className='auth__btn' type='submit' onClick={onLogin}>Sign In</button>
            {/* <p className='logwith'>Or login with:</p>
            <div className='social__wraper'>
                <FaGithubAlt className='social__icon'/>
                <FaGoogle className='social__icon'/>
                <FaFacebook className='social__icon'/>
            </div> */}
            <div className='sign'>            
                <p className='sign__title' onClick={handleRegister}><FaUser className='sign__icon'/>Sign Up</p>
            </div>
            </div>        
        </div>} 

        {!isLogin &&<div className='auth'>       
            <div className='auth__wraper'>
                <h2 className='auth__title'>Sign Up</h2>
                <input className='auth__input' type="text" placeholder='Enter username' value={name} onChange={handleChangeName}/>
                <input className='auth__input' type="text" placeholder='Enter email' value={email} onChange={handleChangeEmail}/>

                <input   className='auth__input' type={passwordType} placeholder='Enter password' value={password} onChange={handleChangePassword} required/>
                {!isVisible && <AiOutlineEyeInvisible className='pass__eyeicon' onClick={togglePassword} />}
                {isVisible && <AiOutlineEye className='pass__eyeicon' onClick={togglePassword}/>}    
                
                <input   className='auth__input' type={passwordType} placeholder='Confirm password' value={confirmedPassword} onChange={handleChangeConfirmedPassword} required/>
                {!isVisible && <AiOutlineEyeInvisible className='confirm__eyeicon' onClick={togglePassword} />}
                {isVisible && <AiOutlineEye className='confirm__eyeicon' onClick={togglePassword}/>}                          
        
                <button className='auth__btn' onClick={onRegister} >Register</button>          
                <div className='sign'>            
                    <p className='sign__title'  onClick={handleLogin}><FaLock className='sign__icon'/>Log In</p>
                </div>
            </div>
        </div>}
        <ToastContainer 
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

    </section>
  )
}

export default Home
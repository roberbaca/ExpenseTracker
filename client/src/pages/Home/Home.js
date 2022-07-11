import React, { useState, useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getUserInfoAction, loginAction } from '../../Redux/slices/auth';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser, FaLock } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Home.css';
import '../../styles/Auth.css';
import '../../styles/Global.css';

//import Login from '../../components/Login/Login';
//import Register from '../../components/Register/Register';


const Home = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 
    const token  = useSelector(store => store.auth.token); 
    const userInfo  = useSelector(store => store.auth.userInfo.name);     
 

    const handleLogin = () => {
        setIsLogin(true);
    }

    const handleRegister = () => {
        setIsLogin(false);
    } 

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const notify = () => toast("👋 Welcome ! " + userInfo);

    const onLogin = () => {
        dispatch( loginAction(email, password) );       
    }

    useEffect(() => {
        if (token) {
            dispatch( getUserInfoAction(token) );     
            notify();
            navigate("/user/dashboard");
        }
    }, [token])
    
 

  // Obtenemos los datos del usuario
    const onGetUser = async (token) => {   

        try {        
            const response = await axiosInstance.get('/auth/user/me',{                
                headers: {
                    Authorization: `Bearer ${token}`                
                }              
            });

            console.log(response.data);
            //window.localStorage.setItem('username', json.data.name);     
            navigate('/dashboard');

        } catch(error) {
            alert("User info error: " + error);
        }
    }

  

  return (
    <section className='home'>
        {isLogin && <div className='auth'>       
            <div className='auth__wraper'>
            <h2 className='auth__title'>Login</h2>
            <input className='auth__input' type="text" placeholder='Email' value={email} onChange={handleChangeEmail}/>
            <input className='auth__input' type="text" placeholder='Password' value={password} onChange={handleChangePassword}/>
            <button className='auth__btn' type='submit' onClick={onLogin}>Sign In</button>
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
        <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
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
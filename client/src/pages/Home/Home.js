import React, { useState }from 'react'
import '../../styles/Home.css';
import '../../styles/Auth.css';
import '../../styles/Global.css';
import { FaGithubAlt, FaGoogle, FaFacebook, FaUser, FaLock } from 'react-icons/fa';
//import Login from '../../components/Login/Login';
//import Register from '../../components/Register/Register';
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    //const navigate = useNavigate();    

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

    const onLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });  // llamada al back y obtenemos el token       
            const token = response.data.accessToken;
            console.log('token', response.data);
            localStorage.setItem('token', token);
            onGetUser(token); 

        } catch (error) {
            alert("Incorrect email or password");
            console.log(error);
        }
    }

 

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
            //navigate('/dashboard');

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
            <button className='auth__btn' onClick={onLogin}>Sign In</button>
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
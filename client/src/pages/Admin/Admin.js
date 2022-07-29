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

const Admin = () => {
    
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

  return (
    <div>Admin</div>
  )
}

export default Admin
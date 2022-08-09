import React from 'react'
import '../../styles/Global.css';
import '../../styles/Footer.css';
import { FaGithubAlt } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { GrLinkedinOption } from "react-icons/gr";

const Footer = () => {
  return (
    <footer>
        <a className='footer__socialicon' href="https://robertobaca-90035.web.app/" target="_blank" rel="noopener noreferrer"><img className="footer__logo" src={require('../../assets/rnbGamesCubeLogoinv2.png')} alt="logo" /></a>        
        <p className='footer__copy'>Copyright &copy; 2022 <span>Roberto Baca</span></p>
        <div className='footer__iconcontainer'>
            <a className='footer__socialicon' href="https://github.com/roberbaca/pokedex" target="_blank" rel="noopener noreferrer"><FaGithubAlt/></a>
            <a className='footer__socialicon' href="https://www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer"><GrLinkedinOption/></a>         
            <a className='footer__socialicon' href="mailto:roberto.nicolas.baca@gmail.com" target="_blank" rel="noopener noreferrer"><AiFillMail/></a>             
        </div>            
  </footer>
  )
}

export default Footer

import React from 'react'
import '../../styles/Global.css';
import '../../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className='loader__container'>
        <div className='loader__spinner'></div> 
    </div>
  )
}

export default LoadingSpinner
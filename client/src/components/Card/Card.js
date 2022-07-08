import React from 'react'
import '../../styles/Card.css';
import '../../styles/Global.css';

const Card = () => {
  return (
    <div className='card__wraper'>
        <div className='title__container'>
            <h2 className='card__category'>Food</h2>
            <h1 className='card__title'>Pizza</h1>
            <p className='card__date'>05 July 2022</p>
        </div>
        <p className='card__amount'>$ 582.90</p>
    </div>
  )
}

export default Card
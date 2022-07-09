import React from 'react'
import '../../styles/Card.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';

const Card = ( {category, title, date, amount} ) => {
  return (
    <div className='card__wraper'>
      <div className='close__wraper'>
        <h2 className='card__category'>{category}</h2>
        <AiOutlineClose className='close__icon'/>
      </div>
      <div className='title__container'>
          <h1 className='card__title'>{title}</h1>
          <p className='card__date'>{date}</p>
      </div>
      <p className='card__amount'>$ {amount}</p>
    </div>
  )
}

export default Card
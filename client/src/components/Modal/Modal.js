import React, {useState} from 'react'
import ReactDom from 'react-dom'
import '../../styles/Modal.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

const categories = [    

    {
        id: 1,
        title: 'Food',
    },
    {
        id: 2,
        title: 'Fuel',
    },
    {
        id: 3,
        title: 'Entertainment',
    },
    {
        id: 4,
        title: 'Other',
    }
]



export default function Modal({ open, children, onClose }) {

    const [dropdownValue, setDropdownValue] = useState('');

    const handleDropdown = (e) => {
        setDropdownValue(e.target.value);    
    }  

    const createExpense = () => {
        onClose();
    }

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='modal__card'>
        <div className='modal__header'>
          <h2 className='modal__title'>Add Expense</h2>
          <AiOutlineClose className='close__icon' onClick={onClose}/>
        </div>
        <div className='modal__body'>
            <select className='select' onChange={handleDropdown}>                 
                    { categories.map ( (category, index) => (
                    <option key = {index} value = {category.title}>{category.title}</option>                     
                ))}
            </select>
            <input className='modal__input' type="text" placeholder='Title'/>
            <input className='modal__input' type="number" placeholder='Amount' />
            <input className='modal__input' type="date" placeholder='Date' />
            <textarea className='modal__textarea' type="text" placeholder='Description (optional)' />
            <button className='modal__btn' onClick={createExpense}>Submit</button>   
        </div>


        {/* <div className='modal__infocontainer'>
        {children}
        </div>     */}
      </div>
    </>,
    document.getElementById('portal')
  )
}
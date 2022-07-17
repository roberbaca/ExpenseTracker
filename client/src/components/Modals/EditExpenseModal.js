import React from 'react'
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


export default function EditExpenseModal({ open, children, onClose }) {    

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='modal__card'>
        <div className='modal__header'>
          <h2 className='modal__title'>Edit Expense</h2>
          <AiOutlineClose className='close__icon' onClick={onClose}/>
        </div>        
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}
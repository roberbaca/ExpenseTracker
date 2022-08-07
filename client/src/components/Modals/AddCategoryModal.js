import React, {useState} from 'react'
import ReactDom from 'react-dom'
import '../../styles/Modal.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction } from '../../Redux/slices/category';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function AddCategoryModal({ open, children, onClose }) {
 
    const [title, setTitle] = useState("");   
    const token  = useSelector(store => store.auth.token);     
    
    const dispatch = useDispatch(); 

    const createCategory = () => {
      dispatch( addCategoryAction(token, title) );      
      setTitle("");
      onClose();
    } 

    const handleChangeTitle = (e) => {
      setTitle(e.target.value);
    }

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className='modal__card'>
        <div className='modal__header'>
          <h2 className='modal__title'>Add Category</h2>
          <AiOutlineClose className='close__icon' onClick={onClose}/>
        </div>
        <div className='modal__body'>            
            <input className='modal__input' type="text" placeholder='Title' value={title} onChange={handleChangeTitle} required/>           
            <button className='modal__btn' type='submit' onClick={createCategory}>Submit</button>   
        </div>      
      </div>
    </>,
    document.getElementById('portal')
  )
}
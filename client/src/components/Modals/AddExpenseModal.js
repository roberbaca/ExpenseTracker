import React, {useState} from 'react'
import ReactDom from 'react-dom'
import '../../styles/Modal.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseAction, showAllExpensesAction } from '../../Redux/slices/expenses';
import moment from 'moment';

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function AddExpenseModal({ open, children, onClose }) {
 
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");     
    const [newDate, setNewDate] = useState("");
    const [categoryId, setCategoryId] = useState(-1); 
    const categories = useSelector(store => store.category.categoriesList);
    const token  = useSelector(store => store.auth.token);     
    
    const dispatch = useDispatch(); 

    const createExpense = () => {
      dispatch( addExpenseAction(token, newDate, title, amount, categoryId ) );  
      setAmount(0);    
      setTitle("");
      onClose();
    }

    const handleChangeCategory = (e) => {
      setCategoryId(parseInt(e.target.value));
    }

    const handleChangeTitle = (e) => {
      setTitle(e.target.value);
    }

    const handleChangeAmount = (e) => {     
      setAmount(+e.target.value);
    }

  const handleChangeDate = (e) => {    
    let myDate = moment.utc(e.target.value).format('YYYY-MM-DD');    
    setNewDate(myDate);
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
            <select className='select' defaultValue={"Default"} onChange={handleChangeCategory}>    
                    <option value={"Default"} disabled>Select Category</option>             
                    { categories.map ( (category, index) => (
                    <option key = {index} value = {category.id}>{category.title}</option>                     
                ))}
            </select>
            <input className='modal__input' type="text" placeholder='Title' value={title} onChange={handleChangeTitle} required/>
            <input className='modal__input' type="number" placeholder='Amount' value={amount} onInput={handleChangeAmount} required/>
            <input className='modal__input' type="date" placeholder='Date' onChange={handleChangeDate} required />            
            <button className='modal__btn' type='submit' onClick={createExpense}>Submit</button>   
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
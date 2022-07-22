import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditExpenseModal from '../../components/Modals/EditExpenseModal';
import '../../styles/Card.css';
import '../../styles/Global.css';
import { AiOutlineClose } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { format, parseISO } from 'date-fns'
import { deleteExpenseAction, showAllExpensesAction } from '../../Redux/slices/expenses';


const Card = ( {id, category, title, date, amount } ) => {

  const [isEditExpenseModalOpen, setEditExpenseModalIsOpen] = useState(false);
  const categories = useSelector(store => store.category.categoriesList);
  const token  = useSelector(store => store.auth.token); 
  const expenses  = useSelector(store => store.expenses.expensesList); 

  const dispatch = useDispatch(); 

  const deleteExpense = () => {    
    console.log("delete expense number " + id);
    dispatch( deleteExpenseAction( id, token) );      
    dispatch( showAllExpensesAction(token) );      
}

  const editExpense = () => {
    console.log("delete expense number " + id);    
    setEditExpenseModalIsOpen(true);         
  }

  const handleChangeCategory = (e) => {
    //setCategoryId(parseInt(e.target.value));    
    
  }

  const handleChangeTitle = (e) => {
    //setTitle(e.target.value);    
  }

  const handleChangeAmount = (e) => {     
    //setAmount(+e.target.value);
  }

  const handleChangeDate = (e) => {     
    //setAmount(+e.target.value);
  }

  /*
  const editExpense = () => {
    //dispatch( addExpenseAction(token, title, amount, categoryId ) );
    dispatch( showAllExpensesAction(token) );   
    onClose();
  }
  */

  const submitEdition = () => {

  }


  return (
    <div className='card__wraper'>
      <div className='close__wraper'>
        <div className='card__icons'>
          <FiEdit className='close__icon--edit' onClick={editExpense}/>
          <AiOutlineClose className='close__icon--delete' onClick={deleteExpense}/>
        </div>        
      </div>
      <div className='title__container'>
          <h2 className='card__category'>{category}</h2>
          <h1 className='card__title'>{title}</h1>
          <p className='card__date'>{ format(parseISO(date), 'yyyy-MM-dd') }</p>
      </div>
      <p className='card__amount'>$ {amount}</p>


      <EditExpenseModal open={isEditExpenseModalOpen} onClose={() => setEditExpenseModalIsOpen(false)}>
        <div className='modal__body'>
              <select className='select' onChange={handleChangeCategory} value={category?.id}>                 
                      <option selected disabled hidden>Select Category</option>
                      { categories.map ( (category, index) => (
                      <option key = {index} value = {category.id}>{category.title}</option>                     
                  ))}
              </select>
              <input className='modal__input' type="text" placeholder='Title' defaultValue={title} onChange={handleChangeTitle}/>
              <input className='modal__input' type="number" placeholder='Amount' defaultValue={amount} onChange={handleChangeAmount}/>
              <input className='modal__input' type="date" placeholder='Date' defaultValue={ format(parseISO(date), 'yyyy-MM-dd') } onChange={handleChangeDate} />
              <textarea className='modal__textarea' type="text" placeholder='Description (optional)' />
              <button className='modal__btn' type='submit' onClick={submitEdition}>Submit</button>   
          </div>
      </EditExpenseModal>
    </div>
  )


}


export default Card
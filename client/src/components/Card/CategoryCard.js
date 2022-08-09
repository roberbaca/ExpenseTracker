import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EditExpenseModal from '../../components/Modals/EditExpenseModal';
import '../../styles/Card.css';
import '../../styles/Global.css';
import { FiEdit } from 'react-icons/fi';
import { deleteCategoryAction, updateCategoryAction } from '../../Redux/slices/category';
import { IoTrashBinSharp } from 'react-icons/io5';

const CategoryCard = ( {id, title } ) => {
  
  const token  = useSelector(store => store.auth.token); 
  
  const [isEditCategoryModalOpen, setEditCategoryModalIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
 
  const dispatch = useDispatch(); 

  const deleteCategory = () => {        
    dispatch( deleteCategoryAction( id, token) );         
  }

  const editCategory = () => {    
    setEditCategoryModalIsOpen(true);    
    dispatch( updateCategoryAction(id, newTitle, token) );     
    setEditCategoryModalIsOpen(false);
  }

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);  
  }

  return (
    <div className='category__card'>
        <p className="category__id"># {id}</p>
        <p className="category__title">{title}</p>
        <div className='category__icons'>
        <FiEdit className='edit__icon' onClick={() => setEditCategoryModalIsOpen(true)}/>            
        <IoTrashBinSharp className="delete__icon" onClick={deleteCategory}/>     
    </div>

      <EditExpenseModal open={isEditCategoryModalOpen} onClose={() => setEditCategoryModalIsOpen(false)}>
        <div className='modal__body'>             
              <input className='modal__input' type="text" placeholder='Title' defaultValue={title} onChange={handleChangeTitle} required/>              
              <button className='modal__btn' type='button' onClick={editCategory}>Submit</button>   
          </div>
      </EditExpenseModal>
    </div>
  )
}

export default CategoryCard
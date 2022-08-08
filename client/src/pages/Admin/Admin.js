import React, { useState, useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showAllUsersAction } from '../../Redux/slices/users';
import { showAllCategoriesAction } from '../../Redux/slices/category';
import { RiAdminLine } from 'react-icons/ri';
import AddCategoryModal from '../../components/Modals/AddCategoryModal'
import { AiOutlinePlus } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Admin.css';
import '../../styles/Global.css';
import CategoryCard from '../../components/Card/CategoryCard';

const Admin = () => {
    
  const [searchvalue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState("all");
  const [isChecked, setIsChecked] = useState(true);
  const [isDashboardActive, setIsDashboardActive] = useState("user"); 
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isCategoryChecked, setIsCategoryChecked] = useState(true);
  const [isSortedBy, setIsSortedBy] = useState("id");  
  const [sortedCategories, setSortedCategories] = useState([]); 
  
  const usersList  = useSelector(store => store.users.usersList); 
  const categories = useSelector(store => store.category.categoriesList);
  const token  = useSelector(store => store.auth.token); 

  const dispatch = useDispatch(); 
    
  const handleSearch = (e) => {
    setSearchValue(e.target.value.toUpperCase());
  }

  const handleDropdown = (e) => {
      let filterRole = e.target.value;           
      setDropdownValue(filterRole);       
  }    

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    setIsDashboardActive(e.target.value);                  
  };

  const addCategory = () => {
    setModalIsOpen(true);        
  } 

  const handleOnChange = (e) => {
    setIsCategoryChecked(!isCategoryChecked);
    setIsSortedBy(e.target.value);        
};


  useEffect(() => {         
    dispatch( showAllCategoriesAction() );    
    dispatch( showAllUsersAction(token) );                                      
  }, [])


  useEffect(() => {        
    setSortedCategories([...categories]);          
    dispatch( showAllCategoriesAction(token) );          
}, [JSON.stringify(categories)])

  return (
    <section className="admin__dashboard">
      <div className='dashboard__menu'>
        <div className='dashboard__header'>
          <h1 className='dashboard__title'>Admin Dashboard</h1>
          <RiAdminLine className='dashboard__icon'/>
        </div>
        <div className="checkbox__container">
              <div className='checkbox__wraper'>
                <input type="checkbox" id='user' value={"user"} className="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                <label htmlFor="user" className='checkbox__label'>Users Data</label>
              </div>
              <div className='checkbox__wraper'>
                <input type="checkbox" id='category' value={"category"} className="checkbox" checked={!isChecked} onChange={handleCheckboxChange}/>
                <label htmlFor="category" className='checkbox__label'>Category Data</label>
              </div>
        </div>
      </div>


    { isDashboardActive === "user" && <div className='users__dashboard'>      
        <div className='search__wraper'>            
          <input type="text" placeholder='Search by username...' className='searchbar' onChange={handleSearch}/>
          <div className='select__wraper'>
            <p className='sort__title'>Sort by role</p>
            <select className='select' onChange={handleDropdown}>
              <option value = "all">All</option>   
              <option value = "admin">Admin</option> 
              <option value = "">User</option>               
            </select>
          </div>      
        </div>
        
        <div className='table__wraper'>       
          <div className='table__content'>
          { usersList.filter( user => dropdownValue === "all" ?
              user.name.toUpperCase().includes(searchvalue) :          
              user.name.toUpperCase().includes(searchvalue) && user.role === dropdownValue).map( (user, index) => (
                <div index = {index} className='userdata__card'>
                  <div className='userdata__header'>
                    <p className="userdata__id"># {user.id}</p>
                    <p className={ user.role === "" ? "role__user" : "role__admin"} >{ user.role === "" ? "user": "admin"}</p>
                  </div>                  
                  <p className="userdata">{user.name}</p>          
                  <p className="userdata">{user.email}</p>                    
                  {/* <IoTrashBinSharp className="userdata--icon"/> */}
                </div>        
          )) }       
          </div> 
        </div>
    </div> }


    { isDashboardActive === "category" && <div className='category__dashboard'>      
        <div className='search__wraper'>            
          <input type="text" placeholder='Search by category name...' className='searchbar' onChange={handleSearch}/>         
          <div className='sort__wraper'>
                <p className='sort__title'>Sort by:</p>
                <div className='sort__checkboxwraper'>
                    <div className='checkbox__wraper'>
                        <input type="checkbox" id='id' value={"id"} className="sort__checkbox" checked={isCategoryChecked} onChange={handleOnChange}/>
                        <label htmlFor="id" className='checkbox__label'>Id</label>
                    </div>
                    <div className='checkbox__wraper'>
                        <input type="checkbox" id='name' value={"name"} className="sort__checkbox" checked={!isCategoryChecked} onChange={handleOnChange}/>
                        <label htmlFor="name" className='checkbox__label'>Name</label>
                    </div>
                </div>
            </div>            
        </div>

        
        <div className='table__wraper'>       
          <div className='table__content'>
          {  isSortedBy === "id" ? 
                [...categories].sort((a, b) =>  (a.id) - (b.id)).filter(category => category.title.toUpperCase().includes(searchvalue)).map( (category, index) => (               
                  <CategoryCard key = {index} id={category.id} title={category.title}/>)) :

                [...categories].sort((c, d) => c.title.localeCompare(d.title)).filter(category => category.title.toUpperCase().includes(searchvalue)).map( (category, index) => (               
                  <CategoryCard key = {index} id={category.id} title={category.title}/>))
            }    

          </div> 
        </div>

        <div className='add__wraper'>
            <AiOutlinePlus className='add__icon' onClick={addCategory}/>
        </div>

        {/* Pop Ups (Modal) */}        
        <AddCategoryModal open={isModalOpen} onClose={() => setModalIsOpen(false)}></AddCategoryModal>  
    </div> }

      </section>
  )
}

export default Admin
import React, { useState, useEffect }from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { showAllUsersAction } from '../../Redux/slices/users';
import { showAllCategoriesAction } from '../../Redux/slices/category';
import { IoTrashBinSharp } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Admin.css';
import '../../styles/Global.css';

const Admin = () => {
    
  const [searchvalue, setSearchValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState("all");
  const [isChecked, setIsChecked] = useState(true);
  const [isDashboardActive, setIsDashboardActive] = useState("user"); 
  
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

  useEffect(() => {         
    dispatch( showAllCategoriesAction() );    
    dispatch( showAllUsersAction(token) );                                      
  }, [])


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
        </div>
        
        <div className='table__wraper'>       
          <div className='table__content'>
          { categories.filter( category => category.title.toUpperCase().includes(searchvalue)).map( (category, index) => (
                <div index = {index} className='category__card'>
                   <p className="category__id"># {category.id}</p>
                   <p className="category__title">{category.title}</p>
                   <IoTrashBinSharp className="delete__icon"/>                 
                </div>        
          )) }       
          </div> 
        </div>
    </div> }


      </section>
  )
}

export default Admin
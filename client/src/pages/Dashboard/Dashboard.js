import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card'
import Modal from '../../components/Modal/Modal'
import '../../styles/Dashboard.css';
import '../../styles/Global.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { getTotalBalanceAction, getCategoryBalanceAction, showAllExpensesAction, addExpenseAction } from '../../Redux/slices/expenses';
import { showAllCategoriesAction } from '../../Redux/slices/category';

const Dashboard = () => {

    const [searchvalue, setSearchValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('All');
    const [isModalOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch(); 

    const token  = useSelector(store => store.auth.token); 
    const expenses  = useSelector(store => store.expenses.expensesList); 
    const totalBalance  = useSelector(store => store.expenses.totalBalance); 
    const categoryBalance  = useSelector(store => store.expenses.categoryBalance); 
    const categories = useSelector(store => store.category.categoriesList);

   
/*
    const expenses = [
        {   
            category: 'Food',
            title: 'McDonalds',
            date: '2020-01-01',
            amount: '100'
        },
        {
            category: 'Food',
            title: 'Burger King',
            date: '2020-01-01',
            amount: '125'
        },
        {
            category: 'Food',
            title: 'Pizza Hut',
            date: '2020-01-01',
            amount: '150'
        },
        {   
            category: 'Food',
            title: 'KFC',
            date: '2020-01-01',
            amount: '200'
        },
        {   
            category: 'Entertainment',
            title: 'Netflix',
            date: '2020-01-01',
            amount: '100'           
        },
        {
            category: 'Entertainment',
            title: 'Star Plus',
            date: '2020-01-01',
            amount: '125'
        },
        {
            category: 'Entertainment',
            title: 'HBO Max',
            date: '2020-01-01',
            amount: '150'
        },
        {
            category: 'Entertainment',
            title: 'Disney Plus',
            date: '2020-01-01',
            amount: '200'
        },
        {
            category: 'Fuel',
            title: 'Shell',
            date: '2020-01-01',
            amount: '100'
        }
    ];
*/

    const handleSearch = (e) => {
        setSearchValue(e.target.value.toUpperCase());
    }

    const handleDropdown = (e) => {
        setDropdownValue(e.target.value); 
        dispatch( getCategoryBalanceAction( dropdownValue, token) );     
        console.log("el id es: " + e.target.value);        
    }    

    const addExpense = () => {
        setModalIsOpen(true);        
    }

    useEffect(() => {
        if (token) {
            dispatch( showAllExpensesAction(token) );   
            dispatch( getTotalBalanceAction(token) );              
        }
    }, [token])

    useEffect(() => {
        dispatch( showAllCategoriesAction() );         
    }, [])

    useEffect(() => {
        dispatch( showAllExpensesAction(token) );           
    }, [expenses])

  return (
    <section className='dashboard__section'>       
    
        <div className='search__wraper'>
            
            <input type="text" placeholder='Search Expenses' className='searchbar' onChange={handleSearch}/>
            <select className='select' onChange={handleDropdown}>
                <option value = "All">All</option>         
            { categories?.map ( (category, index) => (
                    <option key = {index} value = {category.id} id={category.id}>{category.title}</option>                     
                ))}
            </select>

        </div>

        <div>
            <p className='dashboard__info'>You've spent $ {totalBalance} in a total of {expenses?.length} expenses</p>
            <p className='dashboard__info'>Category Balance $ {categoryBalance}</p>
        </div>
        <div className='cards__container'>   

        { expenses?.filter(e => dropdownValue === "All" ?
            e.title.toUpperCase().includes(searchvalue) : 
            e.title.toUpperCase().includes(searchvalue) && e.categoryId == dropdownValue).map( (e, index) => (
                <Card key = {index} category={e.categoryId} title={e.title} date={e.date} amount={e.amount}/>))
        }
          
        </div>

        <div className='add__wraper'>
            <AiOutlinePlus className='add__icon' onClick={addExpense}/>
        </div>




        {/* Pop Ups (Modal) */}        
      <Modal open={isModalOpen} onClose={() => setModalIsOpen(false)}></Modal>


        
    </section>
  )
}

export default Dashboard

{/* {expenses.filter(e => e.title.toUpperCase().includes(searchvalue)).map( (expense, index) => <Card key = {index} category={expense.category} title={expense.title} date={expense.date} amount={expense.amount}/>)} */}
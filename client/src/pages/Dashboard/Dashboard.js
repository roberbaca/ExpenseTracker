import React, {useState} from 'react'
import Card from '../../components/Card/Card'
import Modal from '../../components/Modal/Modal'
import '../../styles/Dashboard.css';
import '../../styles/Global.css';
import { AiOutlinePlus } from 'react-icons/ai';

const Dashboard = () => {

    const [searchvalue, setSearchValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState('');
    const [isModalOpen, setModalIsOpen] = useState(false);

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

    const handleSearch = (e) => {
        setSearchValue(e.target.value.toUpperCase());
    }

    const handleDropdown = (e) => {
        setDropdownValue(e.target.value);    
    }    

    const addExpense = () => {
        setModalIsOpen(true);        
    }

  return (
    <section className='dashboard__section'>
    
        <div className='search__wraper'>
            
            <input type="text" placeholder='Search Expenses' className='searchbar' onChange={handleSearch}/>
            <select className='select' onChange={handleDropdown}>
                <option value = "All">All</option>         
            { categories.map ( (category, index) => (
                    <option key = {index} value = {category.title}>{category.title}</option>                     
                ))}
            </select>

        </div>

        <div>
            <p className='dashboard__info'>You've spent $ 4740,24 in a total of 2 expenses</p>
        </div>
        <div className='cards__container'>   

        { expenses.filter(e => dropdownValue === "All" ?
            e.title.toUpperCase().includes(searchvalue) : 
            e.title.toUpperCase().includes(searchvalue) && e.category === dropdownValue).map( (e, index) => (
                <Card key = {index} category={e.category} title={e.title} date={e.date} amount={e.amount}/>))
        }
          
        </div>

        <div className='add__wraper'>
            <AiOutlinePlus className='add__icon' onClick={addExpense}/>
        </div>




        {/* Pop Ups (Modal) */}        
      <Modal open={isModalOpen} onClose={() => setModalIsOpen(false)}>
        { <div>
            <h1>Add Expense</h1>
        </div>}        
      </Modal>


        
    </section>
  )
}

export default Dashboard

{/* {expenses.filter(e => e.title.toUpperCase().includes(searchvalue)).map( (expense, index) => <Card key = {index} category={expense.category} title={expense.title} date={expense.date} amount={expense.amount}/>)} */}
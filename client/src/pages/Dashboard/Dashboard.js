import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card'
import AddExpenseModal from '../../components/Modals/AddExpenseModal'
import '../../styles/Dashboard.css';
import '../../styles/Global.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { getTotalBalanceAction, getCategoryBalanceAction, showAllExpensesAction } from '../../Redux/slices/expenses';
import { showAllCategoriesAction } from '../../Redux/slices/category';
import { format, parseISO } from 'date-fns'


const Dashboard = () => {

    const [searchvalue, setSearchValue] = useState('');
    const [dropdownValue, setDropdownValue] = useState("All");
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [isSortedBy, setIsSortedBy] = useState("date");   
    const [sortedExpenses, setSortedExpenses] = useState([]); 

    const dispatch = useDispatch(); 

    const token  = useSelector(store => store.auth.token); 
    const expenses  = useSelector(store => store.expenses.expensesList); 
    const totalBalance  = useSelector(store => store.expenses.totalBalance); 
    const categoryBalance  = useSelector(store => store.expenses.categoryBalance); 
    const categories = useSelector(store => store.category.categoriesList);

    const handleSearch = (e) => {
        setSearchValue(e.target.value.toUpperCase());
    }

    const handleDropdown = (e) => {
        let categoryId = e.target.value;           
        setDropdownValue(categoryId); 
        if (categoryId !== "All") {
            dispatch( getCategoryBalanceAction( categoryId, token) );                
        }           
    }    

    const handleOnChange = (e) => {
        setIsChecked(!isChecked);
        setIsSortedBy(e.target.value);              
    };


    const addExpense = () => {
        setModalIsOpen(true);        
    } 

    useEffect(() => {
        if (token) {
            dispatch( showAllExpensesAction(token) );   
            dispatch( getTotalBalanceAction(token) ); 
            dispatch( showAllCategoriesAction() );                                
        }
    }, [token])
    

    useEffect(() => {        
        setSortedExpenses([...expenses]);  
        dispatch( getTotalBalanceAction(token) ); 
        handleDropdown({target: {value: dropdownValue}});  
        dispatch( showAllExpensesAction(token) );          
    }, [JSON.stringify(expenses)])


  return (
    <section className='dashboard__section'>       
    
        <div className='search__wraper'>            
            <input type="text" placeholder='Search Expenses' className='searchbar' onChange={handleSearch}/>
            <div className='select__wraper'>
                <p className='sort__title'>Sort by Category</p>
                <select className='select' onChange={handleDropdown}>
                    <option value = "All">All</option>         
                { categories?.map ( (category, index) => (
                        <option key = {index} value = {category.id} id={category.id}>{category.title}</option>                     
                    ))}
                </select>
            </div>
            <div className='sort__wraper'>
                <p className='sort__title'>Sort by:</p>
                <div className='sort__checkboxwraper'>
                    <div className='checkbox__wraper'>
                        <input type="checkbox" id='amount' value={"amount"} className="sort__checkbox" checked={!isChecked} onChange={handleOnChange}/>
                        <label htmlFor="amount" className='checkbox__label'>Amount</label>
                    </div>
                    <div className='checkbox__wraper'>
                        <input type="checkbox" id='date' value={"date"} className="sort__checkbox" checked={isChecked} onChange={handleOnChange}/>
                        <label htmlFor="date" className='checkbox__label'>Date</label>
                    </div>
                </div>
            </div>            
        </div>

        <div className='dashboard__amountsummary'>
            {dropdownValue === "All" && <p className='dashboard__info'>You've spent {totalBalance} in a total of {expenses?.length} expenses</p>}
            {dropdownValue !== "All" && <p className='dashboard__info'>Amount spent in {categories[dropdownValue -1]?.title}: {categoryBalance}</p>}            
        </div>

        <div className='cards__container'>   
            {  isSortedBy === "date" ? 
                [...expenses].sort((d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()).filter(e => dropdownValue === "All" ?
                    e.title.toUpperCase().includes(searchvalue) : 
                    e.title.toUpperCase().includes(searchvalue) && e.categoryId == dropdownValue).map( (e, index) => (
                        <Card key = {index} id={e.id} category={ categories[e.categoryId - 1]?.title } title={e.title} date={ format(parseISO(e.date), 'yyyy-MM-dd') } amount={e.amount} />)):
                [...expenses].sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount)).filter(e => dropdownValue === "All" ?
                    e.title.toUpperCase().includes(searchvalue) : 
                    e.title.toUpperCase().includes(searchvalue) && e.categoryId == dropdownValue).map( (e, index) => (
                        <Card key = {index} id={e.id} category={ categories[e.categoryId - 1]?.title} title={e.title} date={ format(parseISO(e.date), 'yyyy-MM-dd') } amount={e.amount} />))
            }    
        </div>

        <div className='add__wraper'>
            <AiOutlinePlus className='add__icon' onClick={addExpense}/>
        </div>

        {/* Pop Ups (Modal) */}        
        <AddExpenseModal open={isModalOpen} onClose={() => setModalIsOpen(false)}></AddExpenseModal>      
        
    </section>
  )
}

export default Dashboard



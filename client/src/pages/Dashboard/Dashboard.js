import React from 'react'
import Card from '../../components/Card/Card'
import '../../styles/Dashboard.css';
import '../../styles/Global.css';
import { AiOutlinePlus } from 'react-icons/ai';

const Dashboard = () => {
  return (
    <section className='dashboard__section'>
    
        <div className='search__wraper'>
            
            <input type="text" placeholder='Search Expenses' className='searchbar'/>
            <select name="" id="" className='select'>
                <option value="0">All</option>
                <option value="1">Category 1</option> 
                <option value="1">Category 2</option>            
            </select>
        </div>

        <div>
            <p className='dashboard__info'>You've spent $ 4740,24 in a total of 2 expenses</p>
        </div>
        <div className='cards__container'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>

        <div className='add__wraper'>
                <AiOutlinePlus className='add__icon'/>
            </div>
        
    </section>
  )
}

export default Dashboard
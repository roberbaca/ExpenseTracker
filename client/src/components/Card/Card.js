import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditExpenseModal from "../../components/Modals/EditExpenseModal";
import "../../styles/Card.css";
import "../../styles/Global.css";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { format, parseISO } from "date-fns";
import { deleteExpenseAction, updateExpenseAction } from "../../Redux/slices/expenses";
import moment from "moment";

const Card = ({ id, category, title, date, amount }) => {
  const categories = useSelector((store) => store.category.categoriesList);
  const token = useSelector((store) => store.auth.token);

  const [isEditExpenseModalOpen, setEditExpenseModalIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newAmount, setNewAmount] = useState(amount);
  const [newCategory, setNewCategory] = useState(category);
  const [newDate, setNewDate] = useState(date);

  const dispatch = useDispatch();

  const deleteExpense = () => {
    dispatch(deleteExpenseAction(id, token));
  };

  const editExpense = () => {
    setEditExpenseModalIsOpen(true);
    dispatch(updateExpenseAction(id, newDate, newTitle, newAmount, newCategory, token));
    setEditExpenseModalIsOpen(false);
  };

  const handleChangeCategory = (e) => {
    setNewCategory(parseInt(e.target.value));
  };

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setNewAmount(+e.target.value);
  };

  const handleChangeDate = (e) => {
    let myDate = moment.utc(e.target.value).format("YYYY-MM-DD");    
    setNewDate(myDate);
  };

  return (
    <div className="card__wraper">
      <div className="icons__wraper">
        <div className="card__icons">
          <FiEdit
            className="card__icon--edit"
            onClick={() => setEditExpenseModalIsOpen(true)}
          />
          <AiOutlineClose
            className="card__icon--delete"
            onClick={deleteExpense}
          />
        </div>
      </div>
      <div className="title__container">
        <h2 className="card__category">{category}</h2>
        <h1 className="card__title">{title}</h1>
        <p className="card__date">
          {moment(date).add(1, "d").format("DD/MM/YY")}
        </p>
      </div>
      <p className="card__amount">$ {amount}</p>

      <EditExpenseModal
        open={isEditExpenseModalOpen}
        onClose={() => setEditExpenseModalIsOpen(false)}
      >
        <div className="modal__body">
          <select
            className="select"
            onChange={handleChangeCategory}
            value={category?.id}
            required
          >
            <option selected disabled hidden>
              Select Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <input
            className="modal__input"
            type="text"
            placeholder="Title"
            defaultValue={title}
            onChange={handleChangeTitle}
            required
          />
          <input
            className="modal__input"
            type="number"
            placeholder="Amount"
            defaultValue={amount}
            onChange={handleChangeAmount}
            required
          />
          <input
            className="modal__input"
            type="date"
            placeholder="Date"
            defaultValue={format(parseISO(date), "yyyy-MM-dd")}
            onChange={handleChangeDate}
            required
          />          
          <button className="modal__btn" type="button" onClick={editExpense}>
            Submit
          </button>
        </div>
      </EditExpenseModal>
    </div>
  );
};

export default Card;

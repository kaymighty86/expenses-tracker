import './App.css';
import {useState} from "react";
import ExpensesListDisplay from "./components/expensesUI/expensesListDisplay";
import NewExpense from "./components/newExpenseUI/newExpense";

import default_expenses from './data/defaultExpenses';
import logoImage from './assets/expenses.png';

function App() {
  //GET DATA FROM LOCAL STORAGE (if it doesn't exist, just use default expenses then)
  const existing_data = JSON.parse(localStorage.getItem('expenses')) || default_expenses;

  const [expenses, setExpenses] = useState(existing_data);

  function saveDataInStorage(data) {
    localStorage.setItem('expenses', JSON.stringify(data));//save the data in local storage
  }

  const addToExpenses = (expenseObject) => {
    //update the expenses state. And since its an async function, its best to get the previous array from the created state
    setExpenses((prevExpenses)=>{//the passed parameter in the anonymous function holds the previous state
      //first add an attibute "id" to the passed expense object. It is needed by the list displayer
      const expense_withID = {id: `e${Math.random()}`, ...expenseObject}
      const updatedExpenses = [expense_withID, ...prevExpenses];

      saveDataInStorage(updatedExpenses);

      return updatedExpenses;//return this final expenses array as the new state of the array
    });
  }

  const deleteExpenseItem = (id) => {
    setExpenses(prevExpenses => {
      let updatedExpenses = [...prevExpenses];
      updatedExpenses.splice(expenses.findIndex(item=>item.id === id), 1);

      saveDataInStorage(updatedExpenses);

      return updatedExpenses;
    });
  }

  return (
    <div className="App">
      <div className='appLogo'>
        <img src={logoImage} alt="expenses tracker logo"/>
        <h3>Expenses Tracker</h3>
      </div>
      <NewExpense onSaveExpense={(data)=>{addToExpenses(data)}}/>
      <ExpensesListDisplay expenses={expenses} onItemDelete={deleteExpenseItem} />
    </div>
  );
}

export default App;

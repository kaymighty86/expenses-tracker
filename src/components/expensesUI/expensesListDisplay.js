import {useState} from "react";
import "./expensesListDisplay.css";
import Card from "../generalUI/card";
import ExpenseItem from "./expenseItem";
import ExpensesGraph from "../expenseGraphUI/expensesGraph";
import ExpensesFilter from "./expensesFilter";

function ExpensesListDisplay({ expenses , onItemDelete}) {
    //generate a filter list based on the years of all the expenses
    let filterList = [];
    for(let c = 0; c < expenses.length; c++){
        let filterItem = new Date (expenses[c].date).getFullYear();

        //if the year has not been added to the list of filter items before, add it
        if(filterList.find(item => (item === filterItem)) === undefined){
            filterList.push(filterItem);
        }
    }
    //sort the filterList
    filterList.sort((a,b)=>(a - b));
    filterList = ["No Filter", ...filterList];//add no-filter option to the list
    //---------------------------------------------------------------

    const [currentFilterValue, setFilterValue] = useState(filterList[0]);//set no_filter as the default filter year

    //filter the expenses by year. However if the current filter variable is set to "no_filter" then just spread/assign the passed array straight-up
    const filteredExpenses = (currentFilterValue === "No Filter")? [...expenses] : expenses.filter((item)=> (new Date(item.date).getFullYear().toString() === currentFilterValue));

    const expense_items = filteredExpenses.map((item) => {
        return (
            <ExpenseItem id={item.id} key={item.id} title={item.title} amount={item.amount} date={item.date} onDelete={onItemDelete}></ExpenseItem>
        );
    });

    const setExpensesFilter = (year) => {
        setFilterValue(year);//update the current yearFilter state
    }

    return (
        <Card className="expenses_list_container">
            <ExpensesFilter filterList={filterList} defaultSelection={filterList.indexOf(currentFilterValue)} onFilterChange={setExpensesFilter}/>
            {filteredExpenses.length > 0 && <ExpensesGraph expenses = {filteredExpenses}/>}
            <div>
                {/* {filteredExpenses.length === 0? <p>No expenses found.</p> : expense_items} */}
                {filteredExpenses.length === 0 && <p style={{color: "white"}}>No expenses found.</p>/*this is a kind of ternary operator thats only one sided. It returns the expression at the right side of the "&&" symbol if the condition is true*/}
                {filteredExpenses.length > 0 && expense_items /*Check comment above for meaning of the "&&" sign */}
            </div>
        </Card>
    );
}

export default ExpensesListDisplay;
import { useState } from "react";

import "./newExpense.css";
import Card from "../generalUI/card";

const NewExpense = (Props) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [isFormVisible, setFormVisibility] = useState(false);//by default the expense add form should not be vsible until user clicks the button to add expense

    const expenseInputHandler = (inputType, value) => {
        switch (inputType) {
            case "title": setTitle(value);
                break;
            case "amount": setAmount(value);
                break;
            case "date": setDate(value);
        }
    }

    const expenseSubmitHandler = (event) => {
        event.preventDefault();//stop the form submission default action

        const expenseData = {
            title,
            amount: parseFloat(amount),
            date
        }

        Props.onSaveExpense(expenseData);//tell the parent component that we want to add a new expenseData

        //lets clear the form upon submission. This is made easier with the help of the setter function returned by useState(). The state values will then be called in the rendered input components below
        setTitle('');
        setAmount('');
        setDate('');
        showNewExpenseForm(false);
    }

    //when the cancel button on the form is clicked, the onReset event of the form will be invoked since the cancel button is a "reset" type of form input
    const newExpenseForm = (
        <form typeof="GET" id="new_expense_form" onSubmit={expenseSubmitHandler} onReset={event => showNewExpenseForm(false)}>
            <div className="input_field_wrapper">
                <label htmlFor="expenseTitleInput">Title</label>{/*the "htmlFor" attibute is the react version of the "for" attribute in native html */}
                <input id="expenseTitleInput" type="text" name="expense_title" value={title} onChange={(event) => { expenseInputHandler('title', event.target.value) }} required />
            </div>
            <div className="input_field_wrapper">
                <label htmlFor="expenseAmountInput">Amount</label>
                <input id="expenseAmountInput" type="number" name="expense_amount" min="0.01" step="0.01" value={amount} onChange={(event) => { expenseInputHandler('amount', event.target.value) }} required />
            </div>
            <div className="input_field_wrapper">
                <label htmlFor="expenseDateInput">Date</label>
                <input id="expenseDateInput" type="date" name="expense_date" value={date} onChange={(event) => { expenseInputHandler('date', event.target.value) }} required />
            </div>
            <div className="submit_button_wrapper">
                <input type="reset" value="Cancel" />
                <input type="submit" value="Add Expense" />
            </div>
        </form>
    );

    const showNewExpenseForm = (visible) => {
        setFormVisibility(visible);
    }

    return (
        <Card className="new_expense_form_container">
            {/* if the form is not meant to be visible just display a button to make it visible */}
            {isFormVisible? newExpenseForm : (<div className="create_expense_button_wrapper">
                                                <button onClick={event => showNewExpenseForm(true)}>Add New Expense</button>
                                            </div>)
            }
        </Card>
    );
}

export default NewExpense;
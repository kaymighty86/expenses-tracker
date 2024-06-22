import "./expenseItem.css";
import Card from "../generalUI/card.js";
import DateViewComponent from "./expenseDate";

export default function ExpenseItem(Props) {

    function handleDelete(){
        Props.onDelete(Props.id);
    }

    return (
        <Card className="expense_item_container">
            <div>
                <DateViewComponent date={new Date(Props.date)}/>
                <p className="expense_item_name">{Props.title}</p>
            </div>
            <div>
                <p className="expense_item_price">{"₦" + Props.amount}</p>
                <button onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
            </div>
            
        </Card>
    );
}
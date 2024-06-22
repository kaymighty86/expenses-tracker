import "./expenseDate.css";

function DateViewComponent({ date }) {//we have deconstructed the Props attributes straightup to make it easier to access the various properties passed
    
    //Lets breakup the date to extract the day, month, and year becuase we will be displaying the expense date as styled calendar
    const month = date.toLocaleString("en-US", { month: "short" });//this function return the date based on the langage and format of the date. In this case it will return the full name of the month
    const day = date.toLocaleString("en-US", { day: "2-digit" });///Same as above. In this case it will return the day of the month (number). Another function is .getDay();
    const year = date.getFullYear();

    return (
        <div className="expense_item_date">
            <p>{month}</p>
            <p>{year}</p>
            <p>{day}</p>
        </div>
    );
}

export default DateViewComponent;
import "./expensesGraph.css";
import Card from "../generalUI/card";
import FilledBar from "./filledBar";

const ExpenseGraph = ({expenses}) => {
    const monthsOfTheYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const totalAmountsPerMonth = new Array(12).map(item=>(0));//total amounts for each month willl be stored seperately based on the month. The default value is 0

    for(let c = 0; c < totalAmountsPerMonth.length; c++){
        totalAmountsPerMonth[c] = expenses.filter(item=>(new Date(item.date).getMonth() === c)).reduce((acc, item)=>(acc += item.amount),0);
    }

    const max_amount = Math.max(...totalAmountsPerMonth) + 100;

    const allFilledBarItems = totalAmountsPerMonth.map((monthAmount, id)=>{
        return (
            <span className="graphBarItem" key={"m"+id}>
                <FilledBar fillValue = {`${monthAmount/max_amount}`} />
                <p>{monthsOfTheYear[id]}</p>{/* get the corresponding month name using the index of the current item */}
            </span>
        );
    }); 

    return (
        <Card className="graphContainer">
            {allFilledBarItems}
        </Card>
    );
}

export default ExpenseGraph;
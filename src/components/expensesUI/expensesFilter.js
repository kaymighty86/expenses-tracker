import "./expensesFilter.css";

const ExpensesFilter = ({filterList, defaultSelection, onFilterChange}) => {
    const filterChangeHandler = (event) => {
        onFilterChange(event.target.value); //the asynchrous setYear() function is causing a lag in the selected value hence i'm passing the value directly
    };

    return(
        <div className="filter_component_wrapper">
            <label>Filter by year</label>
            <select name="filter_by_year" onChange={filterChangeHandler}>
                {filterList.map((filterItem, id) => (
                    <option key={`filteritem${id}`} value={filterItem}>{filterItem}</option>
                ))}
            </select>
        </div>
    );
}

export default ExpensesFilter;
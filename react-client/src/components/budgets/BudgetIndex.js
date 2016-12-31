import React from 'react'
import { Link, browserHistory } from 'react-router'
import MonthSelector from '../simple/MonthSelector'
import YearSelector from '../simple/YearSelector'

const rangeStartDate = {}
const rangeEndDate = {}

const handleSubmit = (event) => {
    event.preventDefault()
    const url = `/budgets/view/from/${rangeStartDate.month.value}/${rangeStartDate.year.value}/to/${rangeEndDate.month.value}/${rangeEndDate.year.value}`
    browserHistory.push(url)
}

const BudgetIndex = () => (
    <div>
        <h2>Budget Index</h2>
        <ul>
            <li>
                <Link to="/budgets/create">Create New Budget</Link>
            </li>
            <li>
                <Link to="/budgets/edit">Edit Current Budget</Link>
            </li>
            <li>
                <Link to="/budgets/current">View Report - This Month</Link>
            </li>
            <li>
                View Report for Range:
                <form className="range-selector-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="month-year-selector">
                            Start:
                            <MonthSelector keyPrefix="range-start-month" attachRefTo={rangeStartDate} />
                            <YearSelector keyPrefix="range-start-year" attachRefTo={rangeStartDate} startYear={2016} endYear={2017} />
                        </div>
                    </fieldset>
                    -
                    <fieldset>
                        <div className="month-year-selector">
                            End:
                            <MonthSelector keyPrefix="range-end-month" attachRefTo={rangeEndDate} />
                            <YearSelector keyPrefix="range-end-year" attachRefTo={rangeEndDate} startYear={2016} endYear={2017} />
                        </div>
                    </fieldset>
                    <button type="submit" name="submit">Submit</button>
                </form>
            </li>
        </ul>

    </div>
)

export default BudgetIndex

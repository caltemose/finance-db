import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const BudgetIndex = () => (
    <div>
        <h2>Budget Index</h2>
        <ul>
            <li>
                <Link to="/budget/create">Create New Budget</Link>
            </li>
            <li>
                <Link to="/budget/edit">Edit Current Budget</Link>
            </li>
            <li>
                <Link to="/budget/current">View Report - This Month</Link>
            </li>
            <li>
                View Report for Range:
                <form className="range-selector-form">
                    <fieldset>
                        <select name="range-start-month">
                            <option value="0">January</option>
                            <option value="1">February</option>
                        </select>
                        <select name="range-start-year">
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                        </select>
                    </fieldset>
                    -
                    <fieldset>
                        <select name="range-end">
                            <option value="0">January</option>
                            <option value="1">February</option>
                        </select>
                        <select name="range-start-year">
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                        </select>
                    </fieldset>
                    <button type="submit" name="submit">Submit</button>
                </form>
            </li>
        </ul>

    </div>
)

export default BudgetIndex

import React from 'react'
import { Link } from 'react-router'
import { prettyAmount } from '../../helpers'

const calculateRemainder = (income, expenses, decimals = 2) => (
    prettyAmount(income - expenses)
)

const calculateBudgetDifference = (limit, spent) => {
    // spent is already negative hence no subtraction
    const diff = limit + spent
    const display = prettyAmount(diff)
    if (diff < 0) {
        return <span className="negative">{display}</span>
    } else {
        return <span>{display}</span>
    }
}

const BudgetView = ({ reports }) => (
    <div>
        <h2>Budget Report Viewer</h2>
        <ul className="budget-reports">
            {Object.keys(reports).map(month => (
                <li key={month} className="budget-month">
                    <h3>{reports[month].month} {reports[month].year}</h3>
                    <ul className="budget-month-categories">
                        <li className="budget-header">
                            <span className="budget-month-category-name">Category</span>
                            <span className="budget-month-category-total">Total</span>
                            <span className="budget-month-category-limit">Limit</span>
                            <span className="budget-month-category-diff">Diff</span>
                        </li>
                        {Object.keys(reports[month].categories).map(categoryId => {
                            const category = reports[month].categories[categoryId]

                            let classes = ''
                            const diff = category.budgetLimit - Math.abs(Math.round(category.totalSpent))

                            if (diff < 0) {
                                classes = 'over-budget'
                            } else if (diff > 0) {
                                classes = 'under-budget'
                            }

                            return (
                                <li key={categoryId} className={classes}>
                                    <span className="budget-month-category-name">{category.categoryName}</span>
                                    <span className="budget-month-category-total">{prettyAmount(category.totalSpent)}</span>
                                    <span className="budget-month-category-limit">{category.budgetLimit}</span>
                                    <span className="budget-month-category-diff">{diff}</span>
                                </li>
                            )
                        })}
                        <li className="budget-footer">
                            <h4>TOTAL INCOME:</h4> <span className="total-income">{prettyAmount(reports[month].totalIncome)}</span>
                            <br />
                            <h4>TOTAL EXPENSES:</h4> <span className="total-expenses">{prettyAmount(reports[month].totalExpenses)}</span>
                            <br />
                            <h4>REMAINDER:</h4> <span className="total-remainder">{calculateRemainder(reports[month].totalIncome, reports[month].totalExpenses)}</span>
                            <hr />
                            <h4>TOTAL BUDGET LIMIT:</h4> <span>{prettyAmount(reports[month].totalBudgetLimit)}</span>
                            <br />
                            <h4>TOTAL BUDGET SPENT:</h4> <span>{prettyAmount(reports[month].totalBudgetSpent)}</span>
                            <br />
                            <h4>DIFFERENCE:</h4> {calculateBudgetDifference(reports[month].totalBudgetLimit, reports[month].totalBudgetSpent)}
                            <hr />
                            <h4>UNBUDGETED:</h4>
                            <span>{prettyAmount(reports[month].transactionsNotInBudget.items.length, 0)}&nbsp; / &nbsp;{prettyAmount(reports[month].transactionsNotInBudget.totalSpent)}</span>
                            <br />
                            <h4>UNKNOWN CATEGORIES:</h4>
                            <span>{prettyAmount(reports[month].transactionsUnknownCategories.items.length, 0)}&nbsp; / &nbsp;{prettyAmount(reports[month].transactionsUnknownCategories.totalSpent)}</span>
                        </li>

                        <li className="transactions-not-in-budget">
                            <h3>Not In Budget</h3>
                            <ul>
                                {reports[month].transactionsNotInBudget.items.map(item => (
                                    <li key={item._id}>
                                        <span className="item-amount">{item.amount}</span>
                                        <Link to={`/transactions/${item._id}`}><span className="item-payee">{item.payee}</span></Link>
                                        <span className="item-description">{item.description}</span>
                                        <Link to={`/transactions/by-category/${item.category}`}><span className="item-category">{item.category}</span></Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="transactions-unknown-categories">
                            <h3>Unknown Categories</h3>
                            <ul>
                                {reports[month].transactionsUnknownCategories.items.map(item => (
                                    <li key={item._id}>
                                        <span className="item-amount">{item.amount}</span>
                                        <Link to={`/transactions/${item._id}`}><span className="item-payee">{item.payee}</span></Link>
                                        <span className="item-description">{item.description}</span>
                                        <Link to={`/transactions/by-category/${item.category}`}><span className="item-category">{item.category}</span></Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    </div>
)

export default BudgetView

/*
<span className="amount">{transaction.amount}</span>
<span className="payee">{transaction.payee}</span>
<span className="category">{transaction.category}</span>
 */

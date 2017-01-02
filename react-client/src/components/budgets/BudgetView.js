import React from 'react'

const prettyAmount = amount => (
    Math.abs( Number(amount).toFixed(0) )
)

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
                        </li>
                        {Object.keys(reports[month].categories).map(categoryId => {
                            const category = reports[month].categories[categoryId]
                            let classes = ''
                            if (Math.abs(category.totalSpent) > category.budgetLimit) {
                                classes = 'over-budget'
                            }
                            return (
                                <li key={categoryId} className={classes}>
                                    <span className="budget-month-category-name">{category.categoryName}</span>
                                    <span className="budget-month-category-total">{prettyAmount(category.totalSpent)}</span>
                                    <span className="budget-month-category-limit">{category.budgetLimit}</span>
                                </li>
                            )
                        })}
                        <li className="budget-footer">
                            <h4>TOTAL INCOME:</h4> <span className="total-income">{prettyAmount(reports[month].totalIncome)}</span>
                            <br />
                            <h4>TOTAL EXPENSES:</h4> <span className="total-expenses">{prettyAmount(reports[month].totalExpenses)}</span>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    </div>
)

export default BudgetView
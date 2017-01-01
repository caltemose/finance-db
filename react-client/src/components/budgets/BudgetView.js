import React from 'react'

const prettyAmount = amount => (
    Math.abs( Number(amount).toFixed(0) )
)
const BudgetView = ({ reports }) => (
    <div>
        <h2>Budget Report Viewer</h2>
        <ul>
            {Object.keys(reports).map(month => (
                <li key={month}>
                    {month}
                    <ul>
                        {Object.keys(reports[month].categories).map(categoryId => {
                            const category = reports[month].categories[categoryId]
                            let classes = ''
                            if (Math.abs(category.totalSpent) > category.budgetLimit) {
                                classes = 'over-budget'
                            }
                            return (
                                <li key={categoryId} className={classes}>
                                    {category.categoryName} = {prettyAmount(category.totalSpent)} ({category.budgetLimit})
                                </li>
                            )
                        })}
                    </ul>
                </li>
            ))}
        </ul>
    </div>
)

export default BudgetView

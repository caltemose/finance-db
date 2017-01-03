import React, { PropTypes } from 'react'
import EditableTransaction from './EditableTransaction'

const TransactionsList = ({ transactions, editTransaction, categories }) => {
    if (transactions.allIds.length) {
        // create index of categories by name to facilitate quick lookups
        const categoriesByName = {}
        categories.allIds.forEach(id => {
            const category = categories.byId[id]
            categoriesByName[category.category] = category
        })

        const addBudgetStatus = transaction => {
            const category = categoriesByName[transaction.category]
            return !category ? false : category.inBudget
        }

        return (
            <div>
                <h2>Transactions List</h2>
                <ul className="transaction-list">
                    {transactions.allIds.map(id => {
                        let transaction = transactions.byId[id]
                        transaction.inBudget = addBudgetStatus(transaction)
                        return <EditableTransaction key={transaction._id} transaction={transaction} editTransaction={editTransaction} />
                    })}
                </ul>
            </div>
        )
    } else {
        return <div><h2>Transactions List</h2></div>
    }
}

TransactionsList.propTypes = {
    transactions: PropTypes.object.isRequired,
    editTransaction: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired
}

export default TransactionsList

import React, { PropTypes } from 'react'

const TransactionsList = ({ transactions }) => (
    <div>
        <h2>Transactions List</h2>
        <ul>
            {transactions.allIds.map(id => {
                const transaction = transactions.byId[id]
                return (
                    <li key={transaction._id}>
                        {transaction.date} ::
                        {transaction.amount} ::
                        {transaction.payee} ::
                        {transaction.category} ::
                        {transaction.account}
                    </li>
                )
            })}
        </ul>
    </div>
)

TransactionsList.propTypes = {
    transactions: PropTypes.object.isRequired
}

export default TransactionsList

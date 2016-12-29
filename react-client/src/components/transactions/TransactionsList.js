import React, { PropTypes } from 'react'
import moment from 'moment'

const prettyDate = dateStamp => (
    moment(dateStamp).format('YYYY/MM/DD')
)

const prettyAmount = amount => (
    Number(amount).toFixed(2)
)

const TransactionsList = ({ transactions }) => (
    <div>
        <h2>Transactions List</h2>
        <ul className="transaction-list">
            {transactions.allIds.map(id => {
                const transaction = transactions.byId[id]
                const classes = transaction.amount > 0 ? 'transaction deposit' : 'transaction'
                return (
                    <li key={transaction._id} className={classes}>
                        <span className="transaction-date">{prettyDate(transaction.date)}</span>
                        <span className="transaction-amount">{prettyAmount(transaction.amount)}</span>
                        <span className="transaction-payee">{transaction.payee}</span>
                        <span className="transaction-category">{transaction.category}</span>
                        <span className="transaction-account">{transaction.account}</span>
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

import React, { PropTypes } from 'react'
import EditableTransaction from './EditableTransaction'

const TransactionsList = ({ transactions, editTransaction }) => (
    <div>
        <h2>Transactions List</h2>
        <ul className="transaction-list">
            {transactions.allIds.map(id => {
                const transaction = transactions.byId[id]
                return <EditableTransaction key={transaction._id} transaction={transaction} editTransaction={editTransaction} />
            })}
        </ul>
    </div>
)

TransactionsList.propTypes = {
    transactions: PropTypes.object.isRequired,
    editTransaction: PropTypes.func.isRequired
}

export default TransactionsList

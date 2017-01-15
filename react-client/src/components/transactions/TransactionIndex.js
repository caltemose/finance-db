import React from 'react'
import DocumentTitle from 'react-document-title'
import RangeForm from '../RangeForm'

const TransactionIndex = () => (
    <DocumentTitle title="FDB: Transactions">
        <div>
            <h2>Transaction Index</h2>
            <ul>
                <li>
                    View Transaction Range:
                    <RangeForm urlPrefix="/transactions" keyPrefix="transaction-range" />
                </li>
            </ul>
        </div>
    </DocumentTitle>
)

export default TransactionIndex

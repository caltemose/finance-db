import React from 'react'
import DocumentTitle from 'react-document-title'
import RangeForm from '../RangeForm'
import MonthLinks from '../simple/MonthLinks'

const TransactionIndex = () => (
    <DocumentTitle title="FDB: Transactions">
        <div>
            <h2>Transaction Index</h2>
            <ul>
                <li>
                    View Transaction Range:
                    <RangeForm urlPrefix="/transactions" keyPrefix="transaction-range" />
                </li>
                <li>
                    Recent Transactions by Month:
                    <MonthLinks count={4} prefix='/transactions' />
                </li>
            </ul>
        </div>
    </DocumentTitle>
)

export default TransactionIndex

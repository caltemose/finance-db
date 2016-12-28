import React from 'react'
// import { Link } from 'react-router'
import RangeForm from '../RangeForm'

const TransactionIndex = () => (
    <div>
        <h2>Transaction Index</h2>
        <ul>
            <li>
                View Transaction Range:
                <RangeForm urlPrefix="/transactions" keyPrefix="transaction-range" />
            </li>
        </ul>
    </div>
)

export default TransactionIndex

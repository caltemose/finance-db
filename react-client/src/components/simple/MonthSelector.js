import React, { PropTypes } from 'react'

export const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

const MonthSelector = ({ keyPrefix, attachRefTo }) => (
    <select ref={(input) => attachRefTo.month = input}>
        {MONTHS.map((month, i) => (
            <option value={i+1} key={`${keyPrefix}-${i}`}>{month}</option>
        ))}
    </select>
)

MonthSelector.propTypes = {
    keyPrefix: PropTypes.string.isRequired,
    attachRefTo: PropTypes.object.isRequired
}

export default MonthSelector

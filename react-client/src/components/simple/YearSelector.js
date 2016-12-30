import React, { PropTypes } from 'react'

const YearSelector = ({ keyPrefix, attachRefTo, startYear, endYear }) => {
    if (!startYear) {
        startYear = new Date().getFullYear()
    }

    if (!endYear) {
        endYear = startYear
    } else {
        if (startYear > endYear) {
            endYear = startYear
        }
    }

    let years = []
    for(let i=startYear; i<=endYear; i++) {
        years.push(i)
    }

    return (
        <select ref={(input) => attachRefTo.year = input}>
            {years.map(year => (
                <option value={year} key={`${keyPrefix}-${year}`}>{year}</option>
            ))}
        </select>
    )
}


YearSelector.propTypes = {
    keyPrefix: PropTypes.string.isRequired,
    attachRefTo: PropTypes.object.isRequired,
    startYear: PropTypes.number,
    endYear: PropTypes.number
}

export default YearSelector

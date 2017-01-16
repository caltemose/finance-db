import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'

const getMonths = (count) => {
    let months = []
    for(var i=0; i<count; i++) {
        let report = {}
        const now = moment()
        let monthDate = now.subtract(i, 'months')
        report.month = monthDate.format('MM')
        report.year = monthDate.format('YYYY')
        report.pretty = monthDate.format('MMMM YYYY')
        months.push(report)
    }
    return months
}

const MonthLinks = ({ count, prefix }) => (
    <nav>
        {getMonths(count).map( (month, i) => {
            return (
                <Link
                    key={`month-link-${i}`}
                    to={`${prefix}/from/${month.month}/${month.year}/to/${month.month}/${month.year}`}>
                    {month.pretty}
                </Link>
            )
        })}
    </nav>
)

MonthLinks.propTypes = {
    count: PropTypes.number.isRequired,
    prefix: PropTypes.string.isRequired
}

export default MonthLinks

/*

`/budgets/view/from/${report.startMonth}/${report.startYear}/to/${report.startMonth}/${report.startYear}`

CONCATENATION PATTERN:

prefix = /budgets/view
/from/
${month}
/
${year}
/to/
${month}
/
${year}


this format should change so there's only a prefix like so:
`/budgets/month/${month}/${year}`

but requires new routes and updated components
*/

import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import moment from 'moment'

import MonthSelector from '../simple/MonthSelector'
import YearSelector from '../simple/YearSelector'

class BudgetIndex extends Component {
    static propTypes = {
        budgets: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.rangeStartDate = {}
        this.rangeEndDate = {}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (event) {
        event.preventDefault()
        const { rangeStartDate, rangeEndDate } = this
        const url = `/budgets/view/from/${rangeStartDate.month.value}/${rangeStartDate.year.value}/to/${rangeEndDate.month.value}/${rangeEndDate.year.value}`
        browserHistory.push(url)
    }

    render () {
        let recentReports = []
        for(var i=0; i<4; i++) {
            let report = {}
            const now = moment()
            let monthDate = now.subtract(i, 'months')
            report.startMonth = monthDate.format('MM')
            report.startYear = monthDate.format('YYYY')
            report.prettyDate = monthDate.format('MMMM YYYY')
            recentReports.push(report)
        }

        return (
            <div>
                <h2>Budget Index</h2>
                <ul>
                    <li>
                        <Link to="/budgets/create">Create New Budget</Link>
                    </li>
                    <li>
                        View Report for Range:
                        <form className="range-selector-form" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="month-year-selector">
                                    Start:
                                    <MonthSelector keyPrefix="range-start-month" attachRefTo={this.rangeStartDate} />
                                    <YearSelector keyPrefix="range-start-year" attachRefTo={this.rangeStartDate} startYear={2016} endYear={2017} />
                                </div>
                            </fieldset>
                            -
                            <fieldset>
                                <div className="month-year-selector">
                                    End:
                                    <MonthSelector keyPrefix="range-end-month" attachRefTo={this.rangeEndDate} />
                                    <YearSelector keyPrefix="range-end-year" attachRefTo={this.rangeEndDate} startYear={2016} endYear={2017} />
                                </div>
                            </fieldset>
                            <button type="submit" name="submit">Submit</button>
                        </form>
                    </li>
                    <li>
                        <nav>Monthly Reports: &nbsp;
                            {recentReports.map((report, i) => (
                                <Link
                                    key={`month-report-${i}`}
                                    to={`/budgets/view/from/${report.startMonth}/${report.startYear}/to/${report.startMonth}/${report.startYear}`}>
                                    {report.prettyDate}
                                </Link>
                            ))}
                        </nav>
                    </li>
                </ul>

                <h2>Budgets</h2>
                <ul>
                    {this.props.budgets.allIds.map(id => {
                        const budget = this.props.budgets.byId[id]
                        return (
                            <li key={id}>
                                <Link to={`/budgets/edit/${id}`}>
                                    {moment(budget.startDate).format('YYYY-MM-DD')}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

            </div>
        )
    }
}

export default BudgetIndex

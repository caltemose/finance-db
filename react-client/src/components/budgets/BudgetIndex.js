import React, { PropTypes, Component } from 'react'
import { Link, browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'
import moment from 'moment'
import MonthLinks from '../simple/MonthLinks'

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
        let url = `/budgets/view/from/${rangeStartDate.month.value}/${rangeStartDate.year.value}/to/${rangeEndDate.month.value}/${rangeEndDate.year.value}`
        if (this.combine) url += '?combine=true'
        browserHistory.push(url)
    }

    render () {
        return (
            <DocumentTitle title="FDB: Budgets">
                <div>
                    <h2>Budget Index</h2>
                    <ul>
                        <li>
                            <Link to="/budgets/create">Create New Budget</Link>
                        </li>
                        <li>
                            Monthly Reports: &nbsp;
                            <MonthLinks count={4} prefix='/budgets/view' />
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

                                <label>
                                    <input type="checkbox" name="combine" ref={(input) => this.combine = input}/> 
                                    combine
                                </label>

                                <button type="submit" name="submit">Submit</button>
                            </form>
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
            </DocumentTitle>
        )
    }
}

export default BudgetIndex

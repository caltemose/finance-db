import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import moment from 'moment'

import MonthSelector from '../simple/MonthSelector'
import YearSelector from '../simple/YearSelector'
import budgetDefaults from '../../ignore/budget-defaults'

class BudgetEditForm extends Component {
    static propTypes = {
        categories: PropTypes.object.isRequired,
        budget: PropTypes.object.isRequired,
        editBudget: PropTypes.func.isRequired,
        editComplete: PropTypes.bool
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputs = {}
        this.startDate = {}
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.editComplete) {
            browserHistory.push('/budgets/')
        }
    }

    handleSubmit (event) {
        event.preventDefault()

        let budgetObject = {
            id: this.props.budget._id,
            createdOn: new Date(),
            startDate: new Date(this.startDate.year.value + '/' + this.startDate.month.value),
            categories: {}
        }

        Object.keys(this.inputs).forEach(key => {
            // omit categories with zero values
            if (Number(this.inputs[key].value) > 0) {
                budgetObject.categories[key] = this.inputs[key].value
            }
        })

        this.props.editBudget(budgetObject)
    }

    getDefaultValue (category) {
        return budgetDefaults[category] || 0
    }

    renderCategory (categoryId, i) {
        const category = this.props.categories.byId[categoryId]
        // map default value to budget's category if it is known
        const defaultValue = this.props.budget.categories[categoryId] || 0
        return (
            <fieldset key={i} data-category-id={categoryId}>
                <label>
                    <input type="number" ref={(input) => this.inputs[category._id] = input} defaultValue={defaultValue} />
                    {category.category}
                </label>
            </fieldset>
        )
    }

    render () {
        const initialized = this.props.budget._id
        if (initialized) {
            const startDate = moment(this.props.budget.startDate)
            const startYear = startDate.format('YYYY')
            const startMonth = startDate.format('MM')
            return (
                <div>
                    <h2>Edit Budget</h2>
                    <form className="budget-create-form" onSubmit={this.handleSubmit}>
                        <div className="month-year-selector">
                            Budget Start:
                            <MonthSelector keyPrefix="range-start-month" attachRefTo={this.startDate} defaultValue={startMonth} />
                            <YearSelector keyPrefix="range-start-year" attachRefTo={this.startDate} startYear={2016} endYear={2017} defaultValue={startYear} />
                        </div>

                        {this.props.categories.allIds.map((categoryId, i) => {
                            return this.renderCategory(categoryId, i)
                        })}

                        <button type="submit">Edit Budget</button>
                    </form>
                </div>
            )

        } else {
            return <div><h2>Loading Budget Data...</h2></div>
        }
    }
}

export default BudgetEditForm

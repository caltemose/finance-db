import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'

import MonthSelector from '../simple/MonthSelector'
import YearSelector from '../simple/YearSelector'
import budgetDefaults from '../../ignore/budget-defaults'

class BudgetCreateForm extends Component {
    static propTypes = {
        categories: PropTypes.object.isRequired,
        categoriesInBudget: PropTypes.array.isRequired,
        createBudget: PropTypes.func.isRequired,
        createComplete: PropTypes.bool
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputs = {}
        this.startDate = {}
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.createComplete) {
            browserHistory.push('/budgets/')
        }
    }

    handleSubmit (event) {
        event.preventDefault()

        let budgetObject = {
            createdOn: new Date(),
            startDate: new Date(this.startDate.year.value + '/' + this.startDate.month.value),
            categories: {}
        }

        Object.keys(this.inputs).forEach(key => {
            budgetObject.categories[key] = this.inputs[key].value
        })

        this.props.createBudget(budgetObject)
    }

    getDefaultValue (category) {
        return budgetDefaults[category] || 0
    }

    renderCategory (categoryId, i) {
        const category = this.props.categories[categoryId]
        const defaultValue = this.getDefaultValue(category.category)
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
        return (
            <DocumentTitle title="FDB: Create Budget">
                <div>
                    <h2>Create a Budget</h2>
                    <form className="budget-create-form" onSubmit={this.handleSubmit}>
                        <div className="month-year-selector">
                            Budget Start:
                            <MonthSelector keyPrefix="range-start-month" attachRefTo={this.startDate} />
                            <YearSelector keyPrefix="range-start-year" attachRefTo={this.startDate} startYear={2016} endYear={2017} />
                        </div>

                        {this.props.categoriesInBudget.map((categoryId, i) => {
                            return this.renderCategory(categoryId, i)
                        })}
                        <button type="submit">Create Budget</button>
                    </form>
                </div>
            </DocumentTitle>
        )
    }
}

export default BudgetCreateForm

import React, { Component, PropTypes } from 'react'
import MonthSelector from '../simple/MonthSelector'
import YearSelector from '../simple/YearSelector'

class BudgetCreateForm extends Component {
    static propTypes = {
        categories: PropTypes.object.isRequired,
        categoriesInBudget: PropTypes.array.isRequired
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputs = {}
        this.startDate = {}
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
    }

    renderCategory (categoryId, i) {
        const category = this.props.categories[categoryId]
        return (
            <fieldset key={i} data-category-id={categoryId}>
                <label>
                    <input type="number" ref={(input) => this.inputs[category._id] = input} defaultValue={i} />
                    {category.category}
                </label>
            </fieldset>
        )
    }

    render () {
        return (
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
        )
    }
}

export default BudgetCreateForm

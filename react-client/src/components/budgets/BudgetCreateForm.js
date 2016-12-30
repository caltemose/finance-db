import React, { Component, PropTypes } from 'react'

class BudgetCreateForm extends Component {
    static propTypes = {
        categories: PropTypes.object.isRequired,
        categoriesInBudget: PropTypes.array.isRequired
    }

    constructor (props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputs = {}
    }

    handleSubmit (event) {
        event.preventDefault()
        let budgetObject = {
            createdOn: new Date(),
            // TODO use values from form
            startDate: new Date(),
            categories: {}
        }

        Object.keys(this.inputs).forEach(key => {
            budgetObject.categories[key] = this.inputs[key].value
        })

        console.log(budgetObject)
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
                    <fieldset>
                        <label>
                            Budget Start Month:
                            [month] [year]
                        </label>
                    </fieldset>

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

import React, { PropTypes, Component } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'


class CategoryList extends Component {
    static propTypes = {
        categories: PropTypes.shape({
            allIds: PropTypes.array.isRequired,
            byId: PropTypes.object.isRequired,
            isFetching: PropTypes.bool.isRequired
        }).isRequired,
        onInBudgetChange: PropTypes.func.isRequired,
        createCategory: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.submitNewCategory = this.submitNewCategory.bind(this)
    }

    setChecked (value) {
        return value ? 'checked' : ''
    }

    submitNewCategory (event) {
        event.preventDefault()
        this.props.createCategory(this.newCategoryName.value, this.newCategoryInBudget.checked)
        this.newCategoryName.value = ''
        this.newCategoryInBudget.checked = false
    }

    render () {
        const { categories, onInBudgetChange } = this.props
        return (
            <DocumentTitle title="Finances: Categories">
                <div>
                    <h2>All Categories</h2>
                    {categories.isFetching ?
                        <p>Loading...</p>
                    :
                        <ul className="category-list">
                            {categories.allIds.map(categoryId => {
                                const category = categories.byId[categoryId]
                                return (
                                    <li key={category._id}>
                                        <Link to={`/transactions/by-category/${category.category}`}>
                                            <h3>{category.category}</h3>
                                        </Link>
                                        <label onChange={() => onInBudgetChange(category._id, category.inBudget)}>
                                            <input type="checkbox" name="in-budget" defaultChecked={this.setChecked(category.inBudget)} />
                                            in Budget?
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    }

                    <form className="add-category-form" onSubmit={this.submitNewCategory}>
                        <h2>Add Category</h2>

                        <input type="text" name="category" ref={(input) => this.newCategoryName = input} />
                        <label>
                            <input type="checkbox" name="in-budget" ref={(input) => this.newCategoryInBudget = input} />
                            in Budget?
                        </label>

                        <button type="submit">Add Category</button>
                    </form>
                </div>
            </DocumentTitle>
        )
    }
}

export default CategoryList

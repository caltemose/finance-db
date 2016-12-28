import React, { PropTypes } from 'react'

const setChecked = (value) => {
    return value ? 'checked' : ''
}

const CategoryList = ({ categories, onInBudgetChange }) => (
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
                            <h3>{category.category}</h3>
                            <label onChange={() => onInBudgetChange(category._id, category.inBudget)}>
                                <input type="checkbox" name="in-budget" defaultChecked={setChecked(category.inBudget)} />
                                in Budget?
                            </label>
                        </li>
                    )
                })}
            </ul>
        }
    </div>
)

CategoryList.propTypes = {
    categories: PropTypes.shape({
        allIds: PropTypes.array.isRequired,
        byId: PropTypes.object.isRequired,
        isFetching: PropTypes.bool.isRequired
    }).isRequired,
    onInBudgetChange: PropTypes.func.isRequired
}

export default CategoryList

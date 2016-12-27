import React, { PropTypes } from 'react'
// import Link from 'react-router'

const setChecked = (value) => {
    return value ? 'checked' : ''
}

const CategoryList = ({ categories, onInBudgetChange }) => (
    <div>
        <h2>All Categories</h2>
        <ul className="category-list">
            {categories.map(category => {
                return (
                    <li key={category._id}>
                        <h3>{category.category}</h3>
                        <label onChange={() => onInBudgetChange(category._id)}>
                            <input type="checkbox" name="in-budget" defaultChecked={setChecked(category.inBudget)} />
                            in Budget?
                        </label>
                    </li>
                )
            })}
        </ul>
    </div>
)

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired,
    onInBudgetChange: PropTypes.func.isRequired
}

export default CategoryList

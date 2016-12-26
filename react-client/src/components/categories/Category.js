import React, { Component } from 'react'

class Category extends Component {
    constructor () {
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount () {
        // fetch the categories
        fetch('/api/categories', { accept: 'application/json' })
            .then(response => response.json())
            .then(json => this.categoriesLoaded(json))
    }

    categoriesLoaded (categories) {
        this.setState({ categories })
    }

    render() {
        let category = {}

        if (this.state.categories.length) {
            const matches = this.state.categories.filter(category => {
                return category._id === this.props.params.id
            })
            category = matches[0] || {}
        }

        let inBudget = category.inBudget ? 'yes' : 'no'

        return (
            <div>
                <h2>Category</h2>
                <ul>
                    <li>_id: {category._id}</li>
                    <li>category: {category.category}</li>
                    <li>inBudget: {inBudget}</li>
                </ul>
            </div>
        )
    }
}

export default Category

import React, { Component } from 'react'
import { Link } from 'react-router'

class Categories extends Component {
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
        const categories = this.state.categories
        return (
            <div>
                <h2>Categories</h2>
                <p>Number of categories: {categories.length}</p>
                <ul>
                    {categories.map(category => (
                        <li key={category._id}>
                            <Link to={`/categories/${category._id}`}>{category.category}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Categories

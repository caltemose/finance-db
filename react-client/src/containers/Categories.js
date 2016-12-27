import React, { Component } from 'react'
import { connect } from 'react-redux'
import SimpleList from '../components/SimpleList'

class Categories extends Component {
    render() {
        const categories = this.props.categories || []
        return (
            <div>
                <h2>All Categories</h2>
                <SimpleList items={categories} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories.categories
})


export default connect(mapStateToProps)(Categories)

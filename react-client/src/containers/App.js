import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategoriesIfNeeded, fetchBudgets } from '../actions/actions'
import Header from '../components/Header'

class App extends Component {

    /*
    TODO handle App initialization properly and set redux state init property(ies)
    so that other components know when they can make API calls, etc.
    See note in containers/Transactions.js
     */
    componentWillMount () {
        console.log('App.componentDidMount()')
        this.props.fetchCategoriesIfNeeded()
        this.props.fetchBudgets()
    }

    render () {
        return (
            <div>
                <Header />

                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
})

const mapDispatchToProps = {
    fetchCategoriesIfNeeded,
    fetchBudgets
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

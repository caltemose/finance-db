import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchCategoriesIfNeeded } from '../actions/actions'

class App extends Component {

    componentDidMount () {
        this.props.fetchCategoriesIfNeeded()
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Finances DB</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/categories">Categories</Link>
                    </nav>
                </header>

                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categories
})

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchCategoriesIfNeeded: () => {
//             dispatch(fetchCategoriesIfNeeded())
//         }
//     }
// }

const mapDispatchToProps = {
    fetchCategoriesIfNeeded
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

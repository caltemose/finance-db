import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategoriesIfNeeded } from '../actions/actions'
import Header from '../components/Header'

class App extends Component {

    componentDidMount () {
        this.props.fetchCategoriesIfNeeded()
    }

    render() {
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

// NOTE why do this? to pass properties through the action? see below.
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

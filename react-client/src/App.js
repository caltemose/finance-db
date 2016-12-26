import React, { Component } from 'react';

class App extends Component {
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
            .then(json => console.log(json))
    }

    render() {
        const categories = this.state.categories
        return (
            <div>
                <h1>Hi!</h1>
                <p>Number of categories: {categories.length}</p>
            </div>
        )
    }
}

export default App;

import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {
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

export default App;

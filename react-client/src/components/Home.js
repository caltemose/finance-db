import React, { Component } from 'react'
// import { Link } from 'react-router'

class Home extends Component {
    render() {
        return (
            <section>
                <h2>Home</h2>
                <p>
                    This page will display the current budget status for the
                    most recent month of transactions. It will also have links
                    to various forms and reports for this tool.
                </p>
                <ul>
                    <li>View transactions by month range</li>
                    <li>View budget for month</li>
                    <li>Create new budget</li>
                </ul>
            </section>
        )
    }
}

export default Home;

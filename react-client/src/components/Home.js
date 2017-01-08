import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {
    render() {
        return (
            <section>
                <h2>About This App</h2>
                <p>
                    This app allows you to:
                </p>
                <ul>
                    <li>Manage transactions imported from bank data</li>
                    <li>Manage categories for transactions</li>
                    <li>Manage and view budgets and budget reports by date range</li>
                </ul>

                <h3>Transactions</h3>
                <p>
                    Transactions must first be imported from bank data which is a quasi-manual process involving Node scripts in the converter folder of this application (not accessible by browser).
                </p>
                <p>
                    Transactions can then be viewed and edited - use the <Link to="/transactions">Transactions</Link> to reach the transaction index which allows you to view transactions by a date range. On the subsequent transaction list you can edit transaction data to:
                </p>
                <ul>
                    <li>adjust payee names and transaction descriptions</li>
                    <li>properly categorize transactions</li>
                </ul>

                <h3>Budgets</h3>
                <p>
                    On the <Link to="/budgets">budgets index</Link> you will find links to:
                </p>
                <ul>
                    <li>create a new budget</li>
                    <li>edit the current budget</li>
                    <li>view budget reports for recent months</li>
                    <li>view a budget report for a specific range</li>
                </ul>
                <p>
                    Editing budgets should only be used when a budget has an error or is missing a category. If significant changes to a budget are required because of new personal behaviors or life situations, create a new budget instead and the previous budget will still apply to legacy transactions/date ranges from its start date up to the start date of the new budget you create.
                </p>

                <h3>Categories</h3>
                <p>
                    The categories index allows you to add a new category and to classify existing categories as in-budget or not. This classification means that when creating a new budget, only categories classified as 'in-budget' will show up on the creation screen.
                </p>
                <p>
                    When editing a budget, all categories are displayed since the 'in-budget' status of a category could change or be out-of-sync with a budget that was created in the past. Categories with 0 as their amount shown on the edit screen are not included in the budget when it is saved.
                </p>
            </section>
        )
    }
}

export default Home;

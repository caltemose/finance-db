import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import BudgetIndex from './components/budgets/BudgetIndex'
import Categories from './containers/Categories'
import TransactionIndex from './components/transactions/TransactionIndex'
// import Transactions from './containers/Transactions'

export default <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="budgets" component={BudgetIndex} />
    <Route path="categories" component={Categories} />
    <Route path="transactions" component={TransactionIndex} />
</Route>

// <Route path="transactions/from/:startMonth/:startYear/to/:endMonth/:endYear" component={Transactions} />

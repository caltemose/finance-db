import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import BudgetIndexContainer from './containers/BudgetIndexContainer'
import BudgetEditContainer from './containers/BudgetEditContainer'
import BudgetCreateContainer from './containers/BudgetCreateContainer'
import BudgetViewContainer from './containers/BudgetViewContainer'
import Categories from './containers/Categories'
import TransactionIndex from './components/transactions/TransactionIndex'
import Transactions from './containers/Transactions'
import TransactionsByCategory from './containers/TransactionsByCategory'
import Transaction from './containers/Transaction'

export default <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="budgets" component={BudgetIndexContainer} />
    <Route path="budgets/create" component={BudgetCreateContainer} />
    <Route path="budgets/edit/:id" component={BudgetEditContainer} />
    <Route path="budgets/view/from/:startMonth/:startYear/to/:endMonth/:endYear" component={BudgetViewContainer} />
    <Route path="categories" component={Categories} />
    <Route path="transactions" component={TransactionIndex} />
    <Route path="transactions/:id" component={Transaction} />
    <Route path="transactions/from/:startMonth/:startYear/to/:endMonth/:endYear" component={Transactions} />
    <Route path="transactions/from/:startMonth/:startYear/to/:endMonth/:endYear/byCategory/:category" component={Transactions} />
    <Route path="transactions/by-category/:category" component={TransactionsByCategory} />
</Route>

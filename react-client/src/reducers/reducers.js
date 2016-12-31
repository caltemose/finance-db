import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import categories from './category-reducers'
import transactions from './transaction-reducers'
import budgets from './budget-reducers'

const reducers = combineReducers({
    categories,
    transactions,
    budgets,
    routing: routerReducer
})

export default reducers

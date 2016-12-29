import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import categories from './category-reducers'
import transactions from './transaction-reducers'

const reducers = combineReducers({
    categories,
    transactions,
    routing: routerReducer
})

export default reducers

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import categories from './category-reducers'

const reducers = combineReducers({
    categories,
    routing: routerReducer
})

export default reducers

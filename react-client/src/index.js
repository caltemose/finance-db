import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './containers/Root'
import configureStore from './store'

import './finances.css'

// const router = (
//     <Router history={browserHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Home} />
//             <Route path="categories" component={Categories} />
//             <Route path="categories/:id" component={Category} />
//         </Route>
//     </Router>
// )

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
)

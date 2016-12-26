import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import Home from './components/Home'

export default <Route path="/" component={App}>
    <IndexRoute component={Home} />
</Route>

// <Router history={browserHistory}>
//     <Route path="/" component={App}>
//         <IndexRoute component={Home} />
//         <Route path="categories" component={Categories} />
//         <Route path="categories/:id" component={Category} />
//     </Route>
// </Router>

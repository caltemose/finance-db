import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Home from './components/Home'
import Categories from './containers/Categories'

export default <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories" component={Categories} />
</Route>
// <IndexRoute component={SimpleList} />
// <Route path=":id" component={SimpleDetails} />

// <Router history={browserHistory}>
//     <Route path="/" component={App}>
//         <IndexRoute component={Home} />
//         <Route path="categories" component={Categories} />
//         <Route path="categories/:id" component={Category} />
//     </Route>
// </Router>

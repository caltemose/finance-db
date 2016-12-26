import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './finances.css'

import App from './components/App'
import Home from './components/Home'
import Categories from './components/categories/Categories'
import Category from './components/categories/Category'

const router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="categories" component={Categories} />
            <Route path="categories/:id" component={Category} />
        </Route>
    </Router>
)

ReactDOM.render(
    router,
    document.getElementById('root')
)

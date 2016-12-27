import React from 'react'
import { Link } from 'react-router'

const Header = () => (
    <header>
        <h1>Finances DB</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/budget">Budget</Link>
        </nav>
    </header>
)

export default Header

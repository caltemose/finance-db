import React, { PropTypes } from 'react'
// import Link from 'react-router'

const processValue = (value) => {
    if (typeof value === 'boolean') {
        return value ? 'yep' : 'nope'
    } else {
        return value
    }
}

const SimpleList = ({ items }) => (
    <ul className="simple-list">
        {items.map(item => {
            return (
                <li key={item._id}>
                    <ul className="simple-list-details">
                        {
                            Object.keys(item).map((key, i) => {
                                return (
                                    <li key={`${item._id}-${i}`}>{key}: {processValue(item[key])}</li>
                                )
                            })
                        }
                    </ul>
                </li>
            )
        })}
    </ul>
)

SimpleList.propTypes = {
    items: PropTypes.array.isRequired
}

export default SimpleList

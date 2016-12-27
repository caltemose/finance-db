import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
    TOGGLE_CATEGORY } from '../actions/actions'


function categories(state = {}, action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return state

        case RECEIVE_CATEGORIES:
            return {
                ...state,
                categories: action.items,
                categoriesById: parseCategories(action.items)
            }

        case TOGGLE_CATEGORY:
            console.log(action.type, action.id)
            return state

        default:
            return {
                ...state,
                categories: [],
                categoriesById: {}
            }
    }
}

function parseCategories (categories) {
    const byId = {}
    categories.forEach(category => {
        byId[category._id] = { ...category }
    })
    return byId
}

export default categories

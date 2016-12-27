import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions/actions'

function categories(state = [], action) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return state
        case RECEIVE_CATEGORIES:
            // console.log(action.items)
            return {
                ...state,
                categories: action.items,
                categoriesById: parseCategories(action.items)
            }

        default:
            return state
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
